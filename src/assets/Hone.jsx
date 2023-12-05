import axios from 'axios'
import { useEffect, useState } from 'react';
import '../assets/home.css';
import {LineChart,Line, Tooltip,CartesianGrid,XAxis,Legend,YAxis} from 'recharts'
export default function Hone() {
const [week, setweek] = useState(null)
const [ids, setids] = useState(null)
const [location, setlocation] = useState('')
const [current, setcurrent] = useState(null)

const getid = async()=>{
const options = {
  method: 'GET',
  url: `https://foreca-weather.p.rapidapi.com/location/search/${location}`,
  params: {
    lang: 'en',
    country: 'in'
  },
  headers: {
    'X-RapidAPI-Key': 'de48716b7emsh8f5d8c663f5428ap16550fjsnc98f3b4b389c',
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  const id = response.data.locations['0']['id']
  setids(id)
  wheather(id)
  
  
} catch (error) {
  console.error(error);
}
}
// console.log(id)
const wheather =async(id)=>{
const options = {
  method: 'GET',
  url: `https://foreca-weather.p.rapidapi.com/current/${id}`,
  params: {
    alt: '0',
    tempunit: 'C',
    windunit: 'MS',
    tz: 'GMT+5:30',
    lang: 'en'
  },
  headers: {
    'X-RapidAPI-Key': 'de48716b7emsh8f5d8c663f5428ap16550fjsnc98f3b4b389c',
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  setcurrent(response.data.current)
    forcast(id)

} catch (error) {
	console.error(error);
}
}


const forcast = async(id)=>{
const options = {
  method: 'GET',
  url: `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}`,
  params: {
    alt: '0',
    tempunit: 'C',
    windunit: 'MS',
    periods: '8',
    dataset: 'full'
  },
  headers: {
    'X-RapidAPI-Key': 'de48716b7emsh8f5d8c663f5428ap16550fjsnc98f3b4b389c',
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  repeat()
  setweek(response.data.forecast)
} catch (error) {
  console.error(error);
}
}
 const repeat = ()=>{
  const interId = setInterval(() => {
    getid()
  },6000);
 }
    
  return (
    <div className='container form-style'>
      <input className='form-control form-style' type="text" placeholder='City name' onChange={(e)=>{setlocation(e.target.value)}}/>
      <button onClick={getid}>okk</button>
      {current == null
      ?""
    :<div className='row'>
      <h3 className='color'>Today Wheather</h3>
        <div className='col-lg-3 color' style={{float:"left"}}>
          TIME: {current.time}
        </div>
        
        <div className='col-lg-4 color'style={{float:"left"}}>
          <h4>
            Temperature: {current.temperature}<sup>o</sup>C
            </h4>
        </div>

        <div className='col-lg-4 color'style={{float:"left"}}>
          <h3>
             {location}
            
            </h3> 
        </div>
        
        <div className='col-lg-4 color' style={{float:"left"}}>
          wind   : {current.windSpeed} m/s<br/>
        </div> 
        <div className='col-lg-4 color' style={{float:"left"}}>
          precip : {current.precipProb}
     
        </div> <div className='col-lg-4 color' style={{float:"left"}}>
          humidity : {current.relHumidity}
        </div>  
<div className='row charts'>
    <LineChart width={1050} height={350} data={week}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis  dataKey="date"/>
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="maxTemp" stroke="#8884d8" />
    <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
    </LineChart>
  </div>
     {
      week==null
      ?""
      :week.map((data)=>{
        return(<>
        <div className='card1 color'>
        <h4>
          {data.date}<br/>
          {data.symbolPhrase}<br/>
          </h4>
          <h3>{data.maxTemp} <sup>o</sup>C</h3>
        sunrise:{data.sunrise}<br/>
        sunset:{data.sunset}<br/>
        Precip:{data.precipAccum}<br/>
          </div>
        </>
         
        )

      })}
</div>
}
</div>
       
  )
}

