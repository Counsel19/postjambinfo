import { useAppContext } from "@/context/AppContext";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";

const SelectView = () => {
  const { handleInputChange } = useAppContext();

  return (
    <div className="flex gap-3 my-8 w-full justify-center mb-12">
      <div className="flex rounded border-b-2 border-grey-dark overflow-hidden">
        <button
          onClick={() => handleInputChange("showProfile", true)}
          className="block text-white shadow-md bg-blue-500 hover:bg-blue-700 text-sm p-2 md:py-3 md:px-4 font-sans tracking-wide uppercase font-bold"
        >
          View Profile
        </button>
        <div className="bg-blue-400 shadow-border p-3">
          <div className="w-4 h-4">
            <FaUserCircle className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="flex rounded border-b-2 border-grey-dark overflow-hidden">
        <button
          onClick={() => handleInputChange("showProfile", false)}
          className="block text-white shadow-md bg-green-500 hover:bg-green-700 text-sm p-2 md:py-3 md:px-4 font-sans tracking-wide uppercase font-bold"
        >
          View Institutions
        </button>
        <div className="bg-green-400 shadow-border p-3">
          <div className="w-4 h-4">
            <FaGraduationCap className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectView;
