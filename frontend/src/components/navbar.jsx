import React, { useEffect } from "react";
import axios from "axios";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtoms";
import { ModeToggle } from "./ui/dark-mode-toggle";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const notifyBackend = async () => {
      if (isSignedIn && user) {
        const userId = user.id;
        const email = user.primaryEmailAddress?.emailAddress;

        try {
          await axios.post(`${process.env.BACKEND_URL}/users/pushUser`, {
            userId,
            email,
          });

          setUser({ userId, email });
        } catch (error) {
          console.error("Error notifying backend:", error);
        }
      }
    };

    notifyBackend();
  }, [isSignedIn, user, setUser]);

  return (
    <header className="bg-secondary shadow-md h-16 w-full col-span-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <div className="relative group">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 tracking-tighter uppercase transform skew-x-6 hover:skew-x-0 transition-all duration-300 ease-in-out">
                Are you secured
              </h1>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></div>
              <div className="absolute -top-1 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div
                className="absolute -top-1 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-x-8">
            <div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </SignedIn>
            </div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
