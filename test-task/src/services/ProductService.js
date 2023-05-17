import hostURL from "../constants/hosts";
import axios from "axios";


 export function getProducts() {
    return axios.get(hostURL)
 }   

export function createProduct(data , type){
   return  axios.post(`${hostURL}/${type}`, data)
   
}

export function deleteProducts(ids){
    return  axios.post(hostURL, ids)
    
 }