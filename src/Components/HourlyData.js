import React from 'react'
import Card from './Card' 
import { useLocation } from 'react-router-dom'
import Low from '../Images/cold.png'
import High from '../Images/high.png'
import Clear from '../Images/day_clear.png'
import Clouds from '../Images/day_partial_cloud.png'
import Rain from '../Images/rain_thunder.png'
import Snow from '../Images/snow.png'
import  { useState, useRef } from 'react';


function weatherImage(desc) {
  switch(desc){
      case 'Clear': return Clear;
      case 'Clouds': return Clouds;
      case 'Rain': return Rain;
      case 'Snow': return Snow;
  }
  }
function HourlyData() {
  const ulRef = useRef(null);
  const cardRef = useRef(null);
  
  


  const location = useLocation()
  const  from  = location.state
  const dataSet=from.from.data;
  let isDown=from.from.isDown;
  let startx;
  let scrollLeft;
  
 
  const mousedown=(event)=>{
    isDown=true;
   

    
    if(event.type==='mousedown')startx=event.pageX-ulRef.current.offsetLeft;
    if(event.type==='touchstart')startx = event.touches[0].pageX - ulRef.current.offsetLeft;
   // console.log("PAGEX---",event.pageX);
    //console.log("STARTTTT---",startx);

  }

  const mouseleave=()=>{
    isDown=false;
  }
  

  const mouseup=()=>{
    isDown=false;
  }


  const mousemove=(event)=>{
    //console.log("EVENTT---",event.type);
    
   if(!isDown) return; //stop from running
   if(event.type==='mousemove') event.preventDefault(); //stops selection of text etc

   //console.log("do work");
   //console.log(isDown);
   //console.log("STARTTTT---",startx);
   //console.log("SCROll---",event);
   //console.log("ULREFFF",ulRef.current.childElementCount)
   scrollLeft = ulRef.current.scrollLeft ;
   let x=0;
   if(event.type==='mousemove')  {x=event.pageX-ulRef.current.offsetLeft;

   }
   else x = event.touches[0].pageX - ulRef.current.offsetLeft;

   const walk = (x-startx)/(ulRef.current.childElementCount*2); //how far we have deviated from actual place
   ulRef.current.scrollLeft=scrollLeft-walk;
   //console.log("SCROLLLEFT---",scrollLeft,x,' startx',startx,'deviation from initial point',walk)
  }


    const date=new Date(dataSet[0].date);
    const [y, mo, d] = dataSet[0].date.split("-").map(Number);
    
   // console.log('month',mo);
  
   // console.log('inside Hourly data for ',dataSet[0].date,' length is',dataSet.length, dataSet);
  return (
    <div>Hourly Data for &nbsp;
{d} / {mo} / {y}

<Card ref={cardRef}>
            <ul className="dailyData" onMouseDown={mousedown} onMouseUp={mouseup}  onMouseMove={mousemove} onMouseLeave={mouseleave} 
             onTouchStart={mousedown}
             onTouchMove={mousemove}
             onTouchEnd={mouseup}
            ref={ulRef} >
{dataSet && dataSet.map((item, index) => 
{
const [h, m, s] = item.time.split(":").map(Number);

const timestamp=new Date(item.date);
timestamp.setHours(h,m,s);
const tempimg=item.temp>7?High:Low;
const img=weatherImage(item.desc);

const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,});
//console.log(formattedTime);

        return(
                <li key={item.time} className="dailyDataItem"> 
                 
            {formattedTime} <br/>
            <div style={{textAlign:'center'}}>
            <img  style={{ width:'18px',height:'auto'}} src={img}/><br/>
            <p style={{ fontSize:'0.7em',marginTop:'-1px',}} >{item.desc}</p>
            </div>
            
          
            <img  style={{ width:'18px',height:'auto', display:'inline', marginTop:'3px'}} src={tempimg}/>
            {item.temp}°<br/>

           <div style={{marginTop:'-2px'}}> 
    <p style={{fontSize:'0.6em' , display:'inline', }}>min</p>
    <p style={{fontSize:'0.6em' , display:'inline', marginLeft:'20px'}}>max</p><br/>  
    
    <p style={{fontSize:'0.6em' , display:'inline'}}>{item.min}°</p>
    <p style={{fontSize:'0.6em' , display:'inline', marginLeft:'17px'}}>{item.max}°</p>
    </div>

           
            
            
            <p></p>
            </li>
            
            

            )
            
})}

</ul>
        </Card>

    </div>
  )
}

export default HourlyData
