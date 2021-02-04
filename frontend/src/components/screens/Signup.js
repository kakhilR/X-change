import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

import './user.css';
const Signup = () => {

    const history = useHistory()
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:'enter a valid email',classes:'#c62828 red darken-3'})
            return
        }
        fetch("http://localhost:4000/api/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:'#c62828 red darken-3'})
            }
            else{
                M.toast({html:data.message,classes:'#e0e0e0 grey lighten-2'
                })
                history.push('/signin')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return (
        <div classname ="signin-card">
            <div className="card auth-card input-field">
                <h2>X-Change</h2>
                <input type="text" placeholder="UserName" value={name}
                onChange={(e)=>setname(e.target.value)} />
                <input type="text" placeholder="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)} />
                <input type="text" placeholder="password" 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}/>
                <a className="waves-effect waves-light btn-large #424242 grey darken-3" onClick={()=>PostData()}>Sign up</a>
                <br />
                <a>have an account please <Link to="/signin" className = "signinlink">Sign in</Link> here</a>

            </div>
        </div>
    )
}

export default Signup;