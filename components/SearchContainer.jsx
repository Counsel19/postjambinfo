import FormRowSelect from "./FormRowSelect";
import FormRow from "./FormRow";
import { useAppContext } from "../context/AppContext";

const SearchContainer = () => {
  const {
    isLoading,
    allInstituteList,
    instituteFilter,
    search,
    sort,
    sortOptions,
    handleInputChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    let name = e.target.name;
    let value = e.target.value;
  
    handleInputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <div className="">
      <form className="w-full mb-8">
        <h4 className="text-lg font-semibold text-gray-600 mb-3">
          Search Form
        </h4>
        <div className="form-center w-full grid grid-cols-2 gap-8 items-center ">
          {/* Search input */}
          <FormRow
            type="search"
            name="search"
            labelText="Search User"
            value={search}
            handleChange={handleSearch}
          />

          {/* Search by Institution */}

          <FormRowSelect
            labelText="Institution"
            name="instituteFilter"
            value={instituteFilter}
            handleChange={handleSearch}
            list={allInstituteList}
          />

          {/* Sort */}

          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className=" h-10  w-full col-span-1 mt-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
