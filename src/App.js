import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [resData, setResData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

const URL = 'https://utils.api.outshine.fi/v1/screen-list';

  useEffect(() => {
    //Haetaan apilta data
    const fetchData = async () => {
      const res = await axios.get(URL)
      setResData(res.data)
      // console.log(res.data)
    }
    fetchData()
  }, [])

  const handleClick = (key, val) => {
    console.log(key, val)
  }

  return (
    <div className="App">
      <ShoppingCart />
      <Navbar
       setSearchTerm={setSearchTerm}
       searchTerm={searchTerm}
       resData={resData}
       setResData={setResData}
      />
      <div className='products-full-container'>
      {resData.filter((val) => {
        if (searchTerm === "") {
          
          return val
        } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          
          return val
        }
      }).map((val, key) => {
        return (
          <div key={key} className='product-container' onClick={() => handleClick(key,val)}>
            <div className='product-name-and-address'>
              <h3>{val.name}</h3>
              <p>{val.address}</p>
            </div>
            
            <div className='image-container'>
              <img alt='showcase' src={val.images[0]}/>
            </div>
            <div className='price'>
              {val.pricePerWeek}€/vko
            </div>
            
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
