import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => {
    return (
        <NavLink to={to} >
           <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-400 ${window.location.pathname == to ?"bg-gray-100":""}`}>
                {label}
              </div>
        </NavLink>
    );
};

export default NavItem;