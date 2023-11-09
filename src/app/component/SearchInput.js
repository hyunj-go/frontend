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
    const pathName = usePathname(); 
    let query = searchParams.get('name');
    let chk = false;


    const handleSearch = useCallback((e) => { 
        setSearchQuery(e.target.value);

        if(pathName !== '/search' && !chk){ console.log('search가 아님');
            chk = true;
            router.replace(`/search?name=${searchQuery}`);
        }else {
            router.push(`?name=${searchQuery}`);     
        }
        

    }, [searchQuery])

    
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