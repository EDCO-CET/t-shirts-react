import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(email, password);
      navigate('/tshirts');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          className={styles.form__text}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          className={styles.form__text}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {loading && <p>Authenticating...</p>}
      </form>
    </div>
  );
}

export default Login;
