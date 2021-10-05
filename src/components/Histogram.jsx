import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import '../styles/Histogram.css'
import Loading from './loading';

const Histogram = ({period, place, load}) => {
    const dispatch = useDispatch()
    const datesx=useSelector((state) => state.dates)
    const deaths =useSelector((state) => state.deaths)
    const confirmed =useSelector((state) => state.confirmed)
    const [data,setdata]=useState({})
    const [loading,setLoading]=useState(true)
    const [options,setoptions]=useState({})
const months=['January','February','March','April','May','June','July','August','September','October','November','December']
   const fetchData = async () => {

      await setLoading(true)
       switch(period){
            case 0:{
                const today= new Date()
                const feb=new Date('2020-02-01')
                const distance=(today.getFullYear()-feb.getFullYear())*12-feb.getMonth()+1+today.getMonth()
                for(let i = 1; i < distance;i++){
                    const datei=(new Date(today-(i*30*1000*3600*24)))
                    const date=datei.toISOString().split('T')[0]
                    const month = datei.getMonth()
                    const year = datei.getFullYear()
                    const fullDate=`${months[month]}, ${year}`
                    const response = await fetch(place==="All US"?`https://covid-api.com/api/reports/total?iso=USA&date=${date}`:`https://covid-api.com/api/reports?region_province=${place}&date=${date}`);
                    const data = await response.json();
                    dispatch({
                      type: 'SET_DEATH_LIST',
                      payload: place!=="All US"?data.data[0]:data.data,
                    });
                    dispatch({
                        type: 'SET_DATE_LIST',
                        payload: fullDate,
                      });
                      dispatch({
                        type: 'SET_CONFIRMED_LIST',
                        payload: place!=="All US"?data.data[0]:data.data,
                      });
                }
            }
            break;
            case 8:{
                const today= new Date()
                for(let i = 1; i < 9;i++){
                    const date=(new Date(today-(i*1000*3600*24))).toISOString().split('T')[0]
                    const response = await fetch(place==="All US"?`https://covid-api.com/api/reports/total?iso=USA&date=${date}`:`https://covid-api.com/api/reports?region_province=${place}&date=${date}`);
                    const data = await response.json();
                    console.log("the data of the error", today, date)
                    dispatch({
                      type: 'SET_DEATH_LIST',
                      payload: place!=="All US"?data.data[0]:data.data,
                    });
                    dispatch({
                        type: 'SET_DATE_LIST',
                        payload: date,
                      });
                      dispatch({
                        type: 'SET_CONFIRMED_LIST',
                        payload: place!=="All US"?data.data[0]:data.data,
                      });
                }
            }
            break;
            case 30:{
                const today= new Date()
                for(let i = 1; i < 31;i++){
                    const date=(new Date(today-(i*1000*3600*24))).toISOString().split('T')[0]
                    const response = await fetch(place==="All US"?`https://covid-api.com/api/reports/total?iso=USA&date=${date}`:`https://covid-api.com/api/reports?region_province=${place}&date=${date}`);
                    const data = await response.json();
                    dispatch({
                      type: 'SET_DEATH_LIST',
                      payload: place!=="All US"?data.data[0]:data.data,
                    });
                    dispatch({
                        type: 'SET_DATE_LIST',
                        payload: date,
                      });
                      dispatch({
                        type: 'SET_CONFIRMED_LIST',
                        payload: place!=="All US"?data.data[0]:data.data,
                      });
                }
            }
            break;
      default:{
        const response = await fetch('https://covid-api.com/api/reports/total?iso=USA');
        const data = await response.json();
        dispatch({
          type: 'SET_STATE_LIST',
          payload: data.data,
        });
        }
       }

       setdata({
        labels: datesx,
        datasets: [
          {
            label: '# of confirmed cases',
            data: confirmed,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor:['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
          {
            label: '# of deaths',
            data:deaths ,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor:['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          }
        ],
      })
      setoptions({
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
        onClick: function(evt, element) {
          window.location = `/${datesx[element[0].index]}`
          },
      })
      await setLoading(false)
    };

    useEffect(() => {
        fetchData()
        //fetchStates()
    }, [period, place]);
    return (
  
<div className="principal-container">
  <h1>{place}</h1>
  <div className="histogram-container">
    {
      loading?<Loading/>:null
    }  
     
    <Bar id="histogram01" data={data}
    options={options}
    />
     
  
 
  </div>
</div>
    );
  
  };
  
  export default Histogram;