import { useState } from 'react';
import { useHistory } from 'react-router';
import './LoginBox.css';

const initialValue = {
    name: "",
    password: "",
}

function LoginBox() {
  const [values, setValues] = useState(initialValue);
  const history = useHistory()

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    fetch(`http://localhost:5000/login`, {
            "method": "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            "body": JSON.stringify(values)
          })
          .then(res => res.json())
          .then(result => {
            if (result.token){
                history.push(`/contact/${result.token}`);
            } else {
                console.log('erro');
            }
          }
        );
  }

  return (
    <div className="box">
        <h1 className="content">Login</h1>
        {!values 
          ? (
            <div></div>
            ) : (
            <form className="textbox" onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={onChange} />
                <input type="password" placeholder="Password" name="password" onChange={onChange} />
                <button 
                type="submit"
                className="btn">
                    Salvar
                </button>
            </form>
            )}
    </div>
  );
}

export default LoginBox;