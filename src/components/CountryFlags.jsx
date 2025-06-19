import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Country(){  
  let [countries, setCountries]=useState([]);
  const [searchVal, setSearchVal] = useState("");
  let [filteredCountries, setFilteredCountries]=useState([]);

  useEffect(()=>{
    getApiData();
  },[])

   useEffect(() => {
  const filteredItems = countries.filter((c) =>
    c.common.toLowerCase().includes(searchVal.toLowerCase())
    );

    setFilteredCountries(filteredItems);
},[searchVal, countries])

  const getApiData=()=>{
    return axios.get(`https://countries-search-data-prod-812920491762.asia-south1.run.app/countries`)
    // .then(data=> data.JSON)
    .then(jsondata=> 
      {console.log("printing api data",jsondata.data)
      setCountries(jsondata.data);
      setFilteredCountries(jsondata.data)
      }
    )
    .catch(e=> console.error("Error fetching data:",e))
  }
  
  
  const handleSearch=(e)=>{
        setSearchVal(e.target.value);
  }

  // let temp=["India", "America", "Australia", "London", "Canada", "China", "Korea"];
    return (
      <div style={{display:"flex",
        gap:"8px",
        flexWrap:"wrap",
        padding:"50px"
        
      }}>

        <div style={{width:'100%'}}>
        <input type="text" 
        value={searchVal} 
        onChange={handleSearch} 
        placeholder='Type to search' 
        style={{width:'50%'}}/>             
        </div>

        {filteredCountries.map(c => (
        <div 
        className="countryCard"    
        style={{border: "1px solid grey",
          borderRadius:"10%",
          height : "150px",
          width : "150px",
          display:"flex",
          flexDirection: "column",
          alignItems:"center",
          textAlign:"center",
          padding:"1px",
          justifyContent:"center"}}
          key={c.common}
          >
            <img src={c.png} alt={c.common}
            style={{height:"80px", width:"80px"}}/>
            <p>{c.common}</p>                   
            </div>
      ))}
      </div>
    )
}