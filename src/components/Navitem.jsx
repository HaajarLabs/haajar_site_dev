import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, label }) => {
    return (
        <Link to={to} className="nav-item">
           <div className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-400 ${window.location.pathname == to ?"bg-gray-100":""}`}>
                {label}
              </div>
        </Link>
    );
};

export default NavItem;