import "./App.css";
import Navbar from "./Pages/Navbar";
import UrlShort from "./Pages/UrlShort";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-primary h-[100vh] overflow-hidden">
      <Navbar />
      <UrlShort />
      <Toaster
        containerStyle={{
          inset: "0px",
        }}
        toastOptions={{
          duration: 3000,
          className: "w-full",
          style: {
            zIndex: 999999,
          },
        }}
      ></Toaster>
    </div>
  );
}

export default App;
