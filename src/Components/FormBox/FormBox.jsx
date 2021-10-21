import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import InputMask from "react-input-mask";
import './FormBox.css';

const initialValue = {
    name: "",
    email: "",
    cellphone: "",
    instagram: "",
    zipCode: "",
    address: "",
    addressNumber: "",
    state: "",
    district: "",
}

function FormBox({ id }) {
  const [values, setValues] = useState(id ? null: initialValue);
  const history = useHistory()

  useEffect(() => {
    if(id) {
      fetch(`http://localhost:5000/contact/${id}`, {"method":"GET"})
        .then(res => res.json())
        .then(result => {
            setValues(result)
          }
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? 'PUT' : 'POST' 
    const url = id 
      ? `http://localhost:5000/contact/${id}`
      : 'http://localhost:5000/contact'
    
    fetch(url, {
            "method": method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            "body": JSON.stringify(values)
          })
          .then((response) => {
            history.push('/')
          });
  }

  function zipEffect() {
    const zipTransform = (str) => str.replace(/[^0-9]/g, '');
    const zip = zipTransform(values.zipCode);

    if(zip && zip.length !== 8) {
      return;
    };

    fetch(`https://viacep.com.br/ws/${zip}/json/`, {"method":"GET"})
      .then(res => res.json())
      .then(data => {
        const zipValue = {
          name: values.name,
          email: values.email,
          cellphone: values.cellphone,
          instagram: values.instagram,
          zipCode: zip,
          address: data.logradouro,
          addressNumber: values.addressNumber,
          state: data.bairro,
          district: data.localidade,
        }
        setValues(zipValue);
      });
  }

  return (
    <div className="box">
        <h1 className="content">{id ? 'Edit': 'New'} Contact</h1>
        {!values 
          ? (
            <div></div>
            ) : (
            <form className="textbox" onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={onChange} value={values.name} />
                <input type="text" placeholder="Email" name="email" onChange={onChange} value={values.email} />
                <InputMask mask="(99)99999-9999" type="text" placeholder="Cellphone" name="cellphone" onChange={onChange} value={values.cellphone} />
                <InputMask mask="@****************************" maskChar={null} type="text" placeholder="Instagram" name="instagram" onChange={onChange} value={values.instagram} />
                <InputMask mask="99999-999" type="text" placeholder="Zip code" name="zipCode" onBlur={zipEffect} onChange={onChange} value={values.zipCode} />
                <input type="text" placeholder="Address" name="address" onChange={onChange} value={values.address} />
                <input type="text" placeholder="Address number" name="addressNumber" onChange={onChange} value={values.addressNumber} />
                <input type="text" placeholder="District" name="district" onChange={onChange} value={values.district} />
                <input type="text" placeholder="State" name="state" onChange={onChange} value={values.state} />
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

export default FormBox;