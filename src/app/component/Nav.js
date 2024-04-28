'use client'
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function Nav() {
    const { data: session } = useSession();

    return(
        <nav>
            <div className="ticker">
                <div className="container">
                <div className="u-pull-left ticker-text">
                    <div className="logo">
                    <a className="mob-link" href="/">BAKERY</a>
                    </div>
                    {/* <p className="number-ticker"><a href="tel:7054707624"><i className="fa fa-phone" aria-hidden="true"></i>
                        735-670</a></p>
                    <p className="desktop-address"><a href="https://goo.gl/maps/iFvNnzzMnow" target="_blank"><i
                        className="fa fa-map-marker" aria-hidden="true"></i> 
                        Long Lake Road 128</a></p>
                    <p className="mobile-address"><a href="https://goo.gl/maps/iFvNnzzMnow" target="_blank"><i
                        className="fa fa-map-marker" aria-hidden="true"></i> Get Directions</a></p> */}
                </div>
                <div className="u-pull-right ticker-text">
                    {
                    session? 
                        <>
                        <p>&nbsp;&nbsp;{session.user.username}님</p>
                        <p>&nbsp;&nbsp;<a href="#" onClick={() => signOut()}> logout</a></p>
                        </>
                    :
                        <>
                        <p>&nbsp;&nbsp;<Link href="/member/login"> login</Link></p>
                        <p>&nbsp;&nbsp;<Link href="/member/join"> join</Link></p>
                        </>
                    }
                    <p className="menus-ticker">
                    <Link href="/story">
                        {/* <FontAwesomeIcon icon={ faBreadSlice } color={ 'white' } size={ 10 } />  */}
                        story
                    </Link>
                    </p>
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
    )
}
