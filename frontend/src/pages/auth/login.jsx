import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { loginUser } from '@/store/auth-slice'
import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import { motion } from 'framer-motion'

const initialState = {
  email: "",
  password: ""
}

 function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful!");
      } else {
        toast.error(data?.payload?.message || "Login failed!");
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-md space-y-8"
    >
      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow">
          Sign in to your account
        </h1>
        <p className="text-gray-300 text-sm">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-yellow-400 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
      >
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </motion.div>
    </motion.div>
  )
}

export default AuthLogin

