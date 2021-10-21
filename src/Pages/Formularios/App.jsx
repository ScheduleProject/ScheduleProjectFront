import React from "react";
import { useParams } from "react-router";
import FormBox from "../../Components/FormBox/FormBox"
import Top from "../../Components/Top/Top"

function App() {
  const { id } = useParams();
  return (
    <div className="App">
      <Top />
      <div className="container">
        <FormBox id={id ? id : null}/>
      </div>
    </div>
  );
}

export default App;
