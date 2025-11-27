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
      </ul>
    </nav>
  );
}

export default Navbar;
