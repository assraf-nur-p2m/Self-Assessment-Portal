import { Link, useNavigate } from "react-router-dom";
import loginPic from "../../assets/Images/loginBanner.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const { mail, password } = e.target;
    const loginData = {
      mail: mail.value,
      password: password.value,
    };
    console.log(loginData);
    navigate("/quiz");
  };

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box md:flex md:justify-center shadow-md md:items-center bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <div className="grid lg:grid-cols-2 gap-4 w-full">
            <div className="md:flex md:justify-center md:items-center">
              <img className="w-full max-w-lg mx-auto" src={loginPic} alt="" />
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#E5EBF5] shadow-lg p-12 rounded-lg lg:w-10/12">
                <h2 className="text-center font-bold text-4xl">Login</h2>

                <form action="" onSubmit={handleLogin}>
                  <div className="mt-8">
                    <p className="mb-0 ms-1 text-[#656566]">Enter Your Mail</p>
                    <input
                      name="mail"
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                      required
                    />

                    <p className="mb-0 ms-1 mt-5 text-[#656566]">
                      Enter Your Password
                    </p>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                      required
                      minLength={8}
                    />
                    <small className="ms-1 text-[#7d7e80]">
                      Must be 8 character at least
                    </small>

                    <div className="mt-8">
                      <p className="ms-1 text-[#656566] mb-2">
                        Does not have account?{" "}
                        <span className="underline text-[#004AAD] font-semibold">
                          <Link to="/signup">Sign Up</Link>
                        </span>{" "}
                        here
                      </p>
                    </div>

                    <div className="text-center">
                      <input
                        type="submit"
                        className="w-full bg-[#004AAD] text-white p-3 rounded-lg cursor-pointer"
                        value="Login"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
