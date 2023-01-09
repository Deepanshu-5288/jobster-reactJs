import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import Loading from "./Loading";
import Jobs from "./Jobs"
import { getAllJobs } from '../features/alljobs/allJobsSlice';

function JobsContainer() {
  const dispatch = useDispatch();
  const {jobs, isLoading} = useSelector(store => store.allJobs );

  useEffect(() =>{
    dispatch(getAllJobs());
  }, [])

  if(isLoading){
    return <Wrapper>
      <Loading center />
    </Wrapper>
  }
  if(jobs.length === 0){
    return <Wrapper>
    <h2>No jobs to display...</h2>
  </Wrapper>
  }
  return (
    <Wrapper >
      <h5>Jobs Info</h5>
      <div className='jobs'>
        {jobs.map((job) =>{
          return <Jobs key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
margin-top: 4rem;
h2{
  text-transform: none;
}
& > h5{
  font-weight: 700;
}
.jobs{
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
@media (min-width:992px) {
  .jobs{
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    display: grid;
  }
}
`;

export default JobsContainer