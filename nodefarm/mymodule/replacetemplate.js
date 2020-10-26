

module.exports =(temp,obj)=>{

     

          let output=temp.replace(/{%image%}/g,obj.image);
      
           output=output.replace(/{%productname%}/g,obj.productName);
           output=output.replace(/{%price%}/g,obj.price);
           output=output.replace(/{%description%}/g,obj.description);
           output=output.replace(/{%nutrients%}/g,obj.nutrients);
           output=output.replace(/{%id%}/g,obj.id);
           output=output.replace(/{%from%}/g,obj.from);
           output=output.replace(/{%quantity%}/g,obj.quantity);
      
      
      
          if(!obj.organic){
               output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
          }
      
       return output;    
      
      

}