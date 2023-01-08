import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {FormRow, Logo} from "../components";
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
  name:'',
  email:'',
  password:'',
  isMember:true,
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) =>{
    setValues({...values, [e.target.name] : e.target.value})
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if(!email || !password || (!isMember && !name)){
      toast.error("Please fill out all the fields");
      return ;
    }
    if(isMember){
      dispatch(loginUser({email,password}));
      return ;
    }
    dispatch(registerUser({name, email, password}));
  }

  const toggleMember = () =>{
    setValues({...values, isMember: !values.isMember});
  }

  useEffect(() =>{
    if(user){
      setTimeout(() =>{
        navigate("/")
      }, 3000)
    }
  }, [user, navigate])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow name="name" type="text" value={values.name} handleChange={handleChange} />
        )}
        <FormRow name="email" type="email" value={values.email} handleChange={handleChange} />
        <FormRow name="password" type="password" value={values.password} handleChange={handleChange} />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? "Loading..." : (values.isMember ? "Login" : "Register")}
        </button>
        <p>
          {values.isMember ? 'Not a member yet? ' : 'Already a member? '}
          <button type='button' onClick={toggleMember} className='member-btn'> 
          {values.isMember ? "register" : "login"}
          </button>
        </p> 
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
display: grid;
align-items: center;
.logo{
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
}
.form{
  max-width: 400px;
  border-top: 5px solid var(--primary-500);
}
h3{
  text-align: center;
}
p{
  text-align: center;
  margin: 0;
  margin-top: 1rem;
}
.btn{
  margin-top: 1rem;
}
.member-btn{
  border: transparent;
  background-color: transparent;
  color: var(--primary-500);
  cursor: pointer;
  letter-spacing: var(--letterSpacing);
}
`;

export default Register