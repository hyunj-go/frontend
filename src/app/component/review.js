"use client"
import { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating'

// // Parses the JSON returned by a network request
// const parseJSON = resp => (resp.json ? resp.json() : resp);
// // Checks if a network request came back fine, and throws an error if not
// const checkStatus = resp => {
//     if (resp.status >= 200 && resp.status < 300) {
//     return resp;
//     }
//     return parseJSON(resp).then(resp => {
//     throw resp;
//     });
// };
const headers = {
    'Content-Type': 'application/json',
};

export default function Review(props){
    // const ref = useRef(null);
    const [reviews, setReviews] = useState([]);
    const [reviewCreate, setReviewCreate] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);

    //처음 가져온 해당 게시물의 댓글들을 state에 넣는다.
    useEffect(() => {
        setReviews(props.review.data);
    }, []);
    
    const [createdData, setCreatedData] = useState({
        content: '',
        rating: '',
        bakery: props.param,
    });
    const [modifiedData, setModifiedData] = useState({
        content: '',
        rating: '',
        bakery: props.param,
    });

    // const handleChange = function({ target: { name, value } }) { //event.target 안에 {event.target.name, event.target.value} 직접 구조분해할당
    const handleChange = (data) => {
        let name = ''
        let value = ''
        if(data.target){ //input값일 경우
            name = data.target.name
            value = data.target.value
        }else {//rating값일 경우
            name = 'rating'
            value = data
        }
        setCreatedData(prev => ({
                ...prev,
                [name]: value,
            })
        );
        console.log(createdData);
    };

    const reviewChange = (data) => {
        let name = ''
        let value = ''
        if(data.target){ //input값일 경우
            name = data.target.name
            value = data.target.value
        }else {//rating값일 경우
            name = 'rating'
            value = data
        }
        setModifiedData(prev => ({
                ...prev,
                [name]: value,
            })
        );
        console.log(modifiedData);
    };

    //댓글 작성
    const getPosts = async ()=> {

        try {
            const options = {
                method:'POST',
                headers,
                body: JSON.stringify({ data: createdData })
            }
            const reviewsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, options);
            const updatedReviews = await reviewsData.json();
            return updatedReviews;
        } catch{}
    }

    //댓글 삭제
    const delReview = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
            method:'DELETE',
            headers,
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
    const editReview = (id) => {
        setEditingReviewId(id);
        

        //클릭한 리뷰 내용 세팅
        // for(let i = 0; i<reviews.length; i++){
        //     if(reviews[i].id == id){
        //         const { content, rating } = reviews[i].attributes;
        //         const extractedProperties = { content, rating };

        //         setModifiedData(prev => ({
        //                 ...prev,
        //                 ...extractedProperties,
        //             })
        //         );
        //     }
        // }
        const thisReview = reviews.filter(data => data.id == id); console.log(thisReview);
        const { content, rating } = thisReview[0].attributes;
        const extractedProperties = { content, rating };
        setModifiedData(prev => ({
                ...prev,
                ...extractedProperties,
            })
        );
        console.log(modifiedData);
    }
    const updateReview = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
            method:'PUT',
            headers,
            body: JSON.stringify({ data: modifiedData })
        })
        .then((res) => res.json())
            .then((result) => {
                alert(`review ${id} modified successfully`);  
                const copyReviews = JSON.parse(JSON.stringify(reviews));
                // copyReviews = props.review.data;
                let thisCopyReviews = copyReviews.filter(data => data.id == id);
                const { content, rating } = result.data.attributes;
                thisCopyReviews[0].attributes.content = content;
                thisCopyReviews[0].attributes.rating = rating;
                console.log(copyReviews);console.log(thisCopyReviews);
                setReviews(copyReviews);console.log(reviews)
                setEditingReviewId(null);
                console.log(editingReviewId);
        })
        .catch((error) => {
            console.error('Error modified review:', error);
        });
    }
    const cancelUpdateReview = () => {
        setEditingReviewId(null);
        // setModifiedData({
        //     content: '',
        //     rating: '',
        //     bakery: props.param,
        // })
        console.log(modifiedData);
        console.log(reviews);
    }

    return (
        <>
        <h3>REVIEWS <span>({reviews.length})</span></h3> 
        <ul>
            {
                reviews.map((review)=>{
                    return(
                    <li key={review.id}>
                        <Rating initialValue={editingReviewId === review.id ? modifiedData.rating : review.attributes.rating} onClick={reviewChange} allowFraction="true" size="24" readonly={editingReviewId === review.id ? false : true}/>
                        <div>{(review.attributes.createdAt).split('T')[0]}</div>
                        <div><input type="text" name="content" value={editingReviewId === review.id ? modifiedData.content : review.attributes.content} onChange={reviewChange}  readOnly={editingReviewId === review.id ? false : true}/></div>
                        <div>
                            {
                                editingReviewId === review.id ? (
                                    <>
                                        <button onClick={() => updateReview(review.id)}>Update</button>
                                        <button onClick={() => cancelUpdateReview()}>Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => editReview(review.id)}>Edit</button>
                                )
                            }
                            <button onClick={()=>{ delReview(review.id) }}>delete</button>
                        </div>
                    </li>
                    )
                })
            }
        </ul>
        
        
        {
            reviewCreate?
            <form onSubmit={getPosts}>
                <Rating
                    onClick={handleChange}
                    allowFraction="true"
                />
                <div><textarea name="content" defaultValue={createdData.content} placeholder="content" onChange={handleChange}></textarea></div>
                {/* <p>
                    <input type="number" name="rating" class="raring" defaultValue={createdData.rating} placeholder="rating" onChange={handleChange}/>
                </p> */}
                <p>
                    <input type="submit" value="create"/>
                    <button onClick={() => {setReviewCreate(false);}}>Cancel</button>
                </p>
            </form> : <button onClick={()=>{ setReviewCreate(true); }}>리뷰작성</button>
        }
        </>
    )
}