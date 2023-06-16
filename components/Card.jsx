import { useAppContext } from "@/context/AppContext";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

const Card = ({ school }) => {
  const { handleInputChange, activeLoad, isLoading, handleDeleteInstitution } =
    useAppContext();

  const handleEnableEdit = (school) => {
    handleInputChange("showModal", true);
    handleInputChange("editingSchool", school);
  };

  const handleDelete = async () => {
    await handleDeleteInstitution(school._id);
    handleInputChange("activeLoad", school._id);
  };

  return (
    <div className="flex relative w-full h-full border-gray-300 border-1 shadow-lg px-6 py-8 text-gray-700 rounded-xl bg-gray-50">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">{school.institution}</h3>
        <span className=" text-sm">{school.state}</span>
      </div>

      <div className="absolute rounded bottom-4 right-4 flex gap-3">
        <button className="rounded p-2 bg-green-200 text-green-800 flex item-center justify-center">
          <FiEdit onClick={() => handleEnableEdit(school)} />
        </button>
        <button
          disabled={isLoading && activeLoad === school._id}
          className="rounded p-2 bg-rose-200 disabled:bg-rose-300 text-rose-800 flex gap-2  item-center justify-center"
        >
          <MdDeleteOutline onClick={() => handleDelete(school)} />
          {isLoading && activeLoad === school._id && (
            <TailSpin height={20} width={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
