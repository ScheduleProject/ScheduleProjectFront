import { useState } from 'react';
import { useHistory } from 'react-router';
import { BsPersonPlusFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import verifyToken from '../../Controller/jwtReader'
import './LoginBox.css';


const initialValue = {
    name: "",
    password: "",
}

function LoginBox() {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState([]);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const user_credencial = btoa(values.name + ":" + values.password);

    fetch(`${process.env.REACT_APP_API_URL}/login`, {
            "method": "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + user_credencial
            }
          })
          .then(res => res.json())
          .then(result => {
            if (result.token){
              localStorage.setItem("token",result.token)
              history.push(`/contact/${verifyToken(localStorage.getItem("token")).id}`);
            } else {
              setError(result)
            }
          }
        );
  }

  return (
    <div className="box_out">
      <Link to={`/newUser`} className="linkNew">
        <button className="btnNewUser">
          <BsPersonPlusFill className="logoFilter"/>
        </button>
      </Link>
      <h1 className="content">Login</h1>
      <form className="textbox" onSubmit={onSubmit}>
          <input type="text" placeholder="User" name="name" onChange={onChange} />
          <input type="password" placeholder="Password" name="password" onChange={onChange} />
          <button 
          type="submit"
          className="btn">
              Submit
          </button>
      </form>
      {
        error.error? (
          <div className="errorText">{error.error}</div>
        ) : (null)
      }
    </div>
  );
}

export default LoginBox;