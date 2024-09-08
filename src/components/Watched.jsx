import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'

function Watched() {
  return (
    <>
        <div className="container-fluid pt-5 pb-3">
            <h2 className='heading ms-3 mb-3'>Watched movies</h2>
            <div className="row ps-5 border border-5 mx-3 px-0">
                <div className="col my-3" style={{width:"20rem"}}>
                    <MDBCard style={{width:"20rem"}}>
                        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' width={"100%"} position='top' alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle>Card title</MDBCardTitle>
                            <MDBCardText>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                            </MDBCardText>
                            <MDBBtn href='#'>Button</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Watched
