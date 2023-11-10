'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import List from '../component/List';

const Search = () => {
    let [bakery, setBakery] = useState([]); 
    const params = useSearchParams();
    const name = params.get('name');

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/bakeries?populate=*&filters[name][$containsi]=${name}`)
            .then((res) => res.json())
            .then((result) => {
                // let copyBakery = [...bakery]; 
                // copyBakery = result;
                // setBakery(copyBakery);
                let copyBakery = JSON.parse(JSON.stringify(bakery));
                copyBakery = result;
                setBakery(copyBakery);
        })
    }, [name])

    return(
        <>
            <div className='inner'>
                <p>&quot;{name}&quot; 검색결과 {bakery.data.length}개</p>
            {/* <ol>
                {   
                    bakery.length ?
                    bakery.map((bakery)=>{
                        return <li key={bakery.id}><Link href={`/read/${bakery.id}`}>{bakery.attributes.name}</Link></li>
                    }) : null
                }
            </ol> */}
            <List bakery={bakery.data}></List>
        </div>
        </>
    )
}

export default Search