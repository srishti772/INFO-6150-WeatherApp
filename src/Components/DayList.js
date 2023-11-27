import React from 'react'

import NextDay from './NextDay'
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

const DayList = ({records}) => {

    const uniqueDays={};
    

    records.filter((item)=>{

        const date=item.dt_txt.split(' ')[0];
        const time =item.dt_txt.split(' ')[1];
        const DateFilter=new Date(date);
        const today=new Date();
      //console.log('item',item);
        const temp=item.main.temp;
        
     //  console.log('currentDay',currentDay);
     //console.log('FEEELS LIKE ',item.weather[0].main);


           
            //console.log('filter',item.main.temp);
            
          
            if(!uniqueDays[date]){
                uniqueDays[date]=[
                    {'id':item.dt,
                        'date':date,
                    'time':time,
                    'temp':temp,
                'max':item.main.temp_max,
                'min':item.main.temp_min,
                'desc':item.weather[0].main,
                'feelsLike':item.main.feels_like,
                'wind':item.wind.speed,
                'humidity' :item.main.humidity,
              }
            ];}
            

            else {
                uniqueDays[date].push( {
                    'id':item.dt,
                'date':date,
                'time':time,
                'temp':temp,
            'max':item.main.temp_max,
            'min':item.main.temp_min,
            'desc':item.weather[0].main,
            'feelsLike':item.main.feels_like,
            'wind':item.wind.speed,
            'humidity' :item.main.humidity,
          });

            }
    
      //   console.log('filtered',uniqueDays);
        
        

    }

    )




    
//console.log('daylist componenet ',records)
  return (
    <div>


{Object.keys(uniqueDays)
        .filter((date)=>new Date(date).toLocaleDateString()===new Date().toLocaleDateString())
        .map((date) => (
          <Link  to="/details" state={{ from: {data:uniqueDays[date]} }} > 
          
          <NextDay id={uniqueDays[date][0].id}  raw={uniqueDays[date]}  today={true}/>
          
          </Link>
        ))
        }


        <div style={{display:'flex',backgroundColor:'transparent',maxWidth:'600px', gap:'2%',flexWrap:'wrap',justifyContent:'space-around'}}>
        {
  Object.keys(uniqueDays)
  .filter((date)=> {
    return(new Date(date).toLocaleDateString()!=new Date().toLocaleDateString() )
  })
  .map((date) => (   
    <Link to="/details"  state={{ from: {data:uniqueDays[date],isDown:false} }}>
      <NextDay id={uniqueDays[date][0].id}  raw={uniqueDays[date]}  today={false}/>
      </Link>
  ))
}


        
        </div>
        <Outlet/>
    </div>



  )
}

export default DayList