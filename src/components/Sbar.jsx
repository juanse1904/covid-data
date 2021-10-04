import React, { useState,useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import search from '../assets/static/search.png';
import Histogram from './Histogram';
import '../styles/Sbar.css';



const Sbar = (props) => {
  let stateByName = useSelector((state) => state.stateListByName)
  const [dropdown, setdropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [period, setPeriod] = useState(8);
  const [place, setPlace] = useState('All US');
  const dispatch = useDispatch()
  function filterState(e) {
    props.stateByName(e.target.value);
  }
  function changePeriod(period) {
    dispatch(
      {
        type:'RESET_VALUES',
        payload:[]
      }
    )
    setPeriod(period)
  }

  function changePlace(place) {
    dispatch(
      {
        type:'RESET_VALUES',
        payload:[]
      }
    )
    setPlace(place)
  }


  return (
    <>
    <div className='infobar'>

      <div className={`${show ? 'sbar open' : 'sbar'}`} onClick={() => setShow(!show)}>
      <img src={search} alt='search icon' />
      <input type='text' placeholder='Search for a State...' onChange={filterState} onClick={() => setShow(!show)}   />
        <ul>
          {
            stateByName.map((state)=>(
              <li onClick={() => changePlace(state)}>{state}</li>
            ))
          }
        </ul>
      </div>

      <div className={`${dropdown ? 'dropdown open' : 'dropdown'}`} onClick={() => setdropdown(!dropdown)} id='filter'>
        Filter by period
        <ul>
          <li onClick={() => changePeriod(8)}>Last 7 days</li>
          <li onClick={() => changePeriod(30)}>Last month</li>
          <li onClick={() => changePeriod(0)}>Since the begining of the pandemic</li>
        </ul>
      </div>
    </div>
    <Histogram period={period} place={place}/>
    </>
  );
};

const stateByName = (payload) => ({
  type: 'SET_STATE_BYNAME',
  payload,
});
const mapDispatchToProps = {
  stateByName,
};
export default connect(null, mapDispatchToProps)(Sbar);