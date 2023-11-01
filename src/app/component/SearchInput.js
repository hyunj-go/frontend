"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//input에 검색어를 적을때마다 page이동하면서 검색어와 page값이 query로 전해진다
const SearchInput = () => {
    const router = useRouter()
    const pathName = usePathname()
    const [search, setSearch] = useState('')
    let [currentPathName, setCurrentPathName] = useState('/');
    
    //검색값이 변할때마다 새롭게 요청
    useEffect(() => {
        try {
            if(search) {
                const url = `/search?name=${search}`
                router.replace(url)
            }else{
                router.replace(currentPathName)
            }
        }
        catch (e) {
            console.error(e.response)
        }
    }, [search])

    //search 값이 바뀔때 재호출 (useCallback 쓰면 불러올때마다 함수 생성하지 않고 기존 함수 사용)
    const handleSearchValue = ((e) => { 
        setSearch(e.target.value)

        //이전페이지 저장
        if(pathName !== '/search'){
            setCurrentPathName(pathName);
        }
    })

    //검색어 지우기
    const cleanSearch = () => {
        setSearch('')
    }

    

    return (
        <>
            <div>
                <input type='text' placeholder='검색어를 입력하세요' autoFocus autoComplete='off' value={search} onChange={handleSearchValue} />
                {search && <TiDelete onClick={cleanSearch} size={20}/>}
                <BsSearch size={20} />
            </div>
        </>
    )
}

export default SearchInput