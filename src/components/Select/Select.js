function Select({ options, handleChange }) {
  const optionsRender = options.map((option) => {
    return <option value={option.name}>{option.label}</option>;
  });
  return (
    <select name="OrderBy" onChange={(event) => handleChange(event)}>
      {optionsRender}
    </select>
  );
}
export default Select;
