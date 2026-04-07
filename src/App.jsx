import { useState, useEffect, useRef } from "react";
import Animation from "./pages/Animation";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";

export default function App() {
  const [view, setView] = useState('home');

  return (
    <>
      {view === 'home' ? (
        <>
          <Navbar />
          <Animation onGetDetails={() => setView('login')} />
        </>
      ) : (
        <Login onBack={() => setView('home')} />
      )}
    </>
  );
}
