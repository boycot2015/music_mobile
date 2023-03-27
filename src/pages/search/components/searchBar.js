import {
    useNavigate,
  } from 'react-router-dom'
  import { SearchBar, Toast, NavBar } from 'antd-mobile'
  import {forwardRef, useState } from  'react'
const SearchNavBar = (props, ref) => {
    // const navigate = useNavigate()
    const [state, setstate] = useState({
        keywords: props.keywords
    })
    // console.log(props.keywords, 'props.keywords');
    return <SearchBar
    ref={ref}
    placeholder={props.placeholder || '搜索音乐、歌手、歌单'}
    defaultValue={props.keywords || ''}
    onSearch={(key) => {
        setstate({
            ...state,
            keywords: key
        })
        props.onSearch && props.onSearch(key || props.placeholder)
    }}
    onChange={(key) => {
        setstate({
            ...state,
            keywords: key
        })
        !key && props.onSearch && props.onSearch('')
    }}
    style={{
    //   '--background': '#ffffff',
    '--border-radius': '50px',
    padding: '0 15px',
    margin: '0 0 15px'
}} />
}

export default forwardRef(SearchNavBar)