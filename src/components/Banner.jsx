import { MDBCarousel, MDBCarouselItem, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import banner1 from '../images/banner1.webp'
import banner2 from '../images/banner2.jpg'
import banner3 from '../images/banner3.avif'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { addDoc, collection } from 'firebase/firestore'
import db from '../Firebase/config'


function Banner() {
  const[searchValue,setSearchvalue] = useState("")
  const[options,setOptions] = useState([])
  const movieCollection = collection(db,"movies")
  const watchedCollection = collection(db,"watched")
  const watchlistCollection = collection(db,"watchlist")

  useEffect(()=>{
    searching(searchValue)
  },[searchValue])

    const searching = async (searchValue) =>{
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=c27aadee`)
      if(response.data.Response=="True") {
        setOptions(response.data.Search)
      }else{
        setOptions([])
      }
    }


    // modal
    const [lgShow, setLgShow] = useState(false);
    const [movie,setMovie] = useState({})

    const searchMovie = async () => {
      if(searchValue == "") {
        alert("Fill the input field")
      }else{
        const response = await axios.get(`https://www.omdbapi.com/?t=${searchValue}&apikey=c27aadee`)
        if (response.data.Response == "False") {
          alert(response.data.Error)
        }else{
          setMovie(response.data)
          console.log(movie);
          setLgShow(true)
        }
      }
    }


    //add to watched
    const addToWatched = async () => {
      await addDoc(movieCollection,movie)
      await addDoc(watchedCollection,movie)
      setLgShow(false)
    }

    //add to watchlist
    const addToWatchlist = async () => {
      await addDoc(movieCollection,movie)
      await addDoc(watchlistCollection,movie)
      setLgShow(false)

    }
  return (
    <>
      <div className="banner position-relative d-flex justify-content-center align-items-center">
        <MDBCarousel style={{width:"100vw"}}>
        <MDBCarouselItem itemId={1} interval={3000} >
            <img src={banner1} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2} interval={3000}>
            <img src={banner2} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3} interval={3000}>
            <img src={banner3} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
        </MDBCarouselItem>
        </MDBCarousel>
        <div className="search position-absolute p-5">
            <h2 className='text-light text-center mb-5'>Add movies to the collection</h2>
            <div className="d-flex">
              <MDBInput list="myDatalist" className='text-primary' style={{ width: '50vw' }} onInput={(e)=>setSearchvalue(e.target.value)} />
              <datalist id="myDatalist">
                {
                  options?.length>0?options.map((item,index)=>(
                    <option key={index} value={item?.Title}>{item?.Year}</option>
                  )):
                  <option value=""></option>
                }
              </datalist>
              <button onClick={searchMovie} className='button btn text-primary bg-light ms-3'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          {movie?.Title} ({movie?.Year})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap justify-content-around">
            <img src={movie?.Poster} alt="" />
            <div className="content mt-3">
              <p>Title: {movie?.Title}</p>
              <p>Plot: {movie?.Plot}</p>
              <p>Released: {movie?.Released}</p>
              <p>Genre: {movie?.Genre}</p>
              <p>imdbRating: {movie?.imdbRating}/10</p>
            </div>
          </div>
          <div className="action d-flex justify-content-between px-5 pt-5 pb-3">
            <button className='btn btn-primary' onClick={addToWatchlist}>Add to Watchlist</button>
            <button className='btn btn-primary' onClick={addToWatched}>Add to Watched</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Banner



// import { MDBCarousel, MDBCarouselItem, MDBInput } from 'mdb-react-ui-kit'
// import React, { useEffect, useState } from 'react'
// import banner1 from '../images/banner1.webp'
// import banner2 from '../images/banner2.jpg'
// import banner3 from '../images/banner3.avif'
// import axios from 'axios'
// import { Modal } from 'react-bootstrap'

// function Banner() {
//   const[searchValue,setSearchvalue] = useState("")
//   const[options,setOptions] = useState([])

//   useEffect(() => {
//     searching(searchValue)
//   }, [searchValue])

//   const searching = async (searchValue) => {
//     const response = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=c27aadee`)
//     if(response.data.Response === "True") {
//       setOptions(response.data.Search)
//     } else {
//       setOptions([])
//     }
//   }

//   // modal
//   const [lgShow, setLgShow] = useState(false);
//   const [movie, setMovie] = useState({})

//   const searchMovie = async () => {
//     if (searchValue === "") {
//       alert("Fill the input field")
//     } else {
//       const response = await axios.get(`https://www.omdbapi.com/?t=${searchValue}&apikey=c27aadee`)
//       if (response.data.Response === "False") {
//         alert(response.data.Error)
//       } else {
//         setMovie(response.data)
//         setLgShow(true)
//       }
//     }
//   }

//   const searchMovieList = async (id) => {
//     const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=c27aadee`)
//     if (response.data.Response === "False") {
//       alert(response.data.Error)
//     } else {
//       setMovie(response.data)
//       setLgShow(true)
//     }
//   }

//   return (
//     <>
//       <div className="banner position-relative d-flex justify-content-center align-items-center">
//         <MDBCarousel style={{width:"100vw"}}>
//           <MDBCarouselItem itemId={1} interval={3000} >
//             <img src={banner1} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
//           </MDBCarouselItem>
//           <MDBCarouselItem itemId={2} interval={3000}>
//             <img src={banner2} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
//           </MDBCarouselItem>
//           <MDBCarouselItem itemId={3} interval={3000}>
//             <img src={banner3} className='d-block w-100' style={{aspectRatio:"3/1"}} alt='...' />
//           </MDBCarouselItem>
//         </MDBCarousel>
//         <div className="search position-absolute p-5">
//           <h2 className='text-light text-center mb-5'>Add movies to the collection</h2>
//           <div className="d-flex">
//             <div className='position-relative'>
//               <MDBInput list="myDatalist" className='text-primary' style={{ width: '50vw' }} onInput={(e) => setSearchvalue(e.target.value)} />
//               <select className="form-select ms-3 position-absolute expanded" style={{width:"25vw"}} onChange={(e) => searchMovieList(e.target.value)}>
//                 <option value=""> </option>
//                 {
//                   options?.length > 0 ? options.map((item, index) => (
//                     <option key={index} value={item?.imdbID}>{item?.Title} ({item?.Year})</option>
//                   )) : <option value="">No options</option>
//                 }
//               </select>
//             </div>
//             <button onClick={searchMovie} className='button btn text-primary bg-light ms-3'>
//               <i className="fa-solid fa-magnifying-glass"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//       <Modal
//         size="lg"
//         show={lgShow}
//         onHide={() => setLgShow(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             {movie?.Title} ({movie?.Year})
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex flex-wrap justify-content-around">
//             <img src={movie?.Poster} alt="" />
//             <div className="content mt-3">
//               <p>Title: {movie?.Title}</p>
//               <p>Plot: {movie?.Plot}</p>
//               <p>Released: {movie?.Released}</p>
//               <p>Genre: {movie?.Genre}</p>
//               <p>imdbRating: {movie?.imdbRating}/10</p>
//             </div>
//           </div>
//           <div className="action d-flex justify-content-between px-5 pt-5 pb-3">
//             <button className='btn btn-primary'>Add to Watchlist</button>
//             <button className='btn btn-primary'>Add to Watched</button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

// export default Banner
