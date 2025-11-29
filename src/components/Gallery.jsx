import { useFetch } from '../hooks/useFetch';
import Card from './Card';

function Gallery() {
  const productApiUrl =
    'https://gist.githubusercontent.com/jhonatan89/0f0a054ebd354b002d88e9fd31f337d7/raw/2eabdcd6c6650a1cfcc7eda2a1a94d1871c7fe9b/t-shirt.json';

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
      {!loading && !error && products.results.length === 0 && (
        <h2>Products not found.</h2>
      )}
      {!loading &&
        !error &&
        products.results.length > 0 &&
        products.results.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
    </>
  );
}

export default Gallery;
