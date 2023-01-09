import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearSearch, handleStateChange } from '../features/alljobs/allJobsSlice';
import  FormRow  from './FormRow';
import FormRowSelect from "./FormRowSelect";

function SearchContainer() {
  const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector(store => store.allJobs);
  const {jobTypeOptions, statusOptions} = useSelector(store => store.job);
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    dispatch(handleStateChange({ name: e.target.name, value: e.target.value }));
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(clearSearch());
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Seach form</h2>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleChange}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleChange}
            options={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleChange}
            options={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleChange}
            options={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer