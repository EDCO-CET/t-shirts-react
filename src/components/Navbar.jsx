import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

function Navbar() {
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
          <NavLink
            to='/users'
            className={({ isActive }) =>
              isActive ? styles.navActive : styles.navInactive
            }
          >
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
