import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ user, onLogout }) {
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
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '20px' }}>
            <span style={{ color: '#fff', fontSize: '14px' }}>👤 {user.email}</span>
            <button onClick={onLogout} style={{ padding: '8px 15px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Вихід
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
