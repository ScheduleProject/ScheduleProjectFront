import React from "react";
import { useParams } from "react-router";
import FormBox from "../../Components/FormBox/FormBox"
import Top from "../../Components/Top/Top"

function App() {
  const { id, user } = useParams();
  return (
    <div className="App">
      <Top user={user} />
      <div className="container">
        <FormBox id={id ? id : null} user={user}/>
      </div>
    </div>
  );
}

export default App;
