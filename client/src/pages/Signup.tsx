import { SyncLoader } from "react-spinners";
import { SignUpCredentials } from "../models/user";
import { useForm } from "react-hook-form";
import authBackground from "../assets/auth-background-image.jpeg";
import { useAuth } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signup, isError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      // Sign up user with provided credentials
      await signup(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className=" sm:block absolute w-full h-full object-cover"
        src={authBackground}
        alt="netflix-background"
      />
      <div className="bg-black/40 fixed top-0 left-0 w-full h-screen overflow-auto"></div>
      <div className="fixed w-full px-4 py-24 z-5">
        <div className="max-w-[550px]  h-[510px]   mx-auto bg-white text-black rounded-3xl md:h-auto">
          <div className="  py-3 px-6">
            <h1 className="text-2xl text-center font-medium mb-2">
              Create your account
            </h1>

            <div className="flex items-center justify-center">
              <div className="relative flex items-center w-full  before:flex-1 before:border-t before:border-gray-300  after:flex-1 after:border-t after:border-gray-300">
                <span className="px-4 text-gray-500">
                  Register with your email
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col py-4"
            >
              <label className="text-sm ">Username</label>
              <input
                className="p-3 my-2  text-black rounded-lg border border-zinc-200 focus:outline-none"
                type="text"
                required
                {...register("username", {
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters long",
                  },
                })}
                placeholder="Username"
              />
              {errors.username && (
                <div className="text-red-500 text-xs italic mb-1">
                  {errors.username.message}
                </div>
              )}

              {isError && isError.includes("Username") && (
                <div className="text-red-500 text-xs italic mb-1">
                  {isError}
                </div>
              )}

              <label className="text-sm ">Email Address</label>
              <input
                className="p-3 my-2  text-black rounded-lg border border-zinc-200 focus:outline-none"
                type="email"
                required
                {...register("email")}
                placeholder="Email"
              />

              {isError && isError.includes("email") && (
                <div className="text-red-500 text-xs italic mb-1">
                  {isError}
                </div>
              )}

              <label className="text-sm ">Password</label>
              <input
                className="p-3 my-2  text-black rounded-lg border border-zinc-200 focus:outline-none"
                type="password"
                required
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && (
                <div className="text-red-500 text-xs italic mb-1">
                  {errors.password.message}
                </div>
              )}

              <button className="bg-black text-white py-3 my-3 rounded-lg font-medium">
                {isSubmitting ? (
                  <div className="flex justify-center items-center gap-2">
                    Sign Up
                    <SyncLoader
                      size={5}
                      margin={1}
                      speedMultiplier={0.5}
                      color="#fff"
                    />
                  </div>
                ) : (
                  <> Sign Up</>
                )}
              </button>

              <p className="py-2 text-sm text-center text-zinc-500 md:text-base ">
                <Link to={"/login"}>
                  <span className="mr-2">Already have an account?</span>
                  <span className="font-medium underline text-zinc-700">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
