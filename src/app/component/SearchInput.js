"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//input에 검색어를 적을때마다 page이동하면서 검색어와 page값이 query로 전해진다
const SearchInput = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("")
    const searchParams = useSearchParams(); 
    let query = searchParams.get('name');

    useEffect(() => {
        

        
        // setSearchParams({ name: query })
    }, []);

    const handleSearch = (e) => {
        // setSearchQuery(e.target.value);
        setSearchQuery(e.target.value);
        router.push(`/search?name=${searchQuery}`);
    };

    
    //검색어 지우기
    const cleanSearch = () => {
        // setSearch('')
    }

    return (
        <div>
            <input
            type="text"
            placeholder="Search for something..."
            onChange={handleSearch}
            />
        </div>
    );
}

export default SearchInput;