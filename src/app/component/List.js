import Link from 'next/link';

export default function List(props) {
    let bakeryArr = props.bakery;
    function seperArray(data = [], size = 1) {
        const arr = [];
            
        for (let i = 0; i < data.length; i += size) {
            arr.push(data.slice(i, i + size));
        }

        return arr
    }

    bakeryArr = seperArray(bakeryArr, 2);

    return (
        <>
        <div className='menu-grid-block'>
            <div className="menu-grid">
                <div className='container'>
                {
                    bakeryArr.map((bakerySet, i)=>{
                        return(
                            <div key={i} className="row">
                                {
                                    bakerySet.map((bakeryItem, j)=>{
                                        return (
                                            <div key={j} className="six columns">
                                                <Link href={`/read/${bakeryItem.id}`}>
                                                    <div className="specialty-block" style={{ 'backgroundImage':`url(${bakeryItem.attributes.image.data[0].attributes.url})`}}></div>
                                                    <p>{bakeryItem.attributes.name}</p>
                                                </Link>
                                            </div> 

                                        )
                                        
                                    })
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
        </>
    )
}
