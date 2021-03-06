import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsStarFill, BsPlusLg, BsArrowClockwise } from "react-icons/bs";
import FilterBox from './FilterBox/FilterBox';
import './TableBox.css';

function TableBox({ user }) {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState('asc')
  //verifyToken(localStorage.getItem("token"))

  if (error) { console.log(error) }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/contact?order=asc`, 
    {
      "method":"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }})
      .then(res => res.json())
      .then(result => {
          setItems(result);
          setFilter('asc');
          setIsLoaded(true)
        },
        (error) => {
          setError(error);
        }
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onClickFilter(filterValue) {

    if (filterValue === 'asc'){
      filterValue = 'date';
    } else if (filterValue === 'date'){
      filterValue = 'like';
    } else if (filterValue === 'like'){
      filterValue = 'asc';
    }

    setFilter(filterValue);

    fetch(`${process.env.REACT_APP_API_URL}/contact?order=${filterValue}`, 
    {
      "method":"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }})
      .then(res => res.json())
      .then(result => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      )
  }

  return (
    <div className="box">
      <div className="filter">
        <button className="btnFilter" onClick={() => onClickFilter(filter)}>
          <FilterBox value={filter} />
        </button>
      </div>
      <h1 className="content">Your Contacts</h1>
      <div className='table'>
        <ul className="list">
          {
            !isLoaded ? (<div> <BsArrowClockwise className="loading"/> </div>) : 
            ( 
              items.map(item => (
                <li className="tuple" key={item.id}>
                  <Link className="tupleLink" to={`/view/${user}/${item.id}`}>
                    {item.name}
                  </Link>
                  {item.fav ? (<BsStarFill className="fav"/>): null}
                </li>
              ))
            )
          }
        </ul>
      </div>

      <Link to={`/create/${user}`}>
        <button
        className="btn"
        value="NewContact">
            <BsPlusLg  className="Adicionar">Adicionar</BsPlusLg>
        </button>
      </Link>
    </div>
  );
}

export default TableBox;