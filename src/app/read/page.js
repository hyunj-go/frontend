import Link from 'next/link';

export default async function BakeryPage() {
    const resp = await fetch(`${process.env.API_URL}/api/bakeries?populate=*`);
    const bakeries = await resp.json();

    return(
        <>
        <div className='inner'>
            <div className='menu-grid-block'>
                <div className="menu-grid">
                    <div className='container'>
                        {/* <List bakery={bakeries.data}></List> */}
                            {
                                bakeries.data.map((bakery, i)=>{
                                    return (
                                    <div key={bakery.id} className="six columns">
                                        <Link href={`/read/${bakery.id}`}>
                                            {/* <img src={bakery.attributes.image.data[0].attributes.formats.thumbnail.url} alt={bakery.attributes.name}/> */}
                                            
                                                {/* <div className="specialty-block" style={{ 'background-image':'url('bakery.attributes.image.data[0].attributes.formats.thumbnail.url +')'}}></div> */}
                                                <p>{bakery.attributes.name}</p>
                                        </Link>
                                    </div>
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

// function List(props){
//     let bakeryArr = props.bakery;
//     function seperArray(data = [], size = 1) {
//         const arr = [];
            
//         for (let i = 0; i < data.length; i += size) {
//             arr.push(data.slice(i, i + size));
//         }

//         return arr
//     }

//     bakeryArr = seperArray(bakeryArr, 2);

//     return (
//         <>
//             {
//                 bakeryArr.map((bakerySet, i)=>{
//                     return(
//                         <div key={i} className="row">
//                             {
//                                 bakeryArr[i].map((bakery, j)=>{
//                                     <div key={j} className="">

//                                     </div>
//                                 })
//                             }
//                         </div>
//                     )
//                 })
//             }
//         </>
//     )
// }
