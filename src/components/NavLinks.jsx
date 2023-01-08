import React from 'react';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

function NavLinks({toggleSidebar}) {
return (
    <div className='nav-links'>
        {links.map((link) =>{
            const {id, text, path, icon} = link;
            return <NavLink key={id} className={({isActive}) =>
            isActive ? "nav-link active" : "nav-link"} to={path} onClick={ toggleSidebar}>
                <span className='icon'>{icon}</span>
                {text}
            </NavLink>
            })}
    </div>
)
}

export default NavLinks