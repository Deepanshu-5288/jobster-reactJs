import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFilterState = {
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
    jobs:[],
    isLoading:false,
    page:1,
    totalJobs:0,
    numOfPages:1,
    stats:{},
    monthlyApplications:[],
    ...initialFilterState,
}

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async(_, thunkAPI) =>{
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/job?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
        const resp = await customFetch.get(url);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const showStats = createAsyncThunk("allJobs/stats", async(_, thunkAPI) =>{
    try {
        const resp = await customFetch.get("/me/stats");
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const allJobsSlice = createSlice({
    name:"allJobs",
    initialState,
    reducers:{
        handleStateChange : (state, {payload : {name, value}}) =>{
            state.page =1;
            state[name] = value;
        },
        clearSearch : (state) =>{
            return {...state, ...initialFilterState};
        },
        changePage:(state, {payload}) =>{
            state.page = payload;
        },
        clearAllJobsState : (state) => initialState
    },
    extraReducers:(builder) =>{
        builder
        .addCase(getAllJobs.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getAllJobs.fulfilled, (state, {payload}) =>{
            state.isLoading = false;
            state.jobs = payload.jobs;
            state.totalJobs = payload.totalJobs;
            state.numOfPages = payload.totalPages;
        })
        .addCase(getAllJobs.rejected, (state, {payload}) =>{
            state.isLoading=false;
            toast.error(payload);
        })
        .addCase(showStats.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(showStats.fulfilled, (state, {payload}) =>{
            state.isLoading = false;
            state.stats = payload.stats;
            state.monthlyApplications = payload.monthlyApplications;
        })
        .addCase(showStats.rejected, (state, {payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        })
    }
}) 

export const {clearSearch, handleStateChange, changePage, clearAllJobsState} = allJobsSlice.actions;

export default allJobsSlice.reducer;