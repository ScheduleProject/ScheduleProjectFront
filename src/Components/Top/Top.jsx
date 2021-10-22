import './Top.css';
import { Link } from 'react-router-dom';

function Top({ user }) {
  return (
    <nav className="Menu">
       <Link className="top" to={`/contact/${user}`}>
            <h1 className="text">Schedule Notebook</h1>
        </Link>
    </nav>
  );
}

export default Top;