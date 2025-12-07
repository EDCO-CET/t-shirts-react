import { useEffect, useState } from 'react';
import { tshirtService } from '../services/tshirtService';
import Card from './Card';

function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchTshirts = async () => {
      try {
        const { tshirts } = await tshirtService.getAll();
        setProducts(tshirts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTshirts();
  }, []);

  return (
    <>
      {loading && (
        <div className='loading'>
          <h2>Loading products...</h2>
        </div>
      )}
      {error && (
        <div className='error'>
          <h2>{error}</h2>
        </div>
      )}
      {!loading && !error && (!products || !products.length === 0) && (
        <h2>Products not found.</h2>
      )}
      {!loading &&
        !error &&
        products &&
        products.length > 0 &&
        products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            price={product.price}
            image={product.imageUrl}
            description={product.description}
          />
        ))}
    </>
  );
}

export default Gallery;
