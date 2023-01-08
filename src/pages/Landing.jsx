import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from "../assets/images/main.svg";
import {Logo} from "../components";

function Landing() {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>
                    Job <span>tracking</span> app
                </h1>
                <p>
                Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure.
                </p>
                <Link to='/register' className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main} alt="main img" className='img main-img'/>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    height: var(--nav-height);
    display: flex;
    align-items: center;
    margin: 0 auto;
}
.page{
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    align-items: center;
    min-height: calc(100vh - var(--nav-height));
}
h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
@media (min-width:992px) {
    .page{
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
        margin-top: -3rem;
    }
}
`;

export default Landing