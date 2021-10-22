import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { BsTrash2Fill, BsPencilFill, BsFillEnvelopeFill, BsTelephoneFill, BsInstagram, BsGeoAltFill, BsStarFill, BsStar} from "react-icons/bs";
import './ContactBox.css';

function ContactBox({ id , user }) {
  const [values, setValues] = useState([]);
  const history = useHistory()

  useEffect(() => {
    fetch(`http://localhost:5000/contact/${id}`,
    {
      "method":"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`
    }})
    .then(res => res.json())
    .then(result => setValues(result))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickDelete() {
    fetch(`http://localhost:5000/contact/${id}`, {
            "method": 'DELETE',
            headers: {
              'Authorization': `Bearer ${user}`
          }})
          .then((response) => history.push(`/contact/${user}`));
  }

  function onClickFav() {
    var f = values.fav

    if (f) {
      f = false
    } else {
      f = true
    }

    fetch(`http://localhost:5000/contact/fav/${id}?fav=${f}`, {
            "method": 'PUT',
            headers: {
              'Authorization': `Bearer ${user}`
          }})
          .then((response) => history.push(`/contact/${user}`));
  }

  return (
    <div className="box">
      <h1 className="content">{values.name}</h1>
      <div className="infoWapper">
        <ul  className="contactInfo">
          <li className="info"><BsTelephoneFill className="icons"/> {values.cellphone}</li>
          <li className="info"><BsFillEnvelopeFill className="icons"/> {values.email}</li> 
          <li className="info"><BsInstagram className="icons"/> {values.instagram}</li> 
          <li className="info"><BsGeoAltFill className="icons"/> {values.address}, {values.addressNumber} - {values.district}, {values.state}   </li> 
        </ul>
      </div>
      <div className="btnConf">
      <button
        className="btnAtualizar"
        value="EditContact"
        onClick={onClickFav}>
          {values.fav ?
            <BsStarFill className="Atualizar">Favorito</BsStarFill>:
            <BsStar className="Atualizar">Favorito</BsStar>
          }
        </button>

        <Link to={`/edit/${user}/${id}`}>
          <button
          className="btnAtualizar"
          value="EditContact">
              <BsPencilFill className="Atualizar">Atualizar</BsPencilFill>
          </button>
        </Link>

        <button
        className="btnDelete"
        value="DeleteNewContact"
        onClick={onClickDelete}>
            <BsTrash2Fill className="Delete">Excluir</BsTrash2Fill>
        </button>
      </div>
    </div>
  );
}

export default ContactBox;