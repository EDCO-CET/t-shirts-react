import { lazy } from 'react';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
const Home = lazy(() => import('./pages/Home'));

const routes = [
  { path: '/', element: Home, name: 'Home' },
  { path: '/profile/:id', element: Profile, name: 'Profile' },
  { path: '/contact', element: Contact, name: 'Contact' },
  { path: '*', element: NotFound, name: 'NotFound' },
];

export default routes;
