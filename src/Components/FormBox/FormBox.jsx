import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BsArrowClockwise } from "react-icons/bs";
import InputMask from "react-input-mask";
import './FormBox.css';

const initialValue = {
    name: "",
    email: "",
    cellphone: "",
    instagram: "",
    zip_code: "",
    address: "",
    address_number: "",
    state: "",
    district: "",
}

function FormBox({ id, user }) {
  const [values, setValues] = useState(id ? null: initialValue);
  const history = useHistory()
  useEffect(() => {
    if(id) {
      fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, 
      {
        "method":"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
      }})
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
      ? `${process.env.REACT_APP_API_URL}/contact/${id}`
      : `${process.env.REACT_APP_API_URL}/contact`

    fetch(url, {
            "method": method,
            headers: {
              'Authorization': `Bearer ${user}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            "body": JSON.stringify(values)
          })
          .then((response) => {
            history.push(`/contact/${user}`)
          });
  }

  function zipEffect() {
    const zipTransform = (str) => str.replace(/[^0-9]/g, '');
    const zip = zipTransform(values.zip_code);

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
          zip_code: zip,
          address: data.logradouro,
          address_number: values.addressNumber,
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
            <div> <BsArrowClockwise className="loading"/> </div>
            ) : (
            <form className="textbox" onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={onChange} value={values.name} />
                <input type="text" placeholder="Email" name="email" onChange={onChange} value={values.email} />
                <InputMask mask="(99)99999-9999" type="text" placeholder="Cellphone" name="cellphone" onChange={onChange} value={values.cellphone} />
                <InputMask mask="@****************************" maskChar={null} type="text" placeholder="Instagram" name="instagram" onChange={onChange} value={values.instagram} />
                <InputMask mask="99999-999" type="text" placeholder="Zip code" name="zip_code" onBlur={zipEffect} onChange={onChange} value={values.zip_code} />
                <input type="text" placeholder="Address" name="address" onChange={onChange} value={values.address} />
                <input type="text" placeholder="Address number" name="address_number" onChange={onChange} value={values.address_number} />
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