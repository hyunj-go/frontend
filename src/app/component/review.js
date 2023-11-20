"use client"
import { useState, useEffect } from "react";

export default function Review(props){
    const [reviews, setReviews] = useState([]);

    //처음 가져온 해당 게시물의 댓글들을 state에 넣는다.
    useEffect(() => {
        setReviews(props.review.data);
    }, []);
    
    const [modifiedData, setModifiedData] = useState({
        content: '',
        rating: '',
        bakery: props.param,
    });

    let [reviewEdit, setReviewEdit] = useState(false);
    
    // const handleChange = function(event) {
    //     const {name, value} = event.target;
    const handleChange = function({ target: { name, value } }) { //event.target 안에 {event.target.name, event.target.value} 직접 구조분해할당

        setModifiedData(prev => ({
                ...prev,
                [name]: value,
            })
        );
    };

    //댓글 작성
    const getPosts = async ()=> {
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: modifiedData })
        }
        const reviewsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, options);
        const updatedReviews = await reviewsData.json();

        return updatedReviews;
    }

    //댓글 삭제
    const delReview = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: null
        })
        .then((res) => res.json())
            .then((result) => {
                alert(`review ${id} ${result.data.attributes.content} deleted successfully`);
                let copyReviews = JSON.parse(JSON.stringify(reviews));
                copyReviews = reviews.filter(data => data.id !== id);
                setReviews(copyReviews);
        });
    }
    
    return (
        <>
        <h3>REVIEWS</h3>
        <ul>
            {
                reviews.map((review)=>{
                    return(
                    <li key={review.id}>
                        <p>content : {review.attributes.content}</p>
                        <p>rating : {review.attributes.rating}</p>
                        <div>
                            <a href='/update/id'>update</a>
                            <button onClick={()=>{ delReview(review.id) }}>delete</button>
                        </div>
                    </li>
                    )
                })
            }
        </ul>
        
        <button onClick={()=>{ setReviewEdit(true); }}>리뷰작성</button>
        <p>{props.param}</p>
        {
            reviewEdit?
            <form onSubmit={getPosts}>
                <p>
                    <textarea name="content" defaultValue={modifiedData.content} placeholder="content" onChange={handleChange}></textarea>
                </p>
                <p>
                    <input type="text" name="rating" defaultValue={modifiedData.rating} placeholder="rating" onChange={handleChange}/>
                </p>
                <p>
                    <input type="submit" value="create"/>
                </p>
            </form> : null
        }
        </>
    )
}