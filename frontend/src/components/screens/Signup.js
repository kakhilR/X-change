import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css";
import './user.css';

const Signup = () => {
    const history = useHistory()
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState("")
    
    const userSignup =() =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#d50000 red accent-4"})
            return 
        }
        fetch("http://localhost:4000/api/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }else{
                M.toast({html:data.message,classes:"#d50000 blue accent-4"})
                history.push('/signin')
            }
        }).catch(err=>{console.log(err)})
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h3>X-change</h3>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)} />
                <input type="text" placeholder="email"  value={email} onChange={(e)=>setemail(e.target.value)}/>
                <input type="text" placeholder="password"  value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <button class="btn waves-effect waves-light" onClick ={()=>userSignup()} >Signup</button>
                <h5><Link to="/signin">Have an account?</Link></h5>
            </div>
        </div>
    )
}

export default Signup
