'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import SearchInput from '../component/SearchInput';

const Search = () => {
    let [bakery, setBakery] = useState([]); 
    const params = useSearchParams();
    const name = params.get('name');

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/bakeries?filters[name][$containsi]=${name}`)
            .then((res) => res.json())
            .then((result) => {
                let copyBakery = [...bakery]; 
                copyBakery = result.data;
                setBakery(copyBakery);
        })
    }, [name])

    return(
        <>
            <div className='inner'>
                <SearchInput></SearchInput>
                <p>&quot;{name}&quot; 검색결과 {bakery.length}개</p>
            <ol>
                {   
                    bakery.length ?
                    bakery.map((bakery)=>{
                        return <li key={bakery.id}><Link href={`/read/${bakery.id}`}>{bakery.attributes.name}</Link></li>
                    }) : null
                }
            </ol>
        </div>
        </>
    )
}

export default Search