import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {UserContext} from '../App.js'
import './Navbar.css'

const Navbar = () => {
    const {state,dispatch} = useContext(UserContext);
    const renderList =()=>{
      if(state){
        return[
              <li><Link to="/profile">Profile</Link></li>
        ]
      }
      else{
        return[
              <li><Link to="/" /></li>,
              <li><Link to="/signin" >Sign in</Link></li>,
              <li><Link to="/signup">Sign up</Link></li>
          
        ]
      }
    }
  return (
        <nav>
          <div className="nav-wrapper #616161 grey darken-2">
            <Link to='/' className="brand-logo left">X-Change</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {renderList()}
              <li><Link to ={state? '/uploaditem' :'signin'} ><a className="waves-effect waves-light btn #424242 grey darken-3"><AddCircleOutlineIcon />Change it</a></Link></li>
              {/* <li><Link to="/signin" >Sign in</Link></li>
              <li><Link to="/signup">Sign up</Link></li> */}
              {/* <li><Link to="/profile">Profile</Link></li> */}
            </ul>
          </div>
      </nav>
    )
}

export default Navbar
