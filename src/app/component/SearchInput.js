"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
// import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//input에 검색어를 적을때마다 page이동하면서 검색어와 page값이 query로 전해진다
const SearchInput = ({ name }) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    // const [search, setSearch] = useState('')
    // let [currentPathName, setCurrentPathName] = useState('/');

    const handleSearchValue = (e) => { 
        // now you got a read/write object
        const current = new URLSearchParams(Array.from(searchParams.entries())); 
        // update as necessary
        // setSearch(e.target.value)
        const value = e.target.value.trim();

        if (!value) {
            current.delete("name");
        } else {
            current.set("name", e.target.value);
        }

        // cast to string
        const search = current.toString();
        const query = search ? `?${search}` : "";

        
        // router.push(`${pathname}${query}`);
        router.push(`/search${query}`);

    }
    //검색어 지우기
    const cleanSearch = () => {
        // setSearch('')
    }

    

    return (
        <>
            <div>
                <input type='text' placeholder='검색어를 입력하세요' autoFocus autoComplete='off' value={name} onChange={handleSearchValue} />
                {name && <TiDelete onClick={cleanSearch} size={20}/>}
                <BsSearch size={20} />
            </div>
        </>
    )
}

export default SearchInput;