const NoPageFound = () => {
  return (
    <div className="grid place-content-center  h-[calc(100vh-151px)] text-center p-2">
      <p className=" text-8xl text-zinc-600 font-figtree font-medium md:text-9xl">
        404
      </p>
      <p className="text-xl text-zinc-600  font-figtree font-medium md:text-2xl">
        Not Found
      </p>
      <p className="text-lg text-zinc-600  font-figtree font-medium">
        The resource requested could not be found on this server
      </p>
    </div>
  );
};

export default NoPageFound;
