import Banner from '../components/Banner';
import Gallery from '../components/Gallery';

function Home() {
  return (
    <>
      <Banner />
      <header>
        <h1>Nuestra Colección</h1>
        <section className='products__container'>
          <Gallery />
        </section>
      </header>
    </>
  );
}

export default Home;
