import './TableBox.css';
import { Link } from 'react-router-dom';
import json from './teste.json'

function ListItem(props) {
  return (
      <li className="tuple">
        <Link className="tupleLink" to="/">
          {props.value}
        </Link>
      </li>
  );
}

function ContactList(props) {
  const contactJson = props.contactJson;
  const listItems = contactJson.map((contact) =>
    <ListItem key={contact.name.toString()}
              value={contact.name} />
  );
  return (
    <ul className="list">
      {listItems}
    </ul>
  );
}

function TableBox() {
  return (
    <div className="box">
        <h1 className="content"> Contacts </h1>
        <div className='table'>
          <ContactList contactJson={json} />
        </div>

        <button
        className="btn"
        value="NewContact">
          <Link className="top" to="/form">
            <h1 className="text">+</h1>
          </Link>
        </button>{/*onClick={this.handleClick}*/}
    </div>
  );
}

export default TableBox;