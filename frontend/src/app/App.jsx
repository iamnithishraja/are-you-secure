import { useState } from "react";
import { Input } from "../components/ui/Input";
import { ModeToggle } from "../components/ui/dark-mode-toggle";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Banner from "../components/banner";

function App() {
  return (
    <div className=" h-screen w-screen">
      <Navbar />
      <Banner />
      <div className="grid grid-cols-12 h-full w-full">
        <div className="col-start-3 flex flex-col h-full col-span-2 my-8">
          <div className="border-2 py-6 px-4 rounded-lg flex flex-col gap-y-4">
            <Input className="w-48 border" type="text" placeholder="Password" />
            <Button variant="default" className="size-fit">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
