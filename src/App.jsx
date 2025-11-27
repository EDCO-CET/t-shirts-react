import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import './App.css';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import routes from './routes';

function App() {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>
        <main className='main__container'>
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </Suspense>
        </main>
      </Router>
    </>
  );
}

export default App;
