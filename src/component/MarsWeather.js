import React, { useState,useEffect } from "react";
import {getWeather} from "../utils"
import {Link} from "react-router-dom"

const MarsWeather = () => {
    const [marsWeatherData,setMarsWeatherData] = useState([])
    const [sortedData,setSortedData] =useState([])

    const getMarsWeather = async (selectedDate) => {
        //the true flag for real api data or mock
        getWeather(true).then(res => {
            if (res && res?.sol_keys) {
                const data = [];
                for (const [key,value] of Object.entries( res.sol_keys)) {
                    if(key){
                        res[value]['sol'] = value;
                        data[value] = res[value];
                    }
                }
                setMarsWeatherData(data);
            } else {
                setMarsWeatherData();
            }
        })
    }


    const handleChange = (e) => {
        const sortBy = e.target.value;
        let sortedDataRes = [];

        if(sortBy === 'temperature'){
             sortedDataRes = marsWeatherData.sort((a, b) => {return b?.AT?.av - a?.AT?.av});
        }else if(sortBy === 'pressure'){
            sortedDataRes = marsWeatherData.sort((a, b) => {return a?.PRE?.av - b?.PRE?.av });
        }
        setSortedData(sortedDataRes);
    }


    useEffect(()=>{
        getMarsWeather();
    },[])


    useEffect(()=>{
        if(marsWeatherData && sortedData.length > 0){
            setMarsWeatherData(sortedData);
        }
    },[sortedData,marsWeatherData,setSortedData])


    return (
        <div >
            <Link to="/" style={{float:'right'}}>Home</Link>
           <div style={{textAlign:'center'}}>
            <h1>Mars Images By Date</h1>
             </div>
            <div className={'marsWeather_container'}>
                <div><select className={'marsWeather_sortBy'} name="sortby" onChange={(e)=>handleChange(e)} >
                    <option value="null">Sort By</option>
                    <option value="temperature">Temperature</option>
                    <option value="pressure">Pressure</option>
                </select></div>
            {marsWeatherData && marsWeatherData.map((sol,idx)=>{
                return (
                    <div className={'marsWeather_box'} key={'marsWeather_box_' + idx}>
                        <p>Data point:<span >{sol.sol}</span> </p>
                        <p>Temperature(AVG):<span >{sol?.AT?.av}</span> </p>
                        <p>Wind(AVG):<span >{sol?.HWS?.av}</span> </p>
                        <p>Pressure(AVG):<span >{sol?.PRE?.av}</span> </p>
                        <p>First UTC:<span >{sol.First_UTC}</span> </p>
                        <p>Last UTC:<span >{sol.Last_UTC}</span> </p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}


MarsWeather.defaultProps = {}

export default MarsWeather