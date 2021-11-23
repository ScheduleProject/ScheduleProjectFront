import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { BsReplyFill } from "react-icons/bs";
import './NewUserBox.css';

const initialValue = {
    name: "",
    password: "",
}

function LoginBox() {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState([])
  const history = useHistory()

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    
    const user_name = btoa(values.name);
    const user_password = btoa(values.password);
    
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
            "method": "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': user_name + ":" + user_password
            }
          })
          .then(res => 
            {
                if (res.status === 201){
                history.push(`/`);
                } else {
                    res.json().then(data => {
                        setError(data)
                    })
                }
            }
          );
  }

  return (
    <div className="box_out">
      <Link to={`/`} className="linkLogin">
        <button className="btnLogin">
          <BsReplyFill className="logoFilter"/>
        </button>
      </Link>
      <h1 className="content">New User</h1>
      <form className="textbox" onSubmit={onSubmit}>
          <input type="text" placeholder="User" name="name" onChange={onChange} />
          <input type="password" placeholder="Password" name="password" onChange={onChange} />
          <button 
          type="submit"
          className="btn">
              Create
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