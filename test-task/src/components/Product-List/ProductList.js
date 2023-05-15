import { Link} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { processSpecifications } from "../../utils/utils";


export default function ProductList(){
    const [products, setProducts] = useState([]);
    const[selected, setSelected] = useState([]);

    const deleteSelectedItems = () => {
        let data = JSON.parse(selected);
        axios.post("https://juniortesttask1.000webhostapp.com/products", data)
       .then(res=> {console.log(res)})
       .catch(err=>{
        console.log(err)
       })
    };



    useEffect( () => {
        const fetchProducts = async ()=>{
            const res = await axios.get("https://juniortesttask1.000webhostapp.com/products");
            setProducts(res.data.data);
            console.log(res.data.data);
          }
          fetchProducts();
  
      }, []);
  return (
    <div>
        <div>
          <nav>
            <div className="nav-links">
               <Link className="nav-brand" to="/">Product List</Link>
               <div className="nav-btns">
                    <Link to="/addproduct">
                        <button>ADD</button>
                    </Link>
                 <button id="delete-product-btn" onClick={deleteSelectedItems}>
                    MASS DELETE
                 </button>
               </div>
            </div>
            
          </nav>
        </div>

        <div>
          <div className="product-list">
          {products.map(item => (
                <div className="product-card">
                   <input type="checkbox" onChange={()=> {
                     if (!selected.includes(item.id)) {
                     setSelected([...selected , item.id])
                     }else{
                        selected.pop(item.id)
                        setSelected(selected)
                     }
                    }}/>
                   <p>{item.sku.toUpperCase()}</p>
                   <p className="product-name">{item.name}</p>
                   <p>{item.price}$</p>
                   <p>{processSpecifications(item.product_specifications)}</p>
                </div>
            ))}
          </div>
              
        </div>
    </div>
  )
}