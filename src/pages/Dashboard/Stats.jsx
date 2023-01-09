import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {showStats} from "../../features/alljobs/allJobsSlice";
import {ChartsContainer, Loading, StatsContainer} from "../../components";
function Stats() {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications} = useSelector(store => store.allJobs);

  useEffect(() =>{
    dispatch(showStats());
  },[dispatch])
  if(isLoading){
    return <Loading center />
  }
  return (
    <>
    <StatsContainer />
    {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}



export default Stats