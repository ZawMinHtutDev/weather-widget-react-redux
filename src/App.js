import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Weather } from "./features/weather";

function App() {
    return (
        <div className="App">
            <header className="AppHeader">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="wrapper">
                <Weather />
            </div>
        </div>
    );
}

export default App;
