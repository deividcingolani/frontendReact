import styles from "./styles.module.css";

function Select({ options, handleChange }) {
  const optionsRender = options.map((option) => {
    return <option value={option.name}>{option.label}</option>;
  });
  return (
     <div className={styles.selectDiv}>
       <label className={styles.labelSelect}> Sorting By</label>
    <select
      name="OrderBy"
      onChange={(event) => handleChange(event)}
      className={styles.select}
    >
      {optionsRender}
    </select>
  </div>
       );
}
export default Select;
