import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/loading';
import '../styles/chart.css'

const Chart = (props) => {
    const date= props.match.params.date
    const [loading,setLoading]=useState(true)
    const dispatch = useDispatch()
    const states = useSelector((state) => state.stateDataList);
    const [deaths, setDeaths] = useState(0)
    const [confirmed, setConfirmed] = useState(0)
 
 

   const fetchData = async () => {
    const response = await fetch(`https://covid-api.com/api/reports?iso=USA&date=${date}`);
    const data = await response.json();
    dispatch({
    type: 'SET_STATE_DATA',
    payload: data.data,
    });
    const response2 = await fetch(`https://covid-api.com/api/reports/total?iso=USA&date=${date}`);
    const data2 = await response2.json();
    setDeaths(data2.data.deaths)
    setConfirmed(data2.data.confirmed)
    setLoading(false)
    };
    useEffect(() => {
        fetchData()
    }, []);
    return (
  
      <>
<div className="table-container">
{loading?<Loading/>:null}
<div className="country-info">
  <h1>All US</h1>
<h2>Date:</h2>
<p>{date}</p>
<h2>Deaths:</h2>
<p>{deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
<h2>Confirmed:</h2>
<p>{confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
</div>
<table>
  <tr>
    <th>State</th>
    <th>Confirmed</th>
    <th>Deaths</th>
  </tr>
{states.length>0?states.map(item=>
  <tr>
    <td>{item.region.province}</td>
    <td>{item.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
    <td>{item.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
  </tr>
):null
}
</table>
    
</div>
      </>
    );
  
  };
  
  export default Chart;