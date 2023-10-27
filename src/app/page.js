import Link from 'next/link';
import Image from 'next/image';
import mainImg from '/public/images/main_visual_1920.jpg'

export default function Home() {
  return (
  <>
    <div className="header">
      <div className="bg-container">
        <Image src={mainImg} alt='main visual'/>
      </div>
      <div className="container">
      <div className="row header-content">
          <div className="five columns">
            <svg className="line-1 rellax animated draw-line anim-three" data-rellax-speed="4">
              <path d="M-10.5,305 L661.001842,305" transform="translate(0.000000, -304.000000)"></path>
            </svg>
            <h1 className="animated fadeInLeft rellax anim-three" data-rellax-speed="2">Handmade,<br />with an extra pinch
              of love
              
            </h1>
          </div>
          <div className="seven columns">
            <svg className="line-2 rellax animated draw-line anim-three" data-rellax-speed="3">
              <path d="M421,823 L421,475" transform="translate(-420.000000, -474.000000)"></path>
            </svg>
            <div className="content animated fadeIn anim-five rellax" data-rellax-speed="0.25">
              <p>A pinch is the difference between bland and blissful.</p>
            </div>
          </div>
        </div>
        
        <h2>
          <Link href="/read">more Bakery</Link>
        </h2>

      </div>
    </div>
  </>
  )
}
