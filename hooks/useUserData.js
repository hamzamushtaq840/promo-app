import { useContext } from "react";
import { UserContext } from "../context/dataContext";

const useUserData = () => {
  return useContext(UserContext);
}

export default useUserData