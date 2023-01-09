import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import {getLocalStorageUser} from "../../utils/localStorage";
import { getAllJobs } from "../alljobs/allJobsSlice";

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
        const resp = await customFetch.post("/jobs", job)
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

export const editJob = createAsyncThunk("/job/editJob", async({jobId, job}, thunkAPI) =>{
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job);
        thunkAPI.dispatch(clearState());
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const deleteJob = createAsyncThunk("/job/deleteJob", async(id, thunkAPI) =>{
    try {
        const resp = await customFetch.delete(`/jobs/${id}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.msg);
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
        },
        setEditJob:(state, {payload}) =>{
            return {...state, isEditing:true, ...payload};
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
        .addCase(deleteJob.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(deleteJob.fulfilled, (state, {payload}) =>{
            state.isLoading = false;
            console.log(payload);
            toast.success("Job deleted successfully");
        } )
        .addCase(deleteJob.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(editJob.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(editJob.fulfilled, (state) =>{
            state.isLoading = false;
            state.isEditing = false;
            toast.success("Job updated successfully...");
        })
        .addCase(editJob.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
    }
})

export const {handleStateChange, clearState, setEditJob} = jobSlice.actions;

export default jobSlice.reducer;