import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header>
      <nav className="navbar">
        <div className="logo">📚 Історія Світу</div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Хронологія
            </Link>
          </li>
          <li>
            <Link to="/events" className={`nav-link ${isActive('/events')}`}>
              Події
            </Link>
          </li>
          <li>
            <Link to="/test" className={`nav-link ${isActive('/test')}`}>
              Тестування
            </Link>
          </li>
          <li>
            <Link to="/progress" className={`nav-link ${isActive('/progress')}`}>
              Прогрес
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
