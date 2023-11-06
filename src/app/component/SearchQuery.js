"use client"
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SearchQuery = (props) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    let val = props.val;

    useEffect(()=>{
        const current = new URLSearchParams(Array.from(searchParams.entries())); 

        if (!val) {
            current.delete("name");
        } else {
            current.set("name", val);
        }

        // cast to string
        const search = current.toString();
        const query = `?${search}`;

        // router.push(`${pathName}${query}`);
        if(pathName == '/search'){
            router.push(`${pathName}${query}`,  { shallow: true } ); 
        }else {
            router.push(`/search${query}`,  { shallow: true } );
        }

        
    }, [val])

    
    

    return (
        <>
        </>
    )
}

export default SearchQuery;