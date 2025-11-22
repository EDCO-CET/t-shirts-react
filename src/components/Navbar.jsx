import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='#'>Products</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
