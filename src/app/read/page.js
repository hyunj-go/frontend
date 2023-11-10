import List from '../component/List';

export default async function BakeryPage() {
    const resp = await fetch(`${process.env.API_URL}/api/bakeries?populate=*`);
    const bakeries = await resp.json();

    return(
        <>
        <div className='inner'>
            <List bakery={bakeries.data}></List>
        </div>
        </>
    )
}
