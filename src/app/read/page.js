import List from '../component/List';
import SearchInput from '../component/SearchInput';

export default async function BakeryPage({searchParams}) {

    const resp = await fetch(`${process.env.API_URL}/api/bakeries?populate=*${searchParams && searchParams.name ? `&filters[name][$containsi]=${searchParams.name}` : ''}`);
    const bakeries = await resp.json();

    return(
        <div className='wrapper'>
            <div className='inner'>
                <div className='memu'>
                    <h2>Our Bakeries</h2>
                    <SearchInput></SearchInput>
                    <List bakery={bakeries.data}></List>
                </div>  
            </div>
        </div>
    )
}
