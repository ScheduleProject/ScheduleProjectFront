import React from "react";
import { useParams } from "react-router";
import TableBox from "../../Components/TableBox/TableBox"
import Top from "../../Components/Top/Top"

function App() {
  const { user } = useParams();
  return (
    <div className="App">
      <Top user={user}/>
      <div className="container">
        <TableBox user={user}/>
      </div>
    </div>
  );
}

export default App;
