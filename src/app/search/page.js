'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import List from '../component/List';

const Search = () => {
    let [bakery, setBakery] = useState({}); 
    const params = useSearchParams();
    const name = params.get('name');
    
    useEffect(() => {
        fetch(`${process.env.API_URL}/api/bakeries?populate=*&filters[name][$containsi]=${name}`)
            .then((res) => res.json())
            .then((result) => {
                let copyBakery = JSON.parse(JSON.stringify(bakery));
                copyBakery = result;
                setBakery(copyBakery);
        })
    }, [name])

    return(
        <>
            <div className='inner'>
                <p>&quot;{name}&quot; 검색결과 {bakery.data ? bakery.data.length : 0}개</p>

                {
                    bakery.data ? (bakery.data.length ? <List bakery={bakery.data}></List> : <p>검색 결과가 없습니다.</p>) : null
                }
            </div>
        </>
    )
}

export default Search