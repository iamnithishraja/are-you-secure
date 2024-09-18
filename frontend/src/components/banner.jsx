import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtoms";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Banner() {
  // const [banner, setBanner] = useRecoilState(userAtom);

  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn || !isLoaded) {
    return null;
  }
  
  const [banner, setBanner] = useState({ emailId: null });
  const [isBreached, setIsBreached] = useState(false);

  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchBreachStatus = async () => {
      if (banner?.email) {
        try {
          const res = await axios.get(
            `http://${url}/users/checkBreach/${banner.email}`
          );
          setIsBreached(res.data.isBreached);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchBreachStatus();

    const intervalId = setInterval(fetchBreachStatus, 5000);

    return () => clearInterval(intervalId);
  }, [banner.email]);

  return (
    <div
      className={`h-1/5 w-full flex items-center justify-center ${
        isBreached ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <h1 className="text-white text-xl font-bold">
        {banner.email ? banner.email : "No email found"}
      </h1>
    </div>
  );
}

export default Banner;
