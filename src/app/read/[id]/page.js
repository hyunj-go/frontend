import Review from "@/app/component/review.js";

export default async function Read(props){
    let param = props.params.id
    const resp = await fetch(`${process.env.API_URL}/api/bakeries/${props.params.id}?populate=*`);
    const bakery = await resp.json();
    const resp2 = await fetch(`${process.env.API_URL}/api/reviews?filters[bakery][id][$eq]=${props.params.id}`);
    const review = await resp2.json();

    return(
        <>
        <h2>{bakery.data.attributes.name}</h2>
        <p>{bakery.data.attributes.description}</p>
        <Review param={param} review={review}/>
        
        </>
    )
}