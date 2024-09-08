import { MDBCarousel, MDBCarouselItem, MDBInput } from 'mdb-react-ui-kit'
import React from 'react'
import banner1 from '../images/banner1.webp'
import banner2 from '../images/banner2.jpg'
import banner3 from '../images/banner3.avif'


function Banner() {
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
                <input type="text" className='form-control input text-primary' style={{width:"50vw"}} />
                <button className='button btn text-primary bg-light ms-3'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Banner
