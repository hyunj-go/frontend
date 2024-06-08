import Link from 'next/link';
import Image from 'next/image';
import mainImg from '/public/images/main_visual_1920.jpg'
import List from './component/List';

const fetchBakeries = async () => {
  try {
      const resp = await fetch(`${process.env.API_URL}/api/bakeries?populate=*&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=4`, {
          cache: "no-store",
      });
      const bakeries = await resp.json(); 
      return bakeries
  }catch(error){
      console.log(error.stack);
      return {}
  }
}

const Home = async() => {
  const bakeries = await fetchBakeries(); 

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
      </div>
    </div>
    <div className="main-list">
      <List bakery={bakeries.data}></List>
      <div className="main-list-btn">
        <Link href="/read">View More Bakeries</Link>
      </div>
    </div>
  </>
  )
}

export default Home;
