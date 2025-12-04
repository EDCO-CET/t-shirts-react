import TShirtCard from './TShirtCard';
import styles from './TShirtList.module.css';

function TShirtList({ tshirts, loading, error, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className={styles.message}>
        <h2>Loading t-shirts...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.message} ${styles.error}`}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!tshirts || tshirts.length === 0) {
    return (
      <div className={styles.message}>
        <h2>No t-shirts found.</h2>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {tshirts.map((tshirt) => (
        <TShirtCard
          key={tshirt.id}
          tshirt={tshirt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TShirtList;
