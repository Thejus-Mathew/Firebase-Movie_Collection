import { collection, getDocs } from 'firebase/firestore'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import db from '../Firebase/config'


function Movies() {
    const [movieArray,setMovieArray] = useState({})
    const movieCollection = collection(db,"movies")


    const fetchMovies = async () => {
        const data = await getDocs(movieCollection)
        setMovieArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(()=>{
        fetchMovies()
    },[])
    
  return (
    <>
        <div className="container-fluid pt-5 pb-3">
            <h2 className='heading ms-3 mb-3'>My Movies</h2>
            <div className="row ps-5 border border-5 mx-3 px-0">
                {   movieArray?.length>0?movieArray.map((item,index)=>(

                    <div className="col my-3" key={index} style={{width:"20rem"}}>
                        <MDBCard style={{width:"20rem"}}>
                            <MDBCardImage src={item?.Poster} width={"100%"} position='top' alt='...' style={{aspectRatio:"3/4.5"}} />
                            <MDBCardBody>
                                <MDBCardTitle>{item?.Title} ({item?.Year})</MDBCardTitle>
                                <MDBCardText>
                                    {item?.Plot}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    )):<p>Add movies to display here</p>
                }
            </div>
        </div> 
    </>
  )
}

export default Movies
