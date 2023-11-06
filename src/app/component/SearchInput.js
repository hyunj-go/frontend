"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SearchQuery from "./SearchQuery";

//input에 검색어를 적을때마다 page이동하면서 검색어와 page값이 query로 전해진다
const SearchInput = () => {
    const [val, setVal] = useState('');

    const handleSearchValue = (e) => { 
        setVal(e.target.value.trim());
    }

    //검색어 지우기
    const cleanSearch = () => {
        // setSearch('')
    }
    
    return (
        <>
            <div>
                <SearchQuery val={val}/>
                <input type='text' placeholder='검색어를 입력하세요' autoFocus autoComplete='off' value={val} onChange={handleSearchValue} />
                {val && <TiDelete onClick={cleanSearch} size={20}/>}
                <BsSearch size={20} />
            </div>
        </>
    )
}

export default SearchInput;