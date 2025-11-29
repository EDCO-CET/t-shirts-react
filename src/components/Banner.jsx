import styles from './Banner.module.css';

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.banner__content}>
        <h1 className={styles.banner__title}>Descubre Tu Estilo Perfecto</h1>
        <p className={styles.banner__subtitle}>
          Camisetas premium de alta calidad con diseños únicos y modernos
        </p>
        <button className={styles.banner__cta}>Ver Colección</button>
      </div>
      <div className={styles.banner__overlay}></div>
    </section>
  );
}

export default Banner;
