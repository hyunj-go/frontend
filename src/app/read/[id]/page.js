import Link from "next/link";

export default async function Read(props){
    const resp = await fetch(`${process.env.API_URL}/api/bakeries/${props.params.id}?populate=*`);
    const bakery = await resp.json();
    const resp2 = await fetch(`${process.env.API_URL}/api/reviews?filters[bakery][id][$eq]=${props.params.id}`);
    const review = await resp2.json();
    return(
        <>
        <h2>{bakery.data.attributes.name}</h2>
        <p>{bakery.data.attributes.description}</p>
        <h3>REVIEWS</h3>
        <ul>
            {
                review.data.map((review)=>{
                    return(
                    <li>
                        <p>content : {review.attributes.content}</p>
                        <p>rating : {review.attributes.rating}</p>
                    </li>
                    )
                })
            }
        </ul>
        <ul>
            <li><Link href={`/create/${props.params.id}`}>create</Link></li>
            <li><a href='/update/id'>update</a></li>
            <li><button>delete</button></li>
        </ul>
        </>
    )
}