import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteProductCart, getAddtoCart, getAllCart, getCartUser } from '../../api/cart'




// TẤT CẢ GIỎ HÀNG CỦA KHÁCH HÀNG
export const fetchAllCart = createAsyncThunk(
    'carts/fetchAllStatus',
    async () => {
        const response = await getAllCart()
        return response.data
    }
)
// GIỎ HÀNG CỦA UI
export const fetchCartUser = createAsyncThunk(
    'carts/fetchCartUser',
    async () => {
        const response = await getCartUser()
        return response.data
    }
)
// ADD TO CART CỦA NGƯỜI DÙNG
export const fetchAddToCart = createAsyncThunk(
    'carts/creatCartUser',
    async (cart: any) => {
        const response = await getAddtoCart(cart);
        return response.data;
    }
)
// DELETE CART UI
export const fetchdeleteCart = createAsyncThunk(
    'carts/deleteCart',
    async (productId: string) => {
        const response = await deleteProductCart(productId);
        return response.data;
    }
)


interface productsState {
    entities: any
    loading: boolean
}

const initialState = {
    entities: [],
    loading: false,
} as productsState

// Then, handle actions in your reducers:
const CartSlice = createSlice({
    name: 'cartUsser',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCart.fulfilled, (state, action: any) => {
            // Concatenate the new products array to the existing entities array
            state.entities = (action.payload);
        });
        builder.addCase(fetchCartUser.fulfilled, (state, action: any) => {
            // Concatenate the new products array to the existing entities array
            state.entities = (action.payload);
        });
        builder.addCase(fetchdeleteCart.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
})

// Later, dispatch the thunk as needed in the app
export default CartSlice.reducer