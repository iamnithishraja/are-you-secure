import { useState } from "react";
import { Input } from "../components/ui/Input";
import { ModeToggle } from "../components/ui/dark-mode-toggle"

function App() {
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="flex h-full border-r-2 justify-end items-end p-2">
        <ModeToggle className="" />
      </div>
      <div className="col-start-4 flex flex-col place-content-center items-center h-full">
        <Input className="w-48 border" type="email" placeholder="Email" />
      </div>
    </div>
  );
}

export default App;
