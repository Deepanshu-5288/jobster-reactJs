import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getLocalStorageUser, removeLocalStorageUser, setLocalStorageUser } from "../../utils/localStorage";

const initialState ={
    isLoading : false,
    isSidebarOpen:false,
    user:getLocalStorageUser()
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) =>{
    try {
        const resp = await customFetch.post("/auth/register", user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) =>{
    try {
        const resp = await customFetch.post("/auth/login", user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async(user, thunkAPI) =>{
    try {
        const resp = await customFetch.patch('/auth/updateUser', user, {
            header:{
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            },
        });
        
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar : (state) =>{
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser : (state) =>{
            state.user = null;
            state.isSidebarOpen=false;
            removeLocalStorageUser();
            toast.success("Successfully logged out");
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(registerUser.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, {payload}) =>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            setLocalStorageUser(user);
            toast.success(`Welcome back ${user.name}`);
        } )
        .addCase(registerUser.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(loginUser.pending, (state) =>{
            state.isLoading= true;
        })
        .addCase(loginUser.fulfilled, (state, {payload}) =>{
            const {user} = payload;
            state.isLoading= false;
            state.user = user;
            setLocalStorageUser(user);
            toast.success(`Welcome back ${user.name}`);
        })
        .addCase(loginUser.rejected, (state, {payload}) =>{
            state.isLoading=false;
            toast.error(payload);
        })
        .addCase(updateUser.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, {payload}) =>{
            state.isLoading=false;
            state.user = payload.user;
            setLocalStorageUser(payload.user);
            toast.success("User updated successfully");
        })
        .addCase(updateUser.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
    }
});
export const {toggleSidebar, logoutUser} = userSlice.actions;

export default userSlice.reducer;