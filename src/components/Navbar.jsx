import React, { useState } from 'react';
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutUser, toggleSidebar } from '../features/user/userSlice';
import Logo from "./Logo";

function Navbar() {
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [showLogout, setLogout] = useState(false);
  
  const toggle = () =>{
    dispatch(toggleSidebar());
  }
  const logout =() =>{
    dispatch(logoutUser());
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          {showLogout && <div className='dropdown show-dropdown'>
            <button onClick={logout} className='dropdown-btn' type='button'>
              Logout
            </button>
          </div>}
        </div>

      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
height: var(--nav-height);
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
background-color: var(--white);
.nav-center{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
}
.toggle-btn{
  background-color: transparent;
  border: transparent;
  color: var(--primary-500);
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.btn-container{
  position: relative;
}
.btn{
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
  justify-content: center;
  position: relative;
  box-shadow: var(--shadow-2);
}
.dropdown{
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  text-align: center;
  background: var(--primary-100);
  box-shadow: var(--shadow-2);
  padding: 0.5rem;
  visibility: hidden;
  border-radius: var(--borderRadius);
}
.show-dropdown {
  visibility: visible;
}
.dropdown-btn{
  background-color: transparent;
  border: transparent;
  color: var(--primary-500);
  letter-spacing: var(--letterSpacing);
  text-transform: capitalize;
  cursor: pointer;
}
.logo{
  display: flex;
    align-items: center;
    width: 100px;
}
.logo-text{
  display: none;
  margin: 0;
}
@media (min-width:992px) {
  position: sticky;
    top: 0;
  .nav-center{
    width: 90%;
  }
  .logo{
    display: none;
  }
  .logo-text{
    display: block;
  }
}
`;


export default Navbar