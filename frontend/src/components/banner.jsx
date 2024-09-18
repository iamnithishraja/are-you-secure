import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Banner() {
  const { isSignedIn, user, isLoaded } = useUser();

  // Ensure the user is signed in and loaded
  if (!isSignedIn || !isLoaded) {
    return null;
  }

  const [isBreached, setIsBreached] = useState(false);
  const url = "http://localhost:3000";

  // Set banner email to user's primary email address
  const email = user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    const fetchBreachStatus = async () => {
      if (email) {
        try {
          const res = await axios.get(
            `${url}/users/checkBreach/${email}`
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
  }, [email]); // Dependency on email

  return (
    <div
      className={`h-1/5 w-full flex items-center justify-center ${
        isBreached ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <h1 className="text-white text-xl font-bold">
        {email || "No email found"}
      </h1>
    </div>
  );
}

export default Banner;
