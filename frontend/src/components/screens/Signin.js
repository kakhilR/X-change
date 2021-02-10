import React,{useState,useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import './user.css';
import M from 'materialize-css';
import { UserContext } from '../../App';

const Signin = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    
    const userSignin =() =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#d50000 red accent-4"})
            return 
        }
        fetch("http://localhost:4000/api/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
                password})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("saveduser",JSON.stringify(data.saveduser))
                dispatch({type:"USER",payload:data.saveduser})
                M.toast({html:"signed in successfully",classes:"#d50000 blue accent-4"})
                history.push('/')
            }
        }).catch(err=>{console.log(err)})
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h3>X-change</h3>
                <input type="text" placeholder="email"  value={email} onChange={(e)=>setemail(e.target.value)}/>
                <input type="text" placeholder="password"  value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <button class="btn waves-effect waves-light" onClick ={(e)=>userSignin()} >Signin</button>
                <h5><Link to="/signup">Don't have an account?</Link></h5>
            </div>
        </div>
    )
}

export default Signin
