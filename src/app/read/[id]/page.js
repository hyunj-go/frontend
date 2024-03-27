import Review from "@/app/component/review.js";

const fetchBakeries = async (params) => {
    try {
        const resp = await fetch(`${process.env.API_URL}/api/bakeries/${params}?populate=*`, {
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
        const resp = await fetch(`${process.env.API_URL}/api/reviews?filters[bakery][id][$eq]=${params}`, {
            cache: "no-store",
        });
        const review = await resp.json();
        return review
    }catch(error){
        console.log(error.stack);
        return {}
    }
}

const BakeryIdPage = async(props) => {
    const bakery = await fetchBakeries(props.params.id);
    const review = await fetchReviews(props.params.id);

    return(
        <div className="wrapper">  
            <h2>{bakery.data.attributes.name}</h2>
            <p>{bakery.data.attributes.description}</p>
            {bakery.data.attributes.image.data.map((bakeryImg)=>{
            return <li key={bakeryImg.id}><img src={bakeryImg.attributes.url} alt={bakery.data.attributes.name}/></li>
            })}
            <Review param={bakery.data.id} review={review}/>
        </div>
    )
}

export default BakeryIdPage;
