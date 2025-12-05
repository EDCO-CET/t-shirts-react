import { useFetch } from '../hooks/useFetch';
import Card from './Card';

function Gallery() {
  const productApiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/tshirts`;

  const { data: products, loading, error } = useFetch(productApiUrl);

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
      {!loading &&
        !error &&
        (!products || !products.tshirts || products.tshirts.length === 0) && (
          <h2>Products not found.</h2>
        )}
      {!loading &&
        !error &&
        products &&
        products.tshirts &&
        products.tshirts.length > 0 &&
        products.tshirts.map((product) => (
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
