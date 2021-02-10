import React,{useEffect,createContext,useReducer, useContext} from 'react'
import { BrowserRouter as Router,Route,Switch,useHistory}from 'react-router-dom';
import Home from './components/Home';


import Navbar from './components/Navbar';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Uploaditem from './components/screens/Uploaditem';
import {reducer,initialState} from './reducer/Reducer.js'

export const UserContext = createContext();

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("saveduser"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
  },[])
  return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/upload" component={Uploaditem} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
    <Router>
      <Navbar/>
      <Routing />
    </Router>
    </UserContext.Provider>
  )
}

export default App
