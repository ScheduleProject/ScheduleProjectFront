import { useState } from 'react';
import { useHistory } from 'react-router';
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

    fetch(`http://localhost:5000/user`, {
            "method": "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            "body": JSON.stringify(values)
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
    <div className="box">
      <h1 className="content">New User</h1>
      <form className="textbox" onSubmit={onSubmit}>
          <input type="text" placeholder="User" name="name" onChange={onChange} />
          <input type="password" placeholder="Password" name="password" onChange={onChange} />
          <button 
          type="submit"
          className="btn">
              Salvar
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