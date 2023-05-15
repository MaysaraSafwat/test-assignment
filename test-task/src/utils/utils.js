export function processSpecifications(specifications) {
    let spcJson = JSON.parse(specifications);
   if(spcJson.weight){
    return `Weight: ${spcJson.weight}Kg`
   }
   if (spcJson.size){
    return `Size: ${spcJson.size}MB`
   }
   if(spcJson.dimensions){
    return `Dimensions : ${spcJson.dimensions.width}W X ${spcJson.dimensions.length}L X ${spcJson.dimensions.height}H`
   }
    
}

export function getSpecification (e , type) {
    if(type === 'Book') {
      let weight = e.target[5].value;
      return {"weight" : weight}
    }
    if (type==='DVD'){
        let size = e.target[5].value;
        return {"size" : size}
    }
    if(type ==='Furniture'){
       let h =e.target[5].value;
       let w = e.target[6].value;
       let l= e.target[7].value;
       return {
        "dimensions" : {
            "height" : h,
            "width" : w,
            "length" : l

        }
       }
    }
}