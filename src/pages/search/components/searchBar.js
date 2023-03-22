import {
    useNavigate,
  } from 'react-router-dom'
  import { SearchBar, Toast, NavBar } from 'antd-mobile'
const SearchNavBar = () => {
    const navigate = useNavigate()
    return <SearchBar
    placeholder='搜索音乐、歌手、歌单'
    onSearch={() => navigate('/search')}
    style={{
    //   '--background': '#ffffff',
    '--border-radius': '50px',
    padding: 0,
    margin: '15px 0'
}} />
}
export default SearchNavBar