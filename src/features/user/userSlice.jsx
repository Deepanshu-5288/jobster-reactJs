import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getLocalStorageUser, removeLocalStorageUser, setLocalStorageUser } from "../../utils/localStorage";
import { clearAllJobsState } from "../alljobs/allJobsSlice";
import { clearState } from "../Job/jobSlice";

const initialState ={
    isLoading : false,
    isSidebarOpen:false,
    user:getLocalStorageUser()
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) =>{
    try {
        const resp = await customFetch.post("/auth/register", user,{
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) =>{
    try {
        const resp = await customFetch.post("/auth/login", user, {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async(user, thunkAPI) =>{
    try {
        const resp = await customFetch.patch('/me/update', user,{
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
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

export const clearStore = createAsyncThunk("/clear/store", async(message, thunkAPI) =>{
    try {
        thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearState());
    return Promise.resolve();
    } catch (error) {
        return Promise.reject();
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
            toast.success("payload");
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
        .addCase(clearStore.rejected, () =>{
            toast.error('There was an error');
        })
    }
});
export const {toggleSidebar, logoutUser} = userSlice.actions;

export default userSlice.reducer;