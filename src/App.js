import React from'react';
import DayList from './Components/DayList'
import HourlyData from './Components/HourlyData'
import { useState } from 'react';
import {useEffect} from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NotFound from './Components/NotFound'


function App(){
       
    const [data,setData]=useState([]);
    const [showData,setShowData]=useState(false);


    const fetchData = async () => {
        try {
          const response = await fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=792e9a0b5981240e095367edbf83b9d1&units=metric'
          );
          const result = await response.json();
          const array=result.list;
          console.log(array);

          setData(array);



        } catch (err) {
          console.error(err);
        } finally {
            setShowData(true);
        }
      };
    
      useEffect(() => {
        fetchData();
        
      }, []); // Empty dependency array means this effect runs once after the initial render
    
    
    
return(<>


    <div className='container'>

    <h1>Weather Forecast</h1>
   
    <BrowserRouter>
<Routes>
    <Route path="/" element={showData? <DayList records={data}/> : 'No data found'}> 
    <Route path="details" element={<HourlyData />}/> 
    <Route path="*" element={<NotFound/>}/>
    </Route>
</Routes>
</BrowserRouter>
    </div>
    </>
)

}

export default App;

