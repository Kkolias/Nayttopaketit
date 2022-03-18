import './Navbar.css';
import React from 'react'

export default function Navbar(props) {

    const handleChange = (e) => {
        props.setSearchTerm(e.target.value)
    }
    const handleSort = (e) => {
        // Järjestäminen esim hinnan tai nimen perusteella
        switch(e.target.value) {
            case "priceLow":
                props.setResData(
                       prevData => [...prevData.sort((a,b) => parseFloat(a.pricePerWeek - parseFloat(b.pricePerWeek)))]
                )   
                break;
            case "priceHigh":
                props.setResData(
                    prevData => [...prevData.sort((a,b) => parseFloat(b.pricePerWeek - parseFloat(a.pricePerWeek)))]
                )
                break;
            case "nameAsc":
                props.setResData(
                    prevData => [...prevData.sort((a,b) => a.name.localeCompare(b.name))]
                )
                break;
            default:
                return;
        }
    }

  return (
    <div className='navbar-container'>
        <input className='search-field' placeholder='Etsi kohteita...' onChange={handleChange}></input>
        <div className='filters'>
            <div className='sort-select-container'>
                <select name='sort' className='sort-select' onChange={handleSort}>
                    <option value="default">Järjestä</option>
                    <option value="priceLow">Hinta halvin</option>
                    <option value="priceHigh">Hinta kallein</option>
                    <option value="nameAsc">Nimi</option>   
                </select>
            </div> 
        </div>
    </div>
  )
}
