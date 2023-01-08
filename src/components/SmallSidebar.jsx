import React from 'react'
import styled from 'styled-components'
import {FaTimes} from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import NavLinks from './NavLinks';

function SmallSidebar() {
  const {isSidebarOpen} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const toggle = () =>{
    dispatch(toggleSidebar());
  }
  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
display: block;
.sidebar-container{
  position: fixed;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: var(--transition);
  z-index: -1;
  inset: 0;
}
.show-sidebar{
  opacity: 1;
  z-index: 10;
}
.content{
  background-color: var(--white);
  width: var(--fluid-width);
  height: 95vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem 2rem ;
  position: relative;
  border-radius: var(--borderRadius);
}
.close-btn{
  border: transparent;
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
  color: var(--red-dark);
  position: absolute;
  top: .625rem;
  left: .625rem;
}
.nav-links{
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
}
.nav-link{
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  padding: 1rem 0;
  color: var(--grey-500);
}
.nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
@media (min-width: 992px) {
    display: none;
  }
`;

export default SmallSidebar