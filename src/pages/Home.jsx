import Card from '../components/Card';

function Home() {
  const products = [
    {
      name: 'Essential White Crew',
      price: 19.99,
      image:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center',
      alt: 'Essential White Crew',
      description: 'A comfortable and classic white crew neck t-shirt',
      id: 1,
    },
    {
      name: 'Midnight Black Tee',
      price: 20.99,
      image:
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&crop=center',
      alt: 'Midnight Black Tee',
      description: 'A bold and modern black tee',
      id: 2,
    },
    {
      name: 'Minimalist V-Neck',
      price: 19.99,
      image:
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop&crop=center',
      alt: 'Minimalist V-Neck',
      description: 'A sleek and modern v-neck design',
      id: 3,
    },
  ];
  return (
    <>
      <header>
        <h1>T-shirts App</h1>
        <section className='products__container'>
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </section>
      </header>
    </>
  );
}

export default Home;
