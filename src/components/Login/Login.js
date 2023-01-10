import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { googleLogin, signInWithEmailPassword } = useContext(AuthContext);

  const [passwordType, setPasswordType] = useState("password");
  const googleProvider = new GoogleAuthProvider();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
    }
  };

  const handleSignin = (data) => {
    console.log(data)
    signInWithEmailPassword(data.email, data.password)
    .then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("Login Successfull");
      reset();
    })
    .catch((error) => {
      console.log(error.message);
    })
    
  };

  const handleGoogleLogin = () => {
    googleLogin(googleProvider).then((result) => {
      const user = result.user;
      // console.log(user)
      const createdUser = {
        name: user.displayName,
        email: user.email,
        role: "Buyer",
      };
      saveUser(createdUser);
    });
  };

  const saveUser = (createdUser) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <section className="pb-8">
      <div className="w-full max-w-md mx-auto p-8 rounded-xl mt-10 bg-gray-400 bg-opacity-40 backdrop-blur-md text-black">
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "email is required" })}
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p role="alert" className="text-error">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              S
              type={passwordType}
              placeholder="******"
              className="input input-bordered w-full"
            />
            {passwordType === "password" ? (
              <FaEye
                onClick={handlePasswordType}
                className="relative bottom-7 left-[360px] cursor-pointer"
              ></FaEye>
            ) : (
              <FaEyeSlash
                onClick={handlePasswordType}
                className="relative bottom-7 left-[360px] cursor-pointer"
              ></FaEyeSlash>
            )}
            {errors.password && (
              <p className="text-error">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-info w-full mt-5 text-xl font-bold"
            value="Signup"
            type="submit"
          />
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 text-blackbg-gray-700"></div>
          <p className="px-3 text-sm text-blacktext-black">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 text-blackbg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="p-3 rounded-sm flex justify-center items-center gap-1"
          >
            <FaGoogle className="text-xl text-red-600"></FaGoogle> Google
          </button>
        </div>
        <p className="text-xs text-center sm:px-6 text-blacktext-black">
          don't have an account?
          <Link to="/login" className="underline ">
            sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
