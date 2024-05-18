"use client"
import { useState, useEffect, useRef } from "react";
import { Rating } from 'react-simple-star-rating';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Review({param}){//const { param } = props;
    const reviewInput = useRef(null);
    const [reviews, setReviews] = useState([]);
    const [reviewCreate, setReviewCreate] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();

    const fetchReviews = async (bakeryId) => {
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews?filters[bakery][id][$eq]=${bakeryId}`);
            const jsonResponse  = await resp.json();
            const review = jsonResponse.data;
            return review
        }catch(error){
            console.log(error.stack);
            return []
        }
    }
    const loadReviews = async () => {
        const fetchedReviews = await fetchReviews(param);
        setReviews(fetchedReviews);
    };

    //처음 가져온 해당 게시물의 댓글들을 state에 넣는다.
    useEffect(() => {
        loadReviews();
    }, []);

    // 리뷰작성 클릭시 포커스
    useEffect(() => {
        if (reviewCreate && reviewInput.current) {
            reviewInput.current.focus();
        }
    }, [reviewCreate]);
    
    const [createdData, setCreatedData] = useState({
        username:'',
        email:'',
        content: '',
        rating: 0,
        bakery: param,
    });
    
    //세션 불러오면 유저정보 저장
    useEffect(() => {
        if (session) {
            setCreatedData(prev => ({
                ...prev,
                username: session.user.username,
                email: session.user.email,
            }));
        }
    }, [session]);
    
    const [modifiedData, setModifiedData] = useState({
        username:'',
        email:'',
        content: '',
        rating: 0,
        bakery: param,
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
        if(createdData.content!==''&&createdData.rating!==0){
            try {
                const reviewsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.jwt}`
                    },
                    body: JSON.stringify({ data: createdData })
                });

                if (!reviewsData.ok) {  // 서버 응답이 ok가 아닌 경우
                    throw new Error(`Server error: ${reviewsData.statusText}`);
                }

                setReviewCreate(false);
                setCreatedData( prev => ({...prev, content: '', rating: 0}) ); 

                alert('리뷰가 등록 되었습니다.');
                loadReviews();
                // const updatedReviews = await reviewsData.json();
                // return updatedReviews;
            } catch(error){
                console.log(error.stack);
                return{}
            }
        }else{
            alert('리뷰와 별점을 작성해주세요.')
        }
    }

    //댓글 삭제
    const delReview = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.jwt}`
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
    const editReview = (id) => {
        setEditingReviewId(id);
        
        //클릭한 리뷰 내용 세팅
        const thisReview = reviews.filter(data => data.id == id); console.log(thisReview);
        const { content, rating, username, email } = thisReview[0].attributes;
        const extractedProperties = { content, rating, username, email };
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.jwt}`
            },
            body: JSON.stringify({ data: modifiedData })
        })
        .then((res) => res.json())
            .then((result) => {
                alert(`review ${id} modified successfully`);  
                const copyReviews = JSON.parse(JSON.stringify(reviews));
                let thisCopyReviews = copyReviews.filter(data => data.id == id);
                const { content, rating } = result.data.attributes;
                thisCopyReviews[0].attributes.content = content;
                thisCopyReviews[0].attributes.rating = rating;
                console.log(copyReviews);console.log(thisCopyReviews);
                setReviews(copyReviews);console.log(reviews)
                // loadReviews(); 로 하면 느림
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
        //     bakery: param,
        // })
        console.log(modifiedData);
        console.log(reviews);
    }

    return (
        <div className="review-area">
            <h3>REVIEWS <span>({reviews.length})</span></h3> 
            {
                reviewCreate?
                <form onSubmit={(e)=> { e.preventDefault(); getPosts();}} className="review-input">
                    <Rating
                        onClick={handleChange}
                        allowFraction="true"
                    />
                    <div><textarea name="content" defaultValue={createdData.content} placeholder="content" onChange={handleChange} ref={reviewInput}></textarea></div>
                    {/* <p>
                        <input type="number" name="rating" className="raring" defaultValue={createdData.rating} placeholder="rating" onChange={handleChange}/>
                    </p> */}
                    <div className="btn-wrap">
                        <input type="submit" value="create"/>
                        <button onClick={() => {setReviewCreate(false);}}>Cancel</button>
                    </div>
                </form> 
                : 
                <button className="w-full" onClick={()=>{ 
                    if(session){
                        setReviewCreate(true);
                        setCreatedData( prev => ({...prev, content: '', rating: 0}) ); 
                    }else{
                        if(window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                            //로그인 페이지로 이동
                            router.push('/member/login')
                        }
                    }
                }}>리뷰작성</button>
            }
            <ul className="review-output">
                {
                    reviews.map((review)=>{
                        return(
                        <li key={review.id}>
                            <Rating initialValue={editingReviewId === review.id ? modifiedData.rating : review.attributes.rating} onClick={reviewChange} allowFraction="true" size="24" readonly={editingReviewId === review.id ? false : true}/>
                           <div>{review.attributes.username}</div>
                           <div>{(review.attributes.createdAt).split('T')[0]}</div>
                            
                            <div><input type="text" name="content" value={editingReviewId === review.id ? modifiedData.content : review.attributes.content} onChange={reviewChange} readOnly={editingReviewId === review.id ? false : true}/></div>
                            {
                                session && session.user.email==review.attributes.email ?
                                <div className="btn-wrap">
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
                                </div>:''
                            }
                        </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}
