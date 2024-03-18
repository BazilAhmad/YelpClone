import React from 'react'

const AddRestaurant = () => {
  return (
    <div className="mb-4">
      <form>
        <div className="row gx-2"> {/* Adjusted for gap between columns */}
          <div className="col me-2">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col me-2">
            <input className="form-control" type="text" placeholder="Location" />
          </div>
          <div className="col me-2">
            <select className="form-select my-1">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant