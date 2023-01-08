import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {FormRow} from "../../components"; 
import { updateUser } from '../../features/user/userSlice';

function Profile() {
  const {isLoading, user} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name:user?.name || '',
    email:user?.email || "",
    lastName:user?.lastName || '',
    location:user?.location || ''
  })
  const handleSubmit = (e) =>{
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  }
  const handleChange = (e) =>{
    setUserData({...userData, [e.target.name] : e.target.value});
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow name='name' type="text" handleChange={handleChange}  value={userData.name} />
          <FormRow name='lastName' type="text" handleChange={handleChange} value={userData.lastName} labelText='last name' />
          <FormRow name='email' type="email" handleChange={handleChange} value={userData.email} />
          <FormRow name='location' type="type" handleChange={handleChange} value={userData.location}  />
          <button  className='btn btn-block' disabled={isLoading} type='submit'>{isLoading ? "Loading..." : "Submit"}</button>
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
  h3 {
    margin-top: 0;
  }
  .form {
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
.form-center{
  display: grid;
  row-gap: .5rem;
}
.form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
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

export default Profile