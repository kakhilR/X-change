import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {UserContext} from '../App.js'
import './Navbar.css'

const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const renderList =()=>{
      if(state){
        return[
          <li><Link to="/profile">Profile</Link></li>,
          <li><a className="waves-effect waves-light btn #d50000 red accent-4" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
          }}>logout</a></li>,
        ]
      }else{
        return[
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>,
        ]
      }
    }
  return (
    <nav>
    <div className="nav-wrapper #80cbc4 teal lighten-3">
      <Link to="/" className="brand-logo left">X-CHANGE</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to={state? "/upload":"/signin"}>Change</Link></li>
        {renderList()}
      </ul>
    </div>
  </nav>
    )
} 

export default Navbar
