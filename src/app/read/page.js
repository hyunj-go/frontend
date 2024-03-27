import List from '../component/List';
import SearchInput from '../component/SearchInput';

export default async function BakeryPage({searchParams}) {

    const resp = await fetch(`${process.env.API_URL}/api/bakeries?populate=*${searchParams && searchParams.name ? `&filters[name][$containsi]=${searchParams.name}` : ''}`);
    const bakeries = await resp.json();

    return(
        <div className='wrapper'>
            <div className='inner'>
                <SearchInput></SearchInput>
                <List bakery={bakeries.data}></List>
            </div>
        </div>
    )
}
