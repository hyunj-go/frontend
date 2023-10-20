import Link from 'next/link';

export default async function BakeryPage() {
    const resp = await fetch(`${process.env.API_URL}/api/bakeries`);
    const bakeries = await resp.json();
    
    return(
        <>
        <div className='inner'>
            <ol>
                {
                    bakeries.data.map((bakery)=>{
                        return <li key={bakery.id}><Link href={`/read/${bakery.id}`}>{bakery.attributes.name}</Link></li>
                    })
                }
            </ol>
        </div>
        </>
    )
}