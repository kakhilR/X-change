import React,{useState,useContext,} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';


import {UserContext} from '../../App.js';
import './user.css';


const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:'enter a valid email',classes:'#c62828 red darken-3'})
            return
        }
        fetch("http://localhost:4000/api/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({email,password})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:'#c62828 red darken-3'})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:'sucessfully logedin',classes:'#e0e0e0 grey lighten-2'
                })
                history.push('/')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return (
        <div classname ="signin-card">
            <div className="card auth-card input-field">
                <h2>X-Change</h2>
                <input type="text" placeholder="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)} />
                <input type="text" placeholder="password" 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}/>
                <a className="waves-effect waves-light btn-large #424242 grey darken-3" onClick={()=>PostData()}>Sign in</a>
                <br></br>
                <a>new user? please<Link to="/signup" className='signuplink' >Sign up</Link> here</a>
            </div>
        </div>
    )
}

export default Signin;