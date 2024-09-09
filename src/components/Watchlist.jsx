import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import db from '../Firebase/config'


function Watchlist() {

    const[watchlistArray,setWatchlistArray] = useState({})
    const watchlistCollection = collection(db,"watchlist")
    const watchedCollection = collection(db,"watched")
    const [movie,setMovie] = useState({})


    const fetchWatchlist = async ()  => {
        const data = await getDocs(watchlistCollection)
        setWatchlistArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(()=>{
        fetchWatchlist()
    },[])

    const addToWatched = async (id) => {
        const moviedoc = doc(db, 'watchlist', id)
        // await deleteDoc(moviedoc);
        console.log(moviedoc);
    }

  return (
    <>
        <div className="container-fluid pt-5 pb-3">
            <h2 className='heading ms-3 mb-3'>Watchlist</h2>
            <div className="row ps-5 border border-5 mx-3 px-0">
                {
                    watchlistArray?.length>0?watchlistArray.map((item,index)=>(
                        <div className="col my-3" key={index} style={{width:"20rem"}}>
                            <MDBCard style={{width:"20rem"}}>
                                <MDBCardImage src={item?.Poster} width={"100%"} position='top' alt='...' style={{aspectRatio:"3/4.5"}} />
                                <MDBCardBody>
                                    <MDBCardTitle>{item?.Title} ({item?.Year})</MDBCardTitle>
                                    <MDBCardText>
                                        {item?.Plot}
                                    </MDBCardText>
                                    <div className="button d-flex justify-content-between">
                                        <button className='btn btn-primary' onClick={() => addToWatched(movie.id)}>Add to watched</button>
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

export default Watchlist
