import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';

const Header = props => (
  <nav id="PrimaryNavbar" className="navbar">
    <Link to="/" className="navbar-brand pl-2 pr-2">
      System Obsługi Dziekanatu
    </Link>
    <ul className="navbar-nav flex-row">
      {props.isAuth
        ? (
          <li className="nav-item">
            <NavLink to="/user" className="nav-link" activeClassName="active">Panel użytkownika</NavLink>
          </li>
        )
        : null
      }
      {props.isAdmin
        ? (
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link" activeClassName="active">Panel administratora</NavLink>
          </li>
        )
        : null
      }
    </ul>

    <ul className="navbar-nav flex-row ml-auto">
      {props.isAuth
        ? (
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link">Wyloguj się</NavLink>
          </li>
        )
        : (
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">Zaloguj się</NavLink>
          </li>
        )
      }
    </ul>
  </nav>
);

export default Header;
