import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBFooter, MDBIcon, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <div className="bg-black text-white mb-0 pb-4">

                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='https://www.facebook.com/aayush.lingwal.14' target="_blank" className='me-4 text-reset'>
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href='https://www.instagram.com/aayush_lingwal_/' target="_blank" className='me-4 text-reset'>
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a href='https://in.linkedin.com/in/ayush-lingwal-a10a0a2a6?trk=people-guest_people_search-card' target="_blank" className='me-4 text-reset'>
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a href='https://github.com/Ayush-l' target="_blank" className='me-4 text-reset'>
                            <MDBIcon fab icon="github" />
                        </a>
                    </div>
                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" />
                                    KURTI PLAZA
                                </h6>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                    New Delhi, 11001, INDIA
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    aayushlingwal24@gmail.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> +91 9456117757
                                </p>
                                <p>
                                    <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>

            <div className='text-center p-4 mt-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    KURTI.com
                </a>
            </div>
        </MDBFooter>
    );
}
export default Footer;