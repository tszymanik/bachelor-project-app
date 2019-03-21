import React from 'react';
import { NavLink } from 'react-router-dom';

import './UserSidebarNav.css';

const UserNav = props => (
  <div className="user-nav">
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink to="/user/general" className="nav-link" activeClassName="active">Generalne</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/user/address/residence" className="nav-link" activeClassName="active">Adres zamieszkania</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/user/address/mailing" className="nav-link" activeClassName="active">Adres korespondencji</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/user/high-school" className="nav-link" activeClassName="active">Szkoła średnia</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/user/education" className="nav-link" activeClassName="active">Edukacja</NavLink>
        {props.educationItemId
          ? (
            <ul className="nav flex-column pl-2">
              <li className="nav-item">
                <NavLink to={`/user/education/${props.educationItemId}`} className="nav-link">{props.educationItemId.substring(0, 10)}...</NavLink>
                <ul className="nav flex-column pl-2">
                  <li className="nav-item">
                    <NavLink to={`/user/education/${props.educationItemId}/marks`} className="nav-link">Oceny</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          )
          : null}
      </li>
    </ul>
  </div>
);

export default UserNav;
