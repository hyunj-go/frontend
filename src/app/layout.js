import './globals.css';
import 'public/css/style.css';
import 'public/css/content.css';
import Link from 'next/link';
// import SearchInput from './component/SearchInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { BsSearch } from "react-icons/bs"
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
// import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
// library.add(farFaStar, fasFaStar)

export const metadata = {
  title: 'WEB',
  description: 'Generated by hyunj',
}

export default function RootLayout({ children }) {
    
  return (
    <html>
      <body>
        <div className="site-container">
          
          <nav>
            <div className="ticker">
              <div className="container">
                <div className="u-pull-left ticker-text">
                  <div className="logo">
                    <a className="mob-link" href="/">BAKERY</a>
                  </div>
                  {/* <SearchInput></SearchInput> */}
                  {/* <p className="number-ticker"><a href="tel:7054707624"><i className="fa fa-phone" aria-hidden="true"></i>
                      735-670</a></p>
                  <p className="desktop-address"><a href="https://goo.gl/maps/iFvNnzzMnow" target="_blank"><i
                        className="fa fa-map-marker" aria-hidden="true"></i> 
                      Long Lake Road 128</a></p>
                  <p className="mobile-address"><a href="https://goo.gl/maps/iFvNnzzMnow" target="_blank"><i
                        className="fa fa-map-marker" aria-hidden="true"></i> Get Directions</a></p> */}
                </div>
                <div className="u-pull-right ticker-text">
                  <p className="menus-ticker">
                    <Link href="/story">
                      {/* <FontAwesomeIcon icon={ faBreadSlice } color={ 'white' } size={ 10 } />  */}
                      story
                    </Link>
                  </p>
                  <p>&nbsp;&nbsp;<Link href="/member/login"> login</Link></p>
                  <p>&nbsp;&nbsp;<Link href="/member/join"> join</Link></p>
                  {/* <Link href="/read" className="btn-search"><BsSearch size={20}/></Link> */}
                </div>
                <div className="u-cf"></div>
              </div>
            </div>
            <div className="mobile-nav">
              <ul className="mobile-links">
                <li><a className="mob-link" href="/story">story</a></li>
                <li><a className="mob-link" href="/bakery">bakery</a></li>
                <li><a className="mob-link" href="/contact">Contact</a></li>
              </ul>
              {/* <ul>
                <li>
                  <div className="logo">
                    <a className="mob-link" href="/">bakery <br/>in Seoul</a>
                  </div>
                </li>
              </ul> */}
              <div className="container">
                <button className="hamburger hamburger--squeeze u-pull-right" type="button"> <span className="hamburger-box">
                    <span className="hamburger-inner"></span> </span>
                </button>
              </div>
              <div className="u-cf"></div>
            </div>
          </nav>

          {/* <ol>
            {bakeries.data.map((bakery)=>{
              return <li key={bakery.id}><Link href={`/read/${bakery.id}`}>{bakery.attributes.name}</Link></li>
            })}
          </ol> */}
          {children}

          <div className="contact" id="contact">
            <div className="container">
              <div className="row">
                <div className="three columns">
                  <h6>Contact</h6>
                  <ul>
                    <li><a href="tel:7054707624">705–470–PNCH</a></li>
                    <li><a href="mailto:">aaa@gmail.com</a></li>
                  </ul>
                </div>
                <div className="three columns">
                  <h6>Address</h6>
                  <p className="footer-address">2037 Long Lake Rd, Block B, Unit 8B
                    <br />Sudbury, ON P3E 6J9</p>
                  <a href="https://goo.gl/maps/iFvNnzzMnow" target="_blank"><i className="fa fa-map-marker"
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
                    <li><a href="http://www.facebook.com/pinchmans" target="_blank"><i className="fab fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>
                    <li><a href="http://www.instagram.com/pinchmans" target="_blank"><i className="fab fa-instagram" aria-hidden="true"></i> Instagram</a></li>
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
        </div>
      </body>
    </html>
  )
}
