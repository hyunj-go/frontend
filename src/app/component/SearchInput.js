"use client"
import { BsSearch } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import {useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//input에 검색어를 적을때마다 page이동하면서 검색어와 page값이 query로 전해진다
const SearchInput = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [val, setVal] = useState('');

    const handleSearchValue = (e) => { 
        
        setVal(e.target.value.trim());

        

        

    }

    useEffect(()=>{
        const current = new URLSearchParams(Array.from(searchParams.entries())); 

        if (!val) {
            current.delete("name");
        } else {
            current.set("name", val);

            // cast to string
            const search = current.toString();
            const query = `?${search}`;

            // router.push(`${pathName}${query}`);
            if(pathName == '/search'){
                router.replace(`${pathName}${query}`); 
            }else {
                router.replace(`/search${query}`);
            }
        }

        
    }, [val])

    
    //검색어 지우기
    const cleanSearch = () => {
        // setSearch('')
    }



    
    

    return (
        <>
            <div>
                <input type='text' placeholder='검색어를 입력하세요' autoFocus autoComplete='off' onChange={handleSearchValue} />
                {val && <TiDelete onClick={cleanSearch} size={20}/>}
                <BsSearch size={20} />
            </div>
        </>
    )
}

export default SearchInput;