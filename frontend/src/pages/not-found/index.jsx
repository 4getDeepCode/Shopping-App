// import React from "react";
// import { Link } from "react-router-dom";

// function PageNotFound() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-background text-black p-6">
//       <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
//       <h2 className="text-2xl md:text-3xl font-semibold mb-2">
//         Page Not Found
//       </h2>
//       <p className="text-slate-900 text-center max-w-md mb-8">
//         Oops! The page you are looking for doesn't exist or has been moved.
//       </p>

//       <Link
//         to="/"
//         className="px-6 py-3 rounded-lg bg-black  text-white font-semibold transition-all"
//       >
//         Go Back Home
//       </Link>
//     </div>
//   );
// }

// export default PageNotFound;


import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (

    <div className=" h-screen w-full flex flex-col  justify-center items-center bg-background">
      <h1 className="text-9xl font-extrabold text-gray-700 ">404</h1>

      <div className="bg-black text-white px-2 text-sm rounded border-2 rotate-12 absolute mb-30"> Page Not Found</div>
      <p className="text-slate-900 text-center max-w-md mt-4">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      <button className="mt-5 relative inline-block text-sm font-medium text-white group active:text-black focus:outline-none focus-ring ">


        <span onClick={handleGoBack} className="relative px-14 py-2 font-semibold text-xl  bg-black rounded-lg block">
          Go Back
        </span>


      </button>



    </div>
  );

}

export default NotFound 