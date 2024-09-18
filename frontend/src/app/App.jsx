import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import { Eye, EyeOff } from "lucide-react";
import BreachMetricsDashboard from "../components/Dashboard";
import { useUser } from "@clerk/clerk-react"; // Import useUser from Clerk

function PasswordForm({ showPassword, togglePasswordVisibility }) {
  return (
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
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <Button variant="default" className="w-full">
        Submit
      </Button>
    </div>
  );
}

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/getBreachAnalysis`,
            {
              params: { email: user.primaryEmailAddress.emailAddress },
            }
          );
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <Banner />
      <div className="flex-grow flex flex-col w-full p-4">
        <div className="flex mx-auto my-8">
          <PasswordForm
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>

        <div className="justify-center w-full place-self-center border-t-2">
          <div className="flex justify-center">
            <BreachMetricsDashboard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
