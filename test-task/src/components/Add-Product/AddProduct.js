import { useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
//import fetch from "fetch";
import { getSpecification } from "../../utils/utils";

export default function AddProduct(){
    let options = ['DVD' , "Book" , "Furniture"]
    const [selectedType, setSelectedType] = useState("");
   
    

    const handleChange = (event)=>{
        setSelectedType(event.target.value);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

       let sku = event.target[1].value;
       let name= event.target[2].value;
       let price = event.target[3].value;
       let product_type =event.target[4].value;
       let product_specifications =  getSpecification(event , product_type);
       let data= {
        "sku" : sku,
        "name" : name,
        "price" : price,
        "product_type" : product_type,
        "product_specifications" : product_specifications
       }
       let type= product_type.toLowerCase()

       const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json"
            }
      };
    let url =`https://juniortesttask1.000webhostapp.com/products/${type}`
    //  let url = `http://localhost/scandiweb-test-task/server/products/${type}`

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}


    return (
      <div>
  <div>
    <nav>
      <div className="nav-links">
        <Link className="nav-brand" to="/">Product Add</Link>
      </div>
    </nav>
  </div>

  <div className="form-container">
    <div>
      <form method="post" id="product_form" onSubmit={handleSubmit}>
        <div className="form-inputs">
        <div className="form-group">
          <label>
            SKU:
          </label>
          <input id="sku" type="text" placeholder="Enter Sku"/>
        </div>

        <div className="form-group">
          <label>
            Name:
          </label>
          <input id="name" type="text" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
          <label>
            Price:
          </label>
          <input id="price" type="text" placeholder="Enter Price"/>
        </div>

        <div className="form-group">
          <label>Product Switcher</label>
          <select onChange={handleChange}>
            {options.map((option) => (
              <option key={option} value={option} id={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {
          selectedType === 'Book' && (
            <div className="form-group">
              <p>
                Please Provide The Weight of the Book in KGs
              </p>
              <label>Weight</label>
              <input id="weight" type="text" placeholder="Enter Weight"/>
            </div>
          )
        }

        {
          selectedType === 'DVD' && (
            <div className="form-group">
              <p>
                Please Provide the Size of the DVD in MBs
              </p>
              <label>Size</label>
              <input id="size" type="text" placeholder="Enter Size"/>
            </div>
          )
        }

        {
          selectedType === 'Furniture' && (
            <div>
              <p>
                Please Provide the dimensions in HxWxL Format
              </p>
              <div className="form-group">
                <label>Height</label>
                <input id="height" type="text" placeholder="Enter Height"/>
              </div>
              <div className="form-group">
                <label>Width</label>
                <input id="width" type="text" placeholder="Enter Width"/>
              </div>
              <div className="form-group">
                <label>Length</label>
                <input id="length" type="text" placeholder="Enter Length"/>
              </div>
            </div>
          )
        }
        </div>

        <div className="form-btns">
          <Link to="#">
            <button type="submit" form="product_form">Save</button>
          </Link>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>

    )
}