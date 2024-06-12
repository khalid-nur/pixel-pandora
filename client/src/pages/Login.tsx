import { useForm } from "react-hook-form";
import { LoginCredentials } from "../models/user";
import { SyncLoader } from "react-spinners";
import authBackground from "../assets/auth-background-image.jpeg";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";

const Login = () => {
  const { login, isError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      // Login user with provided credentials
      await login(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className=" sm:block absolute w-full h-full object-cover"
        src={authBackground}
        alt="netflix-background"
      />
      <div className="bg-black/40 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-5">
        <div className="max-w-[550px]  h-[500px]   mx-auto bg-white text-black rounded-3xl md:h-auto">
          <div className="  p-10">
            <h1 className="text-2xl text-center font-medium mb-4">
              Sign in to Pixel Pandora
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col py-4"
            >
              <label className="text-sm ">Email Address</label>
              <input
                className="p-3 my-2  text-black rounded-lg border border-zinc-200 focus:outline-none"
                type="email"
                required
                {...register("email")}
                placeholder="Email"
                autoComplete="email"
              />

              <label className="text-sm ">Password</label>
              <input
                className="p-3 my-2  text-black rounded-lg border border-zinc-200 focus:outline-none"
                type="password"
                required
                {...register("password")}
                placeholder="Password"
                autoComplete="current-password"
              />

              <div>
                {isError && (
                  <div className="flex items-center rounded italic mt-4 bg-red-400 h-7">
                    <span className=" text-white text-sm ml-1">{isError}</span>
                  </div>
                )}
              </div>
              <button className="bg-black text-white py-3 my-6 rounded-lg font-medium">
                {isSubmitting ? (
                  <div className="flex justify-center items-center gap-2">
                    Sign In
                    <SyncLoader
                      size={5}
                      margin={1}
                      speedMultiplier={0.5}
                      color="#fff"
                    />
                  </div>
                ) : (
                  <>Sign In</>
                )}
              </button>
              <p className="py-2 text-sm text-center text-zinc-500 md:text-base ">
                <Link to={"/signup"}>
                  <span className="mr-3">Don’t have an account?</span>
                  <span className="font-medium underline text-zinc-700">
                    Sign up now
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

export default Login;
