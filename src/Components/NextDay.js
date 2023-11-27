import React from 'react'

import Card from './Card'
import Clear from '../Images/day_clear.png'
import Clouds from '../Images/day_partial_cloud.png'
import Rain from '../Images/rain_thunder.png'
import Snow from '../Images/snow.png'
import Low from '../Images/cold.png'
import High from '../Images/high.png'


function weatherImage(desc) {
switch(desc){
    case 'Clear': return Clear;
    case 'Clouds': return Clouds;
    case 'Rain': return Rain;
    case 'Snow': return Snow;
}
}
function NextDay({raw,today}) {
    console.log('nextday component',raw[0].date)
  
let minTemp=raw[0].min;
let maxTemp=raw[0].max;
   raw.forEach((i)=>{
    if(i.min<minTemp)
    minTemp=i.min;
})

raw.forEach((i)=>{
    if(i.max>maxTemp)
    maxTemp=i.max;
})

console.log('TODAYYY',today)

const currentTime = new Date(); // Current time
const currentMilliseconds = currentTime.getTime();
let timeDiff=Infinity;
let closestIndex=0;


raw.forEach((item, index) => {
    const [h, m, s] = item.time.split(":").map(Number);
    const timeStamp = new Date();
    timeStamp.setHours(h, m, s);
    const dataMilliseconds = timeStamp.getTime();
    const diff = Math.abs(currentMilliseconds - dataMilliseconds);
  
    if (diff < timeDiff) {
      timeDiff = diff;
      closestIndex = index;
    }
  });

//console.log('index',closestIndex);
    const date=new Date(raw[0].date);
    console.log('date RAWWW',raw[0].date);
    const formattedDate=date.toLocaleString();
    const img=weatherImage(raw[closestIndex].desc);
    const tempimg=raw[closestIndex].temp>7?High:Low;
    //console.log('raw',raw[closestIndex].temp);
    
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }); // full day name
const month = date.toLocaleDateString('en-US', { month: 'short' }); // full month name
const date1 = date.toLocaleDateString('en-US', { day: 'numeric' });



  return (
today?

<div><Card>
        
<table>
    <tr>

    <td className="row1">
    <h3>Boston</h3>
    <h5>{month}, {date1}<br></br>{day}</h5>
    
<br></br>

<img  style={{width:'30px'}} src={tempimg}/>
    <h1 style={{lineHeight:'0.2em', display:'inline'}}>{raw[closestIndex].temp}°</h1>
    <p style={{fontSize:'0.8em', lineHeight:'1.0em'}}>feels like {raw[0].feelsLike}°</p>


    </td>
    <td className="row2"><img className='weatherImg' src={img}/></td>
    <td className="row3"><ul style={{listStyleType:'none' , fontSize:'0.8em', lineHeight:'1.6em'}}>
        <li>min {minTemp}°</li>
        <li>max {maxTemp}°</li>
        <li>humidity {raw[closestIndex].humidity}%</li>
        <li>wind {raw[closestIndex].wind}km/h</li>
        
        </ul></td>

    </tr>
    </table>

</Card></div>

: <div>

<Card>  
    <div style={{marginTop:'1%', justifyContent:'center',textAlign:'center',padding:'23px'}}>
    <h5  style={{ display:'inline'}}>{month}, {date1}</h5><br/>
<h6 style={{ display:'inline' }}>{day}</h6>
<br/><br/>
<img  className='nextDayImg' src={img}/><br/>
<h6 style={{ display:'inline'}}>{raw[closestIndex].desc}</h6>
<div style={{display:'flex', alignItems:'center',justifyContent:'center',marginTop:'-12px'}}>
<img  style={{ width:'23px',height:'auto', display:'inline', marginTop:'3px'}} src={tempimg}/>
<h3  style={{ display:'inline'}}>{raw[closestIndex].temp}°</h3>
</div>

<div style={{marginTop:'-12px'}}> 
<p style={{fontSize:'0.6em' , display:'inline', }}> min </p>
<p style={{fontSize:'0.6em' , display:'inline', marginLeft:'20px'}}> max</p><br/>  

<p style={{fontSize:'0.6em' , display:'inline'}}> {minTemp} ° </p>
<p style={{fontSize:'0.6em' , display:'inline', marginLeft:'20px'}}> {maxTemp}° </p>
</div>

    </div>
   

</Card>

</div>
   
   
  )
}

export default NextDay