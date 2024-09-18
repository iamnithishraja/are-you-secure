import { useState } from "react";
import { Input } from "../components/ui/Input";
import { ModeToggle } from "../components/ui/dark-mode-toggle";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import { Eye, EyeOff } from "lucide-react"; // Import the icons

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Navbar />
      <Banner />
      <div className="flex-grow grid grid-cols-12 w-full p-4">
        <div className="col-start-3 col-span-6 flex flex-col mx-auto my-8">
          <div className="border-2 py-6 px-4 rounded-lg flex flex-col gap-y-4 shadow-lg">
            <div className="relative">
              <Input
                className="w-full border"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <Button variant="default" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
