import { useState, createRef } from 'react'
import { NavBar  } from 'antd-mobile'
// import InfiniteScroll from '@/components/InfiniteScroll'
// import MusicItem from '@/components/MusicItem'
// import UserItem from '@/components/UserItem'
// import http from '@/api/request'
import SearchPlayList from './components/searchList'
import SearchNavBar from './components/searchBar'
import {
    useLocation,
    useNavigate,
} from 'react-router-dom'
function SearchDetail(props) {
    const location = useLocation()
    const navigate = useNavigate()
    let { state: query } = location
    // const playListRef = createRef(null)
    // console.log(location, 'location');
    const searchRef = createRef(null)
    const [state, setState] = useState({
        playlists: [],
        params: { ...query || {} },
    })
    return <div className='flexbox-v search-detail'>
        <NavBar
        className="header"
        onBack={() => {
            navigate('/search')
            setState({
                ...state,
                params: { keywords: '', offset: 0 }
            })
        }}>搜索列表</NavBar>
     <SearchNavBar ref={searchRef} clearable placeholder={query?.keywords || state.keywords || ''} keywords={query?.keywords || state.keywords || ''}
     onSearch={(keywords) => {
         navigate(!keywords ? '/search' : '/search/detail', { state: { keywords } })
            setState({
                ...state,
                keywords
            })
        }}></SearchNavBar>
        <SearchPlayList {...state.params}></SearchPlayList>
    </div>
}
export default SearchDetail