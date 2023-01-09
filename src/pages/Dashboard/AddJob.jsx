import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {FormRow, FormRowSelect} from "../../components";
import { handleStateChange, clearState, addJob, editJob } from '../../features/Job/jobSlice';

function AddJob() {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

useEffect(() => {
  if (!isEditing) {
    dispatch(handleStateChange({ name: 'jobLocation', value: user.location }));
  }
}, [isEditing]);

  const handleSubmit =(e) =>{
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if(isEditing){
      dispatch(editJob({
        jobId:editJobId,
        job: {
          position,
          company,
          jobLocation,
          jobType,
          status,
        },
      }));
      return ;
    }
    dispatch(addJob({position, company, jobLocation, jobType, status }))
  }

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleStateChange({name, value}));
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className='form-center'>
          <FormRow handleChange={handleChange} name="position" type="text" value={position}/>
          <FormRow handleChange={handleChange} name="company" type="text" value={company} />
          <FormRow handleChange={handleChange} name="jobLocation" value={jobLocation} labelText="Job Location" type ="text" />
          <FormRowSelect handleChange={handleChange} name="status" value={status} options={statusOptions} />
          <FormRowSelect handleChange={handleChange} name="jobType" labelText="Job Type" value={jobType} options={jobTypeOptions} />
          <div className='btn-container'>
            <button onClick={() => dispatch(clearState())} type='button' className='btn btn-block clear-btn'>
              Clear
            </button>
            <button disabled={isLoading} type='submit' className='btn btn-block submit-btn'>
              {isLoading ? "Loading..." : isEditing ? "Edit Job" : "Add Job"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3{
    margin-top: 0;
  }
  .form{
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddJob