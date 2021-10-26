import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { BsTrash2Fill, BsPencilFill, BsFillEnvelopeFill, BsTelephoneFill, BsInstagram, BsGeoAltFill, BsStarFill, BsStar, BsArrowClockwise} from "react-icons/bs";
import './ContactBox.css';

function ContactBox({ id , user }) {
  const [values, setValues] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory()
  const fullAddress = `${values.address}, ${values.address_number} - ${values.district}, ${values.state}`

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`,
    {
      "method":"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }})
    .then(res => res.json())
    .then(result => {
      setValues(result)
      setIsLoaded(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickDelete() {
    fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
            "method": 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
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

    fetch(`${process.env.REACT_APP_API_URL}/contact/fav/${id}?fav=${f}`, {
            "method": 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          }})
          .then((response) => history.push(`/contact/${user}`));
  }

  return (
    <div className="box">
      {
        !isLoaded ? (<div> <BsArrowClockwise className="loading"/> </div>):
        (
          <div>
            <h1 className="content">{values.name}</h1>
            <div className="infoWapper">
              <ul  className="contactInfo">
                <li className="info"><BsTelephoneFill className="icons"/> {values.cellphone}</li>
                <li className="info"><BsFillEnvelopeFill className="icons"/> {values.email}</li> 
                <li className="info"><BsInstagram className="icons"/> {values.instagram}</li> 
                <li className="info"><BsGeoAltFill className="icons"/> {fullAddress}</li> 
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
        )
      }
    </div>
  );
}

export default ContactBox;