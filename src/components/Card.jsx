import styles from './Card.module.css';

function Card(props) {
  const { title, price, image, description } = props;
  return (
    <article className={styles.card}>
      <h3 className={styles.card__title}>{title}</h3>
      <img className={styles.card__image} src={image} alt={title} />
      <p className={styles.card__price}>{price}</p>
      <p className={styles.card__description}>{description}</p>
    </article>
  );
}

export default Card;
