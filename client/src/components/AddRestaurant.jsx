import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const{addRestaurants} =useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")
    const handleSubmit = async (e) => {
        e.preventDefault() // never want to reload the page in react. This (on clicking the add button) will stop that from happening so we dont lose any state variables
        try{
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange,
            })
            addRestaurants(response.data.data.restaurant)
            console.log(response)
        } catch(err) {

        }
    }
  return (
    <div className="mb-4">
      <form>
        <div className="row gx-2"> {/* Adjusted for gap between columns */}
          <div className="col me-2">
            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col me-2">
            <input value={location} onChange={e => setLocation(e.target.value)} className="form-control" type="text" placeholder="Location" />
          </div>
          <div className="col me-2">
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select my-1">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant