import React, { useEffect, useState } from "react";
import logo from "../assets/logofirst1.png";
import { createClient } from "@supabase/supabase-js";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.SUPABASE_KEY;
const apiUrl = process.env.SUPABASE_URL;
const supabase = createClient(apiUrl, apiKey);

const Loginpage = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newValue, setNewValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var accessTokenObj = JSON.parse(
      localStorage.getItem("sb-lgzjqxhqfstjgehntfxi-auth-token")
    );
    console.log(accessTokenObj);
    if (accessTokenObj != null) {
      if (accessTokenObj["user"]["aud"] == "authenticated") {
        navigate("/Dashboard");
        navigate(0);
      }
    } else {
      navigate("/Login");
    }
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== "") {
      setIsTyping(true);
      setNewValue(newValue);
    } else {
      setIsTyping(false);
    }
  };
  const onsubmit = async () => {
    setClicked(true);
    // let url = `https://api.whatsapp.com/send?phone=918921645661&text=Welcome to Haajar your code is 673673 `;
    // window.open(url);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: newValue,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: false,
        },
      });
      console.log(error);
      if (error==null) {
        setSuccess(true);
      }
      else{
        setClicked(false);
        toast.error('Your Email is not verified! Please verify your email ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      print(error.message);
    }
  };

  return (
    // <div className="flex bg-primary p-6">
    //   <div className=" bg-gray-400  rounded-2xl  ">

    //         {/* <div className="absolute gap-2 top-7 flex  p-4  ">
    //       <img src={logo} alt="logo" width={40} />
    //       <h1 className=" text-white text-center font-extrabold  text-4xl">
    //         ഹാജർ{" "}
    //       </h1>

    //     </div> */}
    //   </div>
    // </div>
    
    <div className="bg-primary  overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex  bg-primary h-screen w-screen   ">
        <div
          className={` bg-[url('/login.jpg')] w-2/3 hidden md:block  ${
            isTyping ? "grayscale-0" : "grayscale"
          } ease-in-out duration-1000 h-[100vh] bg-cover`}
        ></div>
        <div className=" m-auto text-[#292F36]   ">
          <div className="flex  justify-center gap-2">
            <img src={logo} alt="logo" width={220} />{" "}
          </div>

          <h1 className=" text-xl pt-6 flex justify-center  font-vilane_Regular">
            Welcome
          </h1>
          <p className="flex justify-center text-gray-400 pt-4">Login</p>

          <div className="  ss:py-6  ">
            <input
              required=""
              onChange={handleChange}
              id=""
              placeholder="Enter your verified Email address"
              class="block w-72 py-3 pl-12 pr-4 md:py-4 lg:py-4  text-sm text-black placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-gray-600 focus:bg-white caret-gray-600"
              name=""
            />

            <button
              onClick={onsubmit}
              disabled={clicked}
              class="sm:inline-flex  items-center text-white mt-2   justify-center  w-72 px-4 md:py-4 lg:py-4 py-3 text-base font-semibold  bg-[#ff6b6b] transition-all duration-200 border-1 border-gray-400 rounded-full bg-gradient-to-r focus:outline-none hover:opacity-80 focus:opacity-80"
            >
              {clicked ? "Sending Email..." : "Log In"}
            </button>
            {success && (
              <p className=" xs:text-xs flex justify-center font-vilane_Thin pt-5">
                An email has been sent to {newValue}{" "}
              </p>
            )}
          </div>

          {/* <div className={`${clicked ? "" : "  hidden"}`}> */}
          {/* <p className=" text-sm flex justify-center font-semibold pt-5">
              Enter OTP
            </p> */}

          {/* <div class="mt-2.5 relative flex justify-center text-gray-400 focus-within:text-gray-600"> */}
          {/* <div class="absolute inset-y-0  left-28 flex items-center pl-5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  class="w-5 h-5 fill-gray-600"
                >
                  <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"></path>
                </svg>
              </div> */}
          {/* <input
                required=""
                onChange={handleChange}
                id=""
                placeholder="Enter your whatsapp number"
                class="block w-72 py-3 pl-12 pr-4 md:py-4 lg:py-4  text-sm text-black placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-gray-600 focus:bg-white caret-gray-600"
                type="tel"
                name=""
              /> */}
          {/* <OtpField /> */}
          {/* </div> */}
          {/* <div className="pt-5 flex justify-center"> */}
          {/* <Link to='/Dashboard'>
            <button
                onClick={onsubmit}
                class="sm:inline-flex  items-center   justify-center  w-72 px-4 py-4 text-base font-semibold  bg-[#25D366] transition-all duration-200 border-1 border-gray-400 rounded-full bg-gradient-to-r focus:outline-none hover:opacity-80 focus:opacity-80"
              >
                Verify
              </button>
            </Link>
            </div>
            <img src={heroimg} alt="hrot" className="  sm:hidden opacity-40  relative inset-x-10" /> */}
          {/* </div> */}
          {/* <div className={`${clicked ? " hidden" : ""}`}> */}
          {/* <p className=" text-sm flex justify-center font-semibold pt-8"> */}
          {/* Whatsapp number */}
          {/* </p> */}

          {/* <div class="mt-2.5 relative flex justify-center text-gray-400 focus-within:text-gray-600"> */}
          {/* <div class="absolute md:inset-y-0 inset-y-2  left-14  md:left-28 flex items-center md:pl-5 pointer-events-none"> */}
          {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  class="w-5 h-5 fill-gray-600"
                >
                  <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"></path>
                </svg> */}
          {/* </div> */}
          {/* <input
                required=""
                onChange={handleChange}
                id=""
                placeholder="Enter your whatsapp number"
                class="block w-72 py-4 pl-12 pr-4   text-sm text-black placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-gray-600 focus:bg-white caret-gray-600"
                type="tel"
                name=""
              /> */}
          {/* </div> */}
          {/* <div className="pt-5 flex justify-center"> */}
          {/* <button
                onClick={onsubmit}
                class="sm:inline-flex  items-center   justify-center  w-72 px-4 py-4 text-base font-semibold  bg-[#25D366] transition-all duration-200 border-1 border-gray-400 rounded-full bg-gradient-to-r focus:outline-none hover:opacity-80 focus:opacity-80"
              >
                Send OTP
              </button> */}
          {/* <button class="inline-flex sm:hidden  items-center justify-center w-72 px-4 py-3 text-base font-semibold text-gray-600 bg-green-100 transition-all duration-200 border-1 border-gray-400 rounded-full bg-gradient-to-r focus:outline-none hover:opacity-80 focus:opacity-80">
                {" "}
                Verify
              </button> */}

          {/* </div> */}
          {/* <img src={heroimg} alt="hrot" className=" sm:hidden opacity-40  relative inset-x-10 " /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
