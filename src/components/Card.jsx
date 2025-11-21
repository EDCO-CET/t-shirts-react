import './Card.css';

function Card(props) {
  const { title, price, image, description } = props;
  return (
    <article className='card'>
      <h3 className='card__title'>{title}</h3>
      <img className='card__image' src={image} alt={title} />
      <p className='card__price'>{price}</p>
      <p className='card__description'>{description}</p>
    </article>
  );
}

export default Card;
