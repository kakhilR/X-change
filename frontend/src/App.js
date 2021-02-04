import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar.js'
import { BrowserRouter as Router, Route,Switch,useHistory} from 'react-router-dom';

import Home from './components/Home.js'
import Profile from './components/screens/Profile.js'
import Signin from './components/screens/Signin.js';
import Signup from './components/screens/Signup.js';
import Uploaditem from './components/screens/Uploaditem.js';
import { reducer ,initialState,} from './reducer/Reducer.js'



export const UserContext = createContext()

const Routing =()=>{
  //now we can access history in here
  const history = useHistory()
  const{state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})  
    }
    
  },[])
  return (
      <Switch>
        <Route path ='/' exact component={Home} />
        <Route path ='/uploaditem' exact component={Uploaditem} />
        <Route path ='/signin' component={Signin} />
        <Route path ='/profile' component={Profile} />
        <Route path ='/signup' component={Signup} />
      </Switch>
  )
}

function App() {
  //cannot access history in here because every thing wraped inside the BrowserRouter
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  )
}

export default App;