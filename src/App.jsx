import React from "react";
import './App.css';
import FormBox from "./Components/FormBox/FormBox"
import TableBox from "./Components/TableBox/TableBox"

function App() {
  return (
    <div className="App">
      <div className="container">
        <FormBox />
        <TableBox />
      </div>
    </div>
  );
}

export default App;
