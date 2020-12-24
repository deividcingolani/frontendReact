import styles from "./paginator.module.css";
function Paginator({ totalPages, pageActive, setPageActive }) {
  const renderPages = [];
  for (let i = 1; i < totalPages + 1; i++) {
    renderPages.push(
      <a
        key={i}
        href="#"
        onClick={() => setPageActive(i)}
        className={i === pageActive ? styles.active : ""}
      >
        {i}
      </a>
    );
  }
  if (totalPages === 0) return null;
  if (totalPages > 0) {
    return (
      <div className={styles.pagination}>
        <a href="#" onClick={() => setPageActive(1)}>
          &laquo;
        </a>

        {renderPages}
        <a href="#" onClick={() => setPageActive(totalPages)}>
          &raquo;
        </a>
      </div>
    );
  }
}

export default Paginator;
