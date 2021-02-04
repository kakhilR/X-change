import React,{useState,useEffect} from 'react';

const Home = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/api/products/list',{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result.products)
            setData(result.products)
        })
    },[])
    return (
        <div className="home">
            {
                data.map(item=>{
                    return(<div className="card home-card">
                        <h4>{item.uploadedby}</h4>
                        <div className="card-image">
                            <img src={item.ProductPictures}/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favr</i>
                            <h6>title</h6>
                            <p>thiskjcshdcdsuch</p>
                        </div>
                    </div>)
                })
            }            
        </div>
    )
}

export default Home;