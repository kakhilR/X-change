import React from 'react'
import logo from '../../logo.svg';
import './item.css'
const Profile = () => {
    return (
        <div style={{maxWidth:"950px",margin:"0 auto",}}>
            <div style={{display:"flex",justifyContent:'space-around',margin:'18px 0px',borderBottom:"1px solid white"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius: '20px'}} src={logo} alt ="pic" />
                </div>
                <div>
                    <h3>Profile</h3>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h5>my products</h5>
                        <h5>product sold</h5>
                        <h5>product bought</h5>
                    </div>
                </div>
            </div>
            <div className="uploads">
                     <img className ="pic" src={logo} alt ="pic" />   
                     <img className ="pic" src={logo} alt ="pic" />   
                     <img className ="pic" src={logo} alt ="pic" />   
                     <img className ="pic" src={logo} alt ="pic" />   
                     <img className ="pic" src={logo} alt ="pic" />   
                     <img className ="pic" src={logo} alt ="pic" />   
            </div>
        </div>
    )
}

export default Profile
