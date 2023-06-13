const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="w-full md:w-1/4 lg:w-1/5">
      <label className="form-lable" htmlFor={name}>
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="all">all</option>
        {list?.map((item, index) => (
          <option
            key={index}
            value={item._id || item}
            className="text-gray-900"
          >
            {item._id || item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
