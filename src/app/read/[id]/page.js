import Review from "@/app/component/review.js";

const fetchBakeries = async (params) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bakeries/${params.id}?populate=*`);
    const bakery = await resp.json();

    return bakery
}

const fetchReviews = async (params) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews?filters[bakery][id][$eq]=${params.id}`);
    const review = await resp.json();

    return review
    
}

const Read = async({ params }) => {
    const bakery = await fetchBakeries(params);
    const review = await fetchReviews(params);

    return(
        <>
        <h2>{bakery.data.attributes.name}</h2>
        <p>{bakery.data.attributes.description}</p>
        <Review param={bakery.data.id} review={review}/>
        </>
    )
}

export default Read;