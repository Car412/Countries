import './App.css';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/landingPage';
import Home from './components/home';
import GetDetail from './components/detail.jsx';
import CreateActivity from './components/createActivity.jsx';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/create' element={<CreateActivity/>}/>
        <Route exact path='/details/:id' element={<GetDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
