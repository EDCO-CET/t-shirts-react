import { useAuth } from '../../hooks/useAuth';
import styles from './TShirtCard.module.css';

function TShirtCard({ tshirt, onEdit, onDelete }) {
  const { hasRole } = useAuth();
  const isAdmin = hasRole('admin');

  return (
    <article className={styles.card}>
      <h3 className={styles.card__title}>{tshirt.name}</h3>
      <img
        className={styles.card__image}
        src={tshirt.imageUrl}
        alt={tshirt.name}
      />
      <p className={styles.card__price}>{tshirt.price}</p>

      {isAdmin && (
        <div className={styles.card__actions}>
          <button
            className={`${styles.btn} ${styles['btn--edit']}`}
            onClick={() => onEdit(tshirt)}
          >
            Edit
          </button>
          <button
            className={`${styles.btn} ${styles['btn--delete']}`}
            onClick={() => onDelete(tshirt.id)}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default TShirtCard;
