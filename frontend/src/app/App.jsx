import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import { Eye, EyeOff } from "lucide-react";
import BreachMetricsDashboard from "../components/Dashboard";

function PasswordForm({ showPassword, togglePasswordVisibility }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const url = "http://localhost:3000";

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${url}/users/checkPassword/${password}`);
      if (response.data.success) {
        setMessage("Password is not breached.");
      } else {
        setMessage(response.data.message || "Password is breached.");
      }
    } catch (error) {
      setMessage("Password not in database.");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="border-2 py-6 px-4 rounded-lg flex flex-col gap-y-4 shadow-lg">
        <div className="relative">
          <Input
            className="w-full border"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button variant="default" className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="border-2 py-6 px-4 rounded-lg shadow-lg w-1/3">
        <h3 className="font-semibold">Password Check Result</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const data = {
    BreachMetrics: {
      get_details: [],
      industry: [
        [
          ["info", 1],
          ["misc", 0],
          ["elec", 0],
          ["mini", 0],
          ["musi", 0],
          ["manu", 0],
          ["ener", 0],
          ["news", 0],
          ["ente", 0],
          ["hosp", 0],
          ["heal", 0],
          ["food", 0],
          ["phar", 0],
          ["educ", 0],
          ["cons", 0],
          ["agri", 0],
          ["tele", 0],
          ["tran", 0],
          ["aero", 0],
          ["fina", 0],
          ["reta", 0],
          ["nonp", 0],
          ["govt", 0],
          ["spor", 0],
          ["envi", 0],
        ],
      ],
      passwords_strength: [
        {
          EasyToCrack: 0,
          PlainText: 0,
          StrongHash: 0,
          Unknown: 1,
        },
      ],
      risk: [
        {
          risk_label: "Low",
          risk_score: 3,
        },
      ],
      xposed_data: [
        {
          children: [
            {
              children: [
                {
                  colname: "level3",
                  group: "A",
                  name: "data_Names",
                  value: 1,
                },
                {
                  colname: "level3",
                  group: "A",
                  name: "data_Usernames",
                  value: 1,
                },
              ],
              colname: "level2",
              name: "👤 Personal Identification",
            },
            {
              children: [
                {
                  colname: "level3",
                  group: "F",
                  name: "data_Email addresses",
                  value: 1,
                },
              ],
              colname: "level2",
              name: "📞 Communication and Social Interactions",
            },
          ],
        },
      ],
      yearwise_details: [
        {
          y2007: 0,
          y2008: 0,
          y2009: 0,
          y2010: 0,
          y2011: 0,
          y2012: 0,
          y2013: 0,
          y2014: 0,
          y2015: 0,
          y2016: 0,
          y2017: 0,
          y2018: 0,
          y2019: 1,
          y2020: 0,
          y2021: 0,
          y2022: 0,
          y2023: 0,
          y2024: 0,
        },
      ],
    },
    BreachesSummary: {
      site: "Canva",
    },
    ExposedBreaches: {
      breaches_details: [
        {
          breach: "Canva",
          details:
            "Canva, an Australian graphic design and publishing company, announced that it had suffered a data breach. An unauthorized third-party had gained access to certain data stored on its systems, potentially affecting the personal information of over 137 million users. The exposed data includes customer's name, email addresses, and hashed passwords. In 2019, the data breach was reported by the company.",
          domain: "canva.com",
          industry: "Information Technology",
          logo: "https://xposedornot.com/static/logos/Canva.png",
          password_risk: "unknown",
          references: "https://www.canva.com/en_in/help/incident-may24/",
          searchable: "Yes",
          verified: "Yes",
          xposed_data: "Email addresses;Names;Usernames",
          xposed_date: "2019",
          xposed_records: 137504762,
        },
      ],
    },
    ExposedPastes: null,
    PasteMetrics: null,
    PastesSummary: {
      cnt: 0,
      domain: "",
      tmpstmp: "",
    },
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <Banner />
      <div className="flex-grow flex flex-col w-full p-4">
        <div className=" flex mx-auto my-8">
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
