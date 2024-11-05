const Spinner = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-[94vw] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full opacity-75 animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-full opacity-50 animate-pulse delay-150"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full opacity-25 animate-ping delay-300"></div>
        </div>
        <p className="text-lg font-semibold text-gray-600 animate-fade">Loading...</p>
      </div>
    );
  };
  
  export default Spinner;
  