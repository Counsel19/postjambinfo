
const FormRow = ({
  type,
  name,
  value,
  handleChange,
  isCustomerSearch,
  labelText,
  placeholder,
}) => {
  return (
    <div className="w-full col-span-1">
      {!isCustomerSearch ? (
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
      ) : null}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};
export default FormRow;
