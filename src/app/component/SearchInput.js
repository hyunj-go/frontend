"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//input에 검색어를 적을때마다 검색어와 page값이 query로 전해진다
const SearchInput = () => {
    const { replace } = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams) //객체 변환

    const handleSearchValue = (name) => {

        if(name) {
            params.set('name', name);
        }else {
            params.delete('name');
        }

        replace(`${pathName}?${params.toString()}`);
    }

    //검색어 지우기
    const cleanSearch = () => {
        params.delete('name');
        replace(`${pathName}?${params.toString()}`);
    }
    

    return (
        <>
            <div className="input-search">
                <input type='text' placeholder='Search bakeries' autoFocus autoComplete='off' value={params.get('name')||''} onChange={(e)=> handleSearchValue(e.target.value)} />
                {searchParams.get("name") && <TiDelete onClick={cleanSearch} size={20} className="btn-delSch"/>}
                <BsSearch size={20} className="btn-sch" />
            </div>
        </>
    )
}

export default SearchInput