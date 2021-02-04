import React,{useState} from 'react';
import M from 'materialize-css';

import './item.css';

const Uploaditem = ()=> {

    const [title,settitle] = useState('');
    const [description,setdescription] = useState('');
    const [age,setage] = useState('');
    const [image,setimage] = useState('')
    const [url,seturl] = useState('')

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
        .catch(err=>{console.log(err)});

        fetch("http://localhost:4000/api/create/product",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({title,description,age,pic:url})
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:'#c62828 red darken-3'})
            }
            else{
                M.toast({html:data.message,classes:'#e0e0e0 grey lighten-2'
                })
                // history.push('/')
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <div className="card  item-upload  input-filed">
            <input className="text-filed" type="text" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)} />
            <input className="text-filed" type="text" placeholder="description" value={description} onChange={(e)=>setdescription(e.target.value)}/>
            <input className="text-filed" type="text" placeholder="age" value={age} onChange={(e)=>setage(e.target.value)}/>
            {/* <a className='dropdown-trigger btn #424242 grey darken-3' href='#' data-target='dropdown1'>category!</a>
            <ul id='dropdown1' className='dropdown-content #424242 grey darken-3'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider #424242 grey darken-3" tabindex="-1"></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i className="material-icons #424242 grey darken-3">view_module</i>four</a></li>
            <li><a href="#!"><i className="material-icons #424242 grey darken-3">cloud</i>five</a></li>
            </ul> */}
            <div className="file-field input-field ">
                <div className="btn #424242 grey darken-3">
                    <span>choose item</span>
                    <input type="file"  onChange={(e)=>setimage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                <a className="waves-effect waves-light btn #424242 grey darken-3" onClick={()=>postDetails()}>Upload</a>
            </div>
        </div>
    )
}

export default Uploaditem 