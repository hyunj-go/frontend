"use client"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
library.add(farFaStar, fasFaStar)

import { Rating } from 'react-simple-star-rating'

export default function Review(props){
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0)

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
    

    // const handleChange = function({ target: { name, value } }) { //event.target 안에 {event.target.name, event.target.value} 직접 구조분해할당
    const handleChange = function(e) {
        const {name, value} = e.target;

        setModifiedData(prev => ({
                ...prev,
                [name]: value,
            })
        );
    };

    //별점
    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        setModifiedData(prev => ({
                ...prev,
                rating: rate,
            })
        );
        console.log(modifiedData);
    }

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

    //댓글 수정
    const updateReview = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
            method:'PUT',
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
                        <Rating initialValue={review.attributes.rating} allowFraction="true" size="20" readonly="true" />
                        <p>content : <input type="text" value={review.attributes.content} readOnly/></p>
                        <div>
                            <button onClick={()=>{ updateReview(review.id) }}>update</button>
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
                <Rating
                    onClick={handleRating}
                    allowFraction="true"
                />
                <p>
                    <textarea name="content" defaultValue={modifiedData.content} placeholder="content" onChange={handleChange}></textarea>
                </p>
                {/* <FontAwesomeIcon icon={ farFaStar } /> */}
                <p>
                    {/* <input type="number" name="rating" class="raring" defaultValue={modifiedData.rating} placeholder="rating" onChange={handleChange}/> */}
                </p>
                <p>
                    <input type="submit" value="create"/>
                </p>
            </form> : null
        }
        </>
    )
}