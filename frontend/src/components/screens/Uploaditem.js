import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

import './item.css';

const Uploaditem = ()=> {

    const history = useHistory();

    const [ProductName,settitle] = useState('');
    const [description,setdescription] = useState('');
    const [productsDateofPurchase,setage] = useState('');
    const [image,setimage] = useState('')
    const [url,seturl] = useState('')

    useEffect(()=>{
        if(url){
            fetch("http://localhost:4000/api/create/product",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    ProductName,
                    description,
                    productsDateofPurchase,
                    Pictures:url})
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error,classes:'#c62828 red darken-3'})
                }
                else{
                    M.toast({html:"created post sucessfully",classes:'#e0e0e0 grey lighten-2'
                    })
                    history.push('/')
                }
            }).catch(err=>{
                console.log(err)
        })
    }
    },[url])

    const postDetails =()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","x-change")
        data.append("cloud_name","capdatabase")
        fetch("https://api.cloudinary.com/v1_1/capdatabase/image/upload",{
            method:"post",
            body:data
        }).then(res=> res.json())
        .then(data=>{
            seturl(data.url)
        })
        .catch(err=>{
            console.log(err)
        });
}
    return (
        <div className="card  item-upload  input-filed">
            <input className="text-filed" type="text" placeholder="title" value={ProductName} onChange={(e)=>settitle(e.target.value)} />
            <input className="text-filed" type="text" placeholder="description" value={description} onChange={(e)=>setdescription(e.target.value)}/>
            <input className="text-filed" type="text" placeholder="age" value={productsDateofPurchase} onChange={(e)=>setage(e.target.value)}/>
            <div className="file-field input-field ">
                <div className="btn #424242 grey darken-3">
                    <span>choose item</span>
                    <input type="file"  onChange={(e)=>setimage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                <a className="waves-effect waves-light btn #424242 grey darken-3" onClick={()=>postDetails()} >Upload</a>
            </div>
        </div>
    )
}

export default Uploaditem 