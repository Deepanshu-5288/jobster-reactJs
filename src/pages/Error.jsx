import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import errorImg from "../assets/images/not-found.svg";

function Error() {
  return (
    <Wrapper className='full-page'>
      <div>
      <img src={errorImg} alt="page not found" />
      <h3>Ohh! 404 Page Not Found</h3>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to='/' >back home</Link>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
text-align: center;
display: flex;
justify-content: center;
align-items: center;

img{
  width: 95vw;
  max-width: 600px;
}
h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Error