import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import styles from './Navbar.module.css';

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? styles.navActive : styles.navInactive
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              isActive ? styles.navActive : styles.navInactive
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          {user && (
            <NavLink
              to='/tshirts'
              className={({ isActive }) =>
                isActive ? styles.navActive : styles.navInactive
              }
            >
              T-Shirts
            </NavLink>
          )}
        </li>
        <li>
          {user && (
            <NavLink
              to='/users'
              className={({ isActive }) =>
                isActive ? styles.navActive : styles.navInactive
              }
            >
              Users
            </NavLink>
          )}
        </li>
      </ul>
      <ul>
        <li>
          {user ? (
            <div className={styles.user_logged}>
              <p>Hello, {user.name}</p>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? styles.navActive : styles.navInactive
              }
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
