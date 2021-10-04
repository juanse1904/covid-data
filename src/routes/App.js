import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../containers/Home';
import Chart from '../containers/Chart';

const App =()=>(
    <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route exact path='/:date' component={Chart} />
    </BrowserRouter>

);

export default App;
