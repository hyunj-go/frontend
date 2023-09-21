"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create(props){
    const router = useRouter();
    const [modifiedData, setModifiedData] = useState({
        content: '',
        rating: '',
        bakery: props.params.id,
    });
    // let [lastId, setLastId] = useState(1);
    // useEffect(()=>{
    //     setLastId(modifiedData.bakery); console.log('change'+modifiedData.bakery )
    // }, [modifiedData.bakery])
    
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
        <p>{props.params.id}</p>
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
                router.push(`/read/${lastId}`);
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
        </form>
        </>
    )
}