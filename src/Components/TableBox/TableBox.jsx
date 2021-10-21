import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsStarFill, BsPlusLg } from "react-icons/bs";
import FilterBox from './FilterBox/FilterBox';
import './TableBox.css';

function TableBox() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('asc')

  useEffect(() => {
    fetch(`http://localhost:5000/contact?order=asc`, {"method":"GET"})
      .then(res => res.json())
      .then(result => {
          setItems(result);
          setFilter('asc');
        },
        (error) => {
          setError(error);
        }
      )
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

    fetch(`http://localhost:5000/contact?order=${filterValue}`, {"method":"GET"})
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
          {error ? (
            <div>Error: {error.message}</div>
          ) : (
            items.map(item => (
              <li className="tuple" key={item.id}>
              <Link className="tupleLink" to={`/view/${item.id}`}>
                {item.name}
              </Link>
              {item.fav ? (<BsStarFill className="fav"/>): null}
            </li>
            ))
          )}
        </ul>
      </div>

      <Link to="/create">
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