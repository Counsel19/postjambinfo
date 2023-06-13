import Image from "next/image";

const DashboardBanner = ({ user }) => {
  return (
    <div className="flex rounded-lg flex-col  p-4 md:py-8 md:px-20 space-y-6 md:space-y-0 md:flex-row justify-around items-center bg-[#f7e5e9] text-white">
      <div className="mr-6 py-4 h-full flex text-center md:align-left justify-center flex-col">
        <h1 className="text-xl text-[#ff808b] font-semibold mb-2">
          Welcome Back <span className="text-blue-800">{user?.fullname}</span>
        </h1>
        <h2 className="text-gray-600 ml-0.5">
          Update and Review your selected schools
        </h2>
      </div>

      <Image
        width={250}
        height={200}
        src="/images/add-task.svg"
       alt="banner"
       className="hidden md:inline-block"
      />
    </div>
  );
};

export default DashboardBanner;
