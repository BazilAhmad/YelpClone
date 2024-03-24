import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
    let navigate = useNavigate()
    const [name, setName]=useState("")
    const [location, setLocation]=useState("")
    const [price_range, setPriceRange]=useState("")

    const {id} = useParams() //a hook to get the id from the url
    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)



        }
        fetchData();
    }, []) //pass in the mp dependeny array so it only runs when the component mounts

    const handleSubmit = async(e) => {
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: price_range
        })
        navigate("/")
    }

    return (
    <div>
      <form action="">
        <div className="form-group">
            <label htmlFor='name'> Name </label>
            <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"/>
        </div>

        <div className="form-group">
            <label htmlFor='location'> Location </label>
            <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text"/>
        </div>

        <div className="form-group">
            <label htmlFor='price_range'> Price Range </label>
            <input value={price_range} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}


export default UpdateRestaurant
