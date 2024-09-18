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
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Logo
            </span>
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
