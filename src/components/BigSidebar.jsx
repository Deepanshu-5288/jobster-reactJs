import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from "./Logo";
import NavLinks from './NavLinks';

function BigSidebar() {
  const {isSidebarOpen} = useSelector(store => store.user);
  return (
    <Wrapper>
      <div className= {isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
display: none;

@media (min-width:992px) {
  display: block;
  box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  .sidebar-container{
    background-color: var(--white);
    min-height: 100vh;
    height: 100%;
    width: 15.625rem;
    margin: -15.625rem;
    transition: var(--transition);
  }
  .content {
      position: sticky;
      top: 0;
    }
  .show-sidebar{
    margin: 0;
  }
  header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
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
}
`;

export default BigSidebar