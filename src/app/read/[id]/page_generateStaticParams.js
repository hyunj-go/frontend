import Review from "@/app/component/review.js";

const fetchBakeries = async (params) => {
    try {
        const resp = await fetch(`${process.env.API_URL}/api/bakeries/${params.id}?populate=*`, {
            cache: "no-store",
        });
        const bakery = await resp.json();
        return bakery
    }catch(error){
        console.log(error.stack);
        return {}
    }
}

const fetchReviews = async (params) => {
    try {
        const resp = await fetch(`${process.env.API_URL}/api/reviews?filters[bakery][id][$eq]=${params.id}`, {
            cache: "no-store",
        });
        const review = await resp.json();
        return review
    }catch(error){
        console.log(error.stack);
        return {}
    }
}

async function generateStaticParams() {
    const bakery = await fetchBakeries(params);
    const review = await fetchReviews(params);

    return bakery.data.map((item) => ({
        id: item.id,
    }));
}  

const Read = async({ params }) => {
    

    return(
        <>
        <div>{JSON.stringify(params)}</div>;
        {/* <h2>{bakery.data.attributes.name}</h2>
        <p>{bakery.data.attributes.description}</p>
        <Review param={bakery.data.id} review={review}/> */}
        </>
    )
}

export default Read;
