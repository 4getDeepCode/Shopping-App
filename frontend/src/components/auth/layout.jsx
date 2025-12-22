

import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800">

      {/* Left Section */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md space-y-6 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Welcome to <span className="text-yellow-400">Deep MarketPlace</span>
          </h1>

          <p className="text-gray-300 text-lg">
            A smarter, cleaner and faster way to manage your digital marketplace.
          </p>
        </motion.div>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 items-center justify-center bg-white/10 backdrop-blur-xl border-l border-white/10 px-4 py-12 sm:px-6 lg:px-8 shadow-2xl"
      >
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}


export default AuthLayout