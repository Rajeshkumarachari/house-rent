import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      // console.log(res?.data);
      dispatch(signInSuccess(res?.data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className=" relative  hover:bg-gray-50 cursor-pointer items-center flex border p-1 mx-3 rounded-lg"
    >
      <span className=" absolute left-4">
        <FcGoogle />
      </span>
      <p className="mx-auto"> Continue with Google </p>
    </button>
  );
};

export default OAuth;
