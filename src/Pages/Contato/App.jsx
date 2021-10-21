import React from "react";
import { useParams } from "react-router";
import Top from "../../Components/Top/Top"
import ContactBox from "../../Components/ContactBox/ContactBox"


function App() {
  const { id } = useParams();
  return (
    <div className="App">
      <Top />
      <div className="container">
        <ContactBox id={id} />
      </div>
    </div>
  );
}

export default App;