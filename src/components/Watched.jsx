import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import { collection, getDocs } from 'firebase/firestore'
import db from '../Firebase/config'

function Watched() {
    
    const[watchedArray,setWatchedArray] = useState({})
    const watchedCollection = collection(db,"watched")

    const fetchWatched = async () =>{
        const data = await getDocs(watchedCollection)
        setWatchedArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(()=>{
        fetchWatched()
    },[])

  return (
    <>
        <div className="container-fluid pt-5 pb-3">
            <h2 className='heading ms-3 mb-3'>Watched movies</h2>
            <div className="row ps-5 border border-5 mx-3 px-0">
                {
                    watchedArray?.length>0?watchedArray.map((item,index)=>(
                        <div className="col my-3" key={index} style={{width:"20rem"}}>
                            <MDBCard style={{width:"20rem"}}>
                                <MDBCardImage src={item?.Poster} width={"100%"} position='top' alt='...' style={{aspectRatio:"3/4.5"}} />
                                <MDBCardBody>
                                    <MDBCardTitle>{item?.Title} ({item?.Year})</MDBCardTitle>
                                    <MDBCardText>
                                        {item?.Plot}
                                    </MDBCardText>
                                    <div className="button d-flex justify-content-end">
                                        <button className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    )):<p>Add movies to watchlist</p>
                }
            </div>
        </div> 
    </>
  )
}

export default Watched
