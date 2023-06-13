import { format } from "date-fns";
import Link from "next/link";

const AdminTop = () => {
  const date = format(new Date(), "do, MMMM, yyyy");

  return (
    <div className=" flex justify-between items-center my-4 px-20">
      <div className="flex md:gap-2 gap-2 items-center justify-center">
        <Link href="/" className="font-bold md:text-lg text-sm">
          MYSCHinformant
        </Link>
      </div>
      <h2 className="font-semibold lg:text-lg text-gray-700">Admininstrator</h2>

      <div>
        <div className="bg-blue-500 text-white text-xs lg:text-base p-2 rounded">
          {date}
        </div>
      </div>
    </div>
  );
};

export default AdminTop;
