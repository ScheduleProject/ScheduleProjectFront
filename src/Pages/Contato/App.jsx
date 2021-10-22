import React from "react";
import { useParams } from "react-router";
import Top from "../../Components/Top/Top"
import ContactBox from "../../Components/ContactBox/ContactBox"

function App() {
  const { id, user } = useParams();
  return (
    <div className="App">
      <Top user={user} />
      <div className="container">
        <ContactBox id={id} user={user}/>
      </div>
    </div>
  );
}

export default App;