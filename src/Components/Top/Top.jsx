import './Top.css';
import { Link } from 'react-router-dom';
import { BsReplyFill } from "react-icons/bs";


function Top({ user }) {
  return (
    <nav className="Menu">
      <Link to={`/`} className="linkLogOut">
        <button className="btnLogOut">
          <BsReplyFill className="logoFilter"/>
        </button>
      </Link>
      <Link className="top" to={`/contact/${user}`}>
        <h1 className="text">Schedule Notebook</h1>
      </Link>
    </nav>
  );
}

export default Top;