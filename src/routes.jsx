import { lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Users from './pages/Users';
import TShirts from './pages/TShirts';

const Home = lazy(() => import('./pages/Home'));

const routes = [
  { path: '/', element: <Home />, name: 'Home' },
  { path: '/profile/:id', element: <Profile />, name: 'Profile' },
  { path: '/contact', element: <Contact />, name: 'Contact' },
  {
    path: '/users',
    element: (
      <ProtectedRoute requiredRole='admin'>
        <Users />
      </ProtectedRoute>
    ),
    name: 'Users',
  },
  {
    path: '/tshirts',
    element: (
      <ProtectedRoute>
        <TShirts />
      </ProtectedRoute>
    ),
    name: 'T-Shirts',
  },
  { path: '/login', element: <Login />, name: 'Login' },
  { path: '*', element: <NotFound />, name: 'NotFound' },
];

export default routes;
