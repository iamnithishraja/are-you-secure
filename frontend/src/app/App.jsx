import { useState } from "react";
import { Input } from "../components/ui/Input";

function App() {
  return (
    <div className="grid grid-cols-6 h-screen w-screen bg-background text-foreground">
      <div className="col-start-2 flex flex-col place-content-center items-center h-full">
        <Input className="w-48 border" type="email" placeholder="Email" />
      </div>
    </div>
  );
}

export default App;
