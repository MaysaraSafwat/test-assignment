import { useState } from "react";
import { Link } from "react-router-dom";
import { getSpecification } from "../../utils/utils";
import { createProduct } from "../../services/ProductService";

export default function AddProduct(){
    let options = ['DVD' , "Book" , "Furniture"]
    const [selectedType, setSelectedType] = useState("");
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [productSpecifications, setProductSpecifications] = useState(null);
    const [isFilled, setIsFilled]=useState(true);

    const handleChange = (event) => {
      console.log(event.target.name)
      switch (event.target.name) {
        case "selectType":
          setSelectedType(event.target.value);
          break;
        case "sku":
          setSku(event.target.value);
          break;
        case "name":
          setName(event.target.value);
          break;
        case "price":
          setPrice(event.target.value);
          break;
      }
    };

    
  const handleSubmit = async (event) => {
    event.preventDefault();

    let productSpecifications = getSpecification(event, selectedType);
    let data = {
      "sku": sku,
      "name": name,
      "price": price,
      "product_type": selectedType.toLocaleLowerCase(),
      "product_specifications": productSpecifications
    };
    for (const key in data) {
      console.log(data[`${key}`])
      !data[`${key}`] ? setIsFilled(false): setIsFilled(true);
    }
    if(isFilled){
      let type = selectedType.toLocaleLowerCase()
      createProduct(data , type)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    }else {
      return; 
    }

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
        {
          !isFilled && (
            <div>Please Fill All Info</div>
          )
        }
        <div className="form-inputs">
        <div className="form-group">
          <label>
            SKU:
          </label>
          <input id="sku" name="sku" type="text" placeholder="Enter Sku" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>
            Name:
          </label>
          <input id="name" name="name" type="text" placeholder="Enter Name"  onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>
            Price:
          </label>
          <input id="price" type="text" name="price" placeholder="Enter Price"  onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Product Switcher</label>
          <select onChange={handleChange} name="selectType">
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
              <input id="weight" type="text" placeholder="Enter Weight"  onChange={handleChange}/>
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
              <input id="size" type="text" placeholder="Enter Size"  onChange={handleChange}/>
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
                <input id="height" type="text" placeholder="Enter Height"  onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label>Width</label>
                <input id="width" type="text" placeholder="Enter Width"  onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label>Length</label>
                <input id="length" type="text" placeholder="Enter Length" onChange={handleChange}/>
              </div>
            </div>
          )
        }
        </div>

        <div className="form-btns">
          
            <button type="submit" form="product_form">Save</button>
          
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


