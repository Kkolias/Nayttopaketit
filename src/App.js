import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [resData, setResData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [cartArr, setCartArr] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

const URL = 'https://utils.api.outshine.fi/v1/screen-list';

  useEffect(() => {
    //Haetaan apilta data
    const fetchData = async () => {
      const res = await axios.get(URL)
      setResData(res.data)
    }
    fetchData()
  }, [])
  // tavaroiden lisäys ostoskoriin sekä kokonaishinnan päivitys
  const addCart = (val) => {
    setCartArr(prevArr => [...prevArr, val])
    setTotalCost(totalCost + val.pricePerWeek)
  }

  return (
    <div className="App">
      <div className='cart-icon' onClick={() => setCartVisible(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/></svg>
      </div>
      {cartVisible && <ShoppingCart 
        setCartVisible={setCartVisible} 
        cartArr={cartArr} 
        setCartArr={setCartArr} 
        setTotalCost={setTotalCost} 
        totalCost={totalCost}/>}

      <Navbar
       setSearchTerm={setSearchTerm}
       searchTerm={searchTerm}
       resData={resData}
       setResData={setResData}
      />
      <div className='products-full-container'>
        {/* Näyttöjen mappaus yksittäisiksi laatikoiksi sekä haku toiminto */}
      {resData.filter((val) => {
        if (searchTerm === "") {
          
          return val
        } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          
          return val
        }
      }).map((val, key) => {
        return (
          <div key={key} className='product-container'>
            <div className='product-name-and-address'>
              <h3>{val.name}</h3><div className='add-to-cart-btn' onClick={() => addCart(val)}>+</div>
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
