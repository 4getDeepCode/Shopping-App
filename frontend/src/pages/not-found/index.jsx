

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 items-center justify-center relative">

      {/* Yellow Glow Like AuthLayout */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10 text-center relative"
      >
        <h1 className="text-8xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          404
        </h1>

         {/* Highlight Line */}
        <div className="inline-block mt-4 px-4 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-sm border border-yellow-400/40 rotate-3">
          Page Not Found
        </div>

        <p className="mt-4 text-gray-300 text-lg">
          The page you're looking for doesn’t exist or has been moved.
        </p>

       

        {/* Button */}
        <button
          onClick={handleGoBack}
          className="mt-8 w-full py-3 rounded-lg bg-yellow-500 text-black font-semibold text-lg shadow-lg hover:bg-yellow-400 transition-all"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}

export default NotFound;
