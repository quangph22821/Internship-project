import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IProduct from "../../interfaces/product";
import { getAllCategory, getCreatCategory, getDeleteCategory, getUpdateCategory } from "../../api/category";
import ICategory from "../../interfaces/category";

interface initialState {
    categorys: IProduct[];
    isLoading: boolean;
}

const initialState: initialState = {
    categorys: [],
    isLoading: false,
};

export const fetchAllCategory = createAsyncThunk(
    "category/fetchAllCategory",
    async (_, thunkAPI) => {
        try {
            const { data } = await getAllCategory();
            // console.log("Data Category", data);
            return data.categories;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const fetchCreatCategory = createAsyncThunk(
    "category/fetchCreatCategory",
    async (category: IProduct, thunkAPI) => {
        try {
            const { data } = await getCreatCategory(category);
            // console.log("data Creat catego", data);
            return data.category;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

// export const fetchUpdateCategory = createAsyncThunk(
//     "category/fetchUpdateCategory",
//     async ({ _id, category }: { _id: string; category: ICategory }, thunkAPI) => {
//         try {
//             const { data } = await getUpdateCategory(category);
//             console.log("fetUpdate Cate", data);

//             return data.category;
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({ message: error.message });
//         }
//     }
// );
export const fetchUpdateCategory = createAsyncThunk(
    'category/fetchUpdateCategory',
    async (category: any) => {
        const response = await getUpdateCategory(category);
        return response.data;
    }
)

export const fetchDeleteCategory = createAsyncThunk(
    "category/fetchDeleteCategory",
    async (idCategory: string, thunkAPI) => {
        try {
            const { data } = await getDeleteCategory(idCategory);

            return data.category;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.categorys = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAllCategory.rejected, (state) => {
                state.isLoading = false;
            });
        // Create Post
        builder
            .addCase(fetchCreatCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreatCategory.fulfilled, (state, action) => {
                state.categorys = [...state.categorys, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchCreatCategory.rejected, (state) => {
                state.isLoading = false;
            });
        // Update Post
        builder
            .addCase(fetchUpdateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
                state.categorys = state.categorys?.map((category: ICategory) =>
                    category._id === action?.payload?._id ? action.payload : category
                );
                state.isLoading = false;
            })
            .addCase(fetchUpdateCategory.rejected, (state) => {
                state.isLoading = false;
            });
        // Delete Post
        builder
            .addCase(fetchDeleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
                state.categorys = state.categorys?.filter(
                    (product: IProduct) => product._id !== action.payload._id
                );
                state.isLoading = false;
            })
            .addCase(fetchDeleteCategory.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default categorySlice.reducer;
