export default function Footer() {

    return(
        <>
        <div className="contact" id="contact">
            <div className="container">
              <div className="row">
                <div className="three columns">
                  <h6>Contact</h6>
                  <ul>
                    <li><a href="tel:12345678">1234-5678</a></li>
                    <li><a href="mailto:">aaa@gmail.com</a></li>
                  </ul>
                </div>
                <div className="three columns">
                  <h6>Address</h6>
                  <p className="footer-address">address
                    <br /></p>
                  <a href="https://goo.gl/maps/" target="_blank"><i className="fa fa-map-marker" aria-hidden="true"></i> Get Directions</a>
                  <a href="https://goo.gl/maps" target="_blank"><i className="fa fa-map-marker"
                      aria-hidden="true"></i> Get Directions</a>
                </div>
                <div className="three columns">
                  <h6>Hours of Operation</h6>
                    <p>
                      <strong>Tues–Fri:</strong> 8:30 a.m. – 4 p.m.<br />
                      <strong>Sat:</strong> 9 a.m. – 3 p.m.<br />
                      <strong>Sun-Mon:</strong> CLOSED<br />
                    </p>
                </div>
                <div className="three columns">
                  <h6>Follow</h6>
                  <ul>
                    <li><a href="http://www.facebook.com" target="_blank"><i className="fab fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>
                    <li><a href="http://www.instagram.com" target="_blank"><i className="fab fa-instagram" aria-hidden="true"></i> Instagram</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <footer>
            <div className="container">
              {/* <a data-scroll href="#"><img src="images/logo.svg" alt="logo" /></a> */}
              <p>Copyright ©2024 Bakery in Seoul</p>
            </div>
          </footer>
        </>
    )
}