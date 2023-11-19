import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUser, signin, signup } from '../../api/user'



export const fetchUserAll = createAsyncThunk(
    'user/fetchAllStatus',
    async () => {
        const response = await getAllUser();
        console.log("allUserredux", response);
        return response.data
    }
)

export const fetchSignin = createAsyncThunk(
    'user/signin',
    async (user: any) => {
        const response = await signin(user);
        return response.data;
    }
)
export const fetchSignup = createAsyncThunk(
    'user/signup',
    async (user: any) => {
        const response = await signup(user);
        return response.data;
    }
)



interface productsState {
    users: any
    loading: boolean
}

const initialState = {
    users: [],
    loading: false,
} as productsState

// Then, handle actions in your reducers:
const productsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserAll.fulfilled, (state, action: any) => {
            // Concatenate the new products array to the existing entities array
            state.users = (action.payload);
        });
        builder.addCase(fetchSignin.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchSignup.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
})

// Later, dispatch the thunk as needed in the app
export default productsSlice.reducer