import React from 'react'
import { connect } from 'react-redux'
import { createPlant } from "../store/plants"
import { Link } from "react-router-dom"

export class Create extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            name: "",
            price: 0,
            description: "",
            location: "Outdoor",
            care:"Moderate",
            inventory: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt) {
        evt.preventDefault()

        this.props.createPlant({...this.state})
        // this.setState({
        //     name:"", 
        //     price: 0, 
        //     description: "",
        //     location: "",
        //     care:"Moderate",
        //     inventory: 0
        // })
    }

    render(){
        const { handleSubmit,handleChange } = this
        const { name, price, description, location, care, inventory } = this.state

        return(
          <div>
                <h1>Add New Plant</h1>

            <form id="add-plant-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input name="name" required onChange={handleChange} value={name} />

                    <label htmlFor="price">Price:</label>
                    $<input name="price" required onChange={handleChange} value={price} />

                    <label htmlFor="description">Description</label>
                    <input name="description" required onChange={handleChange} value={description}/>

                    <label htmlFor="location">Choose Location:</label>
                    <select name="location" required onChange={handleChange} value={location}>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Indoor">Indoor</option>
                    </select>


                    <label htmlFor="care">Care:</label>
                    <select name="care" required onChange={handleChange} value={care}>
                        <option value="Moderate">Moderate</option>
                        <option value="Easy">Easy</option>
                        <option value="No-Fuss">No Fuss</option>
                    </select>

                    <label htmlFor="inventory">Inventory:</label>
                    <input name="inventory" required onChange={handleChange} value={inventory} />    
                </div>
                <br />
                <div>
                    <button type="submit">Submit</button>
                    <Link to="/admin">
                        <button type="cancel">Cancel</button>
                    </Link>
                </div>
            </form>
          </div>
        )
    }
}

// const mapState = (state) => {
//     return{

//     }
// }

const mapDispatch = (dispatch, { history }) => {
    return {
        createPlant: (plant) => dispatch(createPlant(plant, history))
    }
}

export default connect(null, mapDispatch)(Create)