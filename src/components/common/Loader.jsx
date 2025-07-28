function Loader() {
  return (
    <div className="absolute top-0 left-0 z-[100000] bg-white text-blue-800 flex justify-center items-center h-full w-full font-medium text-xl">
      <div className="w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
      &nbsp; Loading ...
    </div>
  );
}

export default Loader;
