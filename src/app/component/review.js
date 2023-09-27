"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Review(props){
    const router = useRouter();
    const [modifiedData, setModifiedData] = useState({
        content: '',
        rating: '',
        bakery: props.param,
    });

    let [reviewEdit, setReviewEdit] = useState(false);
    
    const handleChange = function({ target: { name, value } }) {
        
        // console.log(name, value, typeof(value))
        setModifiedData(prev => ({
            ...prev,
            [name]: value,
        })
        );
        // console.log(modifiedData);
    };
    return (
        <>
        <h3>REVIEWS</h3>
        <ul>
            {
                props.review.data.map((review)=>{
                    return(
                    <li key={review.id}>
                        <p>content : {review.attributes.content}</p>
                        <p>rating : {review.attributes.rating}</p>
                        <div>
                            <a href='/update/id'>update</a>
                            <button>delete</button>
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
            <form onSubmit={(e)=>{
            e.preventDefault();
            const options = {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: modifiedData })
            }
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastId = modifiedData.bakery;
                setReviewEdit(false);
                // window.location.replace(`/read/${props.param}`)
                // router.push(`/read/${lastId}`);
                // router.refresh();
            })
        }}>
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