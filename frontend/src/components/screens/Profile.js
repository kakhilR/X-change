import React from 'react';
import pic from '../../mypic.jpg';
import './user.css';

const Profile = () => {
    return (
        <div className="profile">
           <div className ="profile-header">
               <div>
                   <img style ={{width:'100px',height:'100px',borderRadius:'30px',justifyContent:'space-between'}} src={pic}/>
               </div>
               <div>
                   <h4>akhi</h4>
                    <h6>my Items</h6>
               </div>
           </div>
           <div className ="uploaded" >
                <img className="upload" src={pic} />
                <img className="upload" src={pic} />
                <img className="upload" src={pic} />
                <img className="upload" src={pic} />
                <img className="upload" src={pic} />
           </div>
        </div>
    )
}

export default Profile;