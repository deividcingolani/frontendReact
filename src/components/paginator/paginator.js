import styles from "./paginator.module.css";
function Paginator({ totalPages, pageActive, setPageActive }) {
  const renderPages = [];
  for (let i = 1; i < totalPages + 1; i++) {
    renderPages.push(
      <span
        key={i}
        onClick={() => setPageActive(i)}
        className={i === pageActive ? styles.active : ""}
      >
        {i}
      </span>
    );
  }
  if (totalPages === 0) return null;
  if (totalPages > 0) {
    return (
      <div className={styles.pagination}>
        <span onClick={() => setPageActive(1)}>&laquo;</span>

        {renderPages}
        <span onClick={() => setPageActive(totalPages)}>&raquo;</span>
      </div>
    );
  }
}

export default Paginator;
