import { useState } from "react";
import { Input } from "../components/ui/Input";
import { ModeToggle } from "../components/ui/dark-mode-toggle";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";

function App() {
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <Navbar />
      <div className="col-start-4 flex flex-col justify-center h-full col-span-2">
        <div className="border-2 py-6 px-4 rounded-lg flex flex-col gap-y-4">
          <Input
            className="w-48 border"
            type="password"
            placeholder="Password"
          />
          <Button variant="default" className="size-fit">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
