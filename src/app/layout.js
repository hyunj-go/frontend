import './globals.css';
import 'public/css/style.css';
// import SearchInput from './component/SearchInput';

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
                    <a className="mob-link" href="/">bakery <br/>in Seoul</a>
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
                  <p className="menus-ticker"><a data-scroll className="mob-link" href="#menus"><i className="fa fa-book"
                        aria-hidden="true"></i> Menus</a></p>
                  <p>&nbsp;&nbsp;<a data-scroll href="#contact"><i className="fa fa-clock-o" aria-hidden="true"></i> Hours of operation</a></p>
                </div>
                <div className="u-cf"></div>
              </div>
            </div>
            <div className="mobile-nav">
              <ul className="mobile-links">
                <li><a className="mob-link" href="#about">About</a></li>
                <li><a className="mob-link" href="#bakery">bakery</a></li>
                <li><a className="mob-link" href="#contact">Contact</a></li>
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
        </div>
      </body>
    </html>
  )
}
