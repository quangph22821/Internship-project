import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProduct, getCreatProduct, getDeleteProduct, getUpdateProduct } from "../../api/product";
import IProduct from "../../interfaces/product";
import { getOneCategory } from "../../api/category";

interface initialState {
    products: IProduct[];
    isLoading: boolean;
    listData: IProduct[];
}

const initialState: initialState = {
    products: [],
    isLoading: false,
    listData: [],
};

export const fetchAllProduct = createAsyncThunk(
    "product/fetchAllProduct",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllProduct();
            // console.log("data", data);
            return data.products;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchCreatProduct = createAsyncThunk(
    "product/fetchCreatProduct",
    async (product: IProduct, thunkAPI) => {
        try {
            const { data } = await getCreatProduct(product);
            console.log("dataCreat", data);
            return data.product;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

// export const fetchUpdateProduct = createAsyncThunk(
//     "product/fetchUpdateProduct",
//     async (product: any) => {
//         try {
//             const { data } = await getUpdateProduct(product);

//             return data.data;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({ message: error.message });
//         }
//     }
// );
export const fetchupdateProduct = createAsyncThunk(
    'product/fetchupdateProduct',
    async (product: any) => {
        const response = await getUpdateProduct(product);
        return response.data;
    }
)

export const fetchDeleteProduct = createAsyncThunk(
    "product/fetchDeleteProduct",
    async (idProduct: string, thunkAPI) => {
        try {
            const { data } = await getDeleteProduct(idProduct);
            console.log("data Delte", data);
            return data.product;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

// LỌC THEO CATEGORY
export const fetchProductsAllcate = createAsyncThunk(
    'product/fetchAllofcateStatus',
    async (idcate: any) => {
        const response = await getOneCategory(idcate);
        console.log("cate lọc", response);
        return response.data
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        filter(state, action) {
            const filteredProducts = state.listData.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()))
            state.products = filteredProducts;
        },
        filterByCategory(state, action) {
            const dataFiter: any = state.listData.filter((product: IProduct) => product.categoryId === action.payload)
            state.products = dataFiter;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.listData = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllProduct.rejected, (state) => {
                state.isLoading = false;
            });
        // Create Post
        builder
            .addCase(fetchCreatProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreatProduct.fulfilled, (state, action) => {
                state.products = [...state.products, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchCreatProduct.rejected, (state) => {
                state.isLoading = false;
            });
        // Update Post
        builder.addCase(fetchupdateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        // Delete Post
        builder
            .addCase(fetchDeleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                state.products = state.products?.filter(
                    (product: IProduct) => product._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(fetchDeleteProduct.rejected, (state) => {
                state.isLoading = false;
            });
        // lọc cate
        builder.addCase(fetchProductsAllcate.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});
export const { filter, filterByCategory } = productSlice.actions
export default productSlice.reducer;
