import { getUser } from "../api";
import { useDispatch } from "react-redux";
import { setUserData, logIn } from "../redux/slices/userSlice";

export const UseAuth = () => {
  const dispath = useDispatch();

  async function auth() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const token = JSON.parse(jwt);
       const user = await getUser(token);
		 dispath(setUserData(user))
		 dispath(logIn())
		return user
    }
  }


  return auth;
};
