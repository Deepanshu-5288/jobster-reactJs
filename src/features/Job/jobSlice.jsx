import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import {getLocalStorageUser} from "../../utils/localStorage";

const initialState = {
    isLoading:false,
    position:"",
    company:"",
    jobLocation:"",
    jobType:"full-time",
    jobTypeOptions:["full-time", "remote", "internship", "part-time"],
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const addJob = createAsyncThunk("/job/createJob", async (job, thunkAPI) =>{
    try {
        const resp = await customFetch.post("/jobs", job, {
            header:{
                authorization : `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearState());
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{
        handleStateChange: (state, {payload : {name, value}}) =>{
            state[name]=value
        },
        clearState:() =>{
            return {...initialState, jobLocation: getLocalStorageUser()?.location || '',};
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(addJob.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(addJob.fulfilled, (state, action) =>{
            state.isLoading = false;
            toast.success("Job Created successfully");
        })
        .addCase(addJob.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
    }
})

export const {handleStateChange, clearState} = jobSlice.actions;

export default jobSlice.reducer;