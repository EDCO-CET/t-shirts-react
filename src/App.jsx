import './App.css';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='main__container'>
        <Home />
        <ContactForm />
      </main>
    </>
  );
}

export default App;
