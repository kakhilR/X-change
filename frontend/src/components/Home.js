import React, { useEffect, useState } from 'react'

const Home = () => {

    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/api/products/list',{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result.posts)
            setData(result.posts)
        })
    },[])
    return (
      <div className="img-container" style ={{display: "flex",maxWidth:"70%",alignItems: "center",margin:"auto"}} >
          {
              data.map(item=>{
                  return(
                    <div className="card home-card" key={item._id} style ={{maxWidth:"259px",height:"340px",margin:"20px",backgroundColor:"white",}} >
                        <h5> {item.CreatedBy.name} </h5>
                        <div className="card-img" style ={{height: '200px',width: '250px'}}>
                            <img src={item.ProductPictures} />
                        </div>
                        <div className="img-content">
                            <h6>{item.ProductName} </h6>
                            <p>{item.description}</p>
                        </div>
                    </div>
                  )
              })
          }
      </div>
    )
}

export default Home
