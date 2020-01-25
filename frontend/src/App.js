import React from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Game from "./components/game/Game";
function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ backgroundColor: "black" }}>
        <Game />
        <Footer />
      </div>
    </div>
  );
}

export default App;
