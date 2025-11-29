import Banner from '../components/Banner';
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
    {
      name: 'Ocean Blue Premium',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
      alt: 'Ocean Blue Premium',
      description: 'Premium quality ocean blue t-shirt with soft fabric',
      id: 4,
    },
    {
      name: 'Forest Green Classic',
      price: 22.99,
      image:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&crop=center',
      alt: 'Forest Green Classic',
      description: 'Classic forest green tee for everyday wear',
      id: 5,
    },
    {
      name: 'Sunset Orange Vibes',
      price: 21.99,
      image:
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&crop=center',
      alt: 'Sunset Orange Vibes',
      description: 'Vibrant orange t-shirt perfect for summer',
      id: 6,
    },
    {
      name: 'Charcoal Gray Essential',
      price: 19.99,
      image:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center',
      alt: 'Charcoal Gray Essential',
      description: 'Versatile charcoal gray tee for any occasion',
      id: 7,
    },
    {
      name: 'Navy Blue Stripe',
      price: 26.99,
      image:
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop&crop=center',
      alt: 'Navy Blue Stripe',
      description: 'Stylish navy blue striped design',
      id: 8,
    },
    {
      name: 'Burgundy Pocket Tee',
      price: 23.99,
      image:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop&crop=center',
      alt: 'Burgundy Pocket Tee',
      description: 'Rich burgundy color with convenient chest pocket',
      id: 9,
    },
    {
      name: 'Heather Gray Athletic',
      price: 25.99,
      image:
        'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop&crop=center',
      alt: 'Heather Gray Athletic',
      description: 'Athletic fit heather gray for active lifestyle',
      id: 10,
    },
    {
      name: 'Olive Green Vintage',
      price: 27.99,
      image:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center',
      alt: 'Olive Green Vintage',
      description: 'Vintage-inspired olive green with distressed look',
      id: 11,
    },
    {
      name: 'Coral Pink Summer',
      price: 22.99,
      image:
        'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop&crop=center',
      alt: 'Coral Pink Summer',
      description: 'Soft coral pink perfect for warm weather',
      id: 12,
    },
    {
      name: 'Steel Blue Modern',
      price: 24.99,
      image:
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop&crop=center',
      alt: 'Steel Blue Modern',
      description: 'Contemporary steel blue with modern cut',
      id: 13,
    },
  ];
  return (
    <>
      <Banner />
      <header>
        <h1>Nuestra Colección</h1>
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
