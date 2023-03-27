
import { Empty, List, Grid, Tag } from 'antd-mobile'
import SearchNavBar from './components/searchBar'
import http from '@/api/request'
import { useState, useEffect, createRef } from 'react'
import {
    useLocation,
} from 'react-router-dom'
import SearchList from './components/searchList'
import './styles.less'
function Search(props) {
    const location = useLocation()
    const searchRef = createRef(null)
    let { state: query } = location
    const [state, setState] = useState({
        limit: 20,
        offset: 0,
        showKeyword: '',
        keywords: query?.key || '',
        hots: [],
        hotsList: []
    });
    const onSearch = (keywords) => {
        keywords = query?.key || keywords || ''
        if (!keywords) {
            http('get', '/search/default', {}).then(res1 => {
                if (res1.code === 200) {
                    // console.log(res1, 'default');
                    http('get', '/search/hot', {}).then(res2 => {
                        if (res2.code === 200) {
                            // console.log(res2, 'hot');
                            http('get', '/search/hot/detail', {}).then(res3 => {
                                if (res3.code === 200) {
                                    console.log(res3, 'hot');
                                    setState({
                                        ...state,
                                        keywords,
                                        showKeyword: res1.data.showKeyword,
                                        hots: res2.result.hots,
                                        hotsList: res3.data,
                                    })
                                }
                            })
                        }
                    })
                    // /search/hot/detail
                }
            })
        } else {
            setState({
                ...state,
                keywords
            })
        }
    }
    useEffect(() => {
        onSearch()
    }, [query?.key])
    return <div className='flexbox-v search'>
        <SearchNavBar ref={searchRef} clearable placeholder={state.showKeyword} keywords={query?.key || state.keywords || ''} onSearch={(key) => onSearch(key)}></SearchNavBar>
        {!state.keywords && <div className='like-list' columns={4} span={10} style={{textAlign: 'left', margin: '0 15px'}}>
            <div style={{textAlign: 'left', margin: '0 0 15px', fontSize: '16px', color: '#999'}}>猜你喜欢</div>
            {
                state.hots.map(el =>
                <Tag onClick={() => {
                        setState((state) => {
                            return {
                                ...state,
                                showKeyword: el.first,
                                keywords: el.first
                            }
                        })
                        searchRef.current.nativeElement.value = el.first
                    }}
                    round key={el.first} style={{margin: '0 5px 5px 0', fontSize: '14px'}} color='#999'>{el.first}</Tag>
            )
            }
        </div>}
        <List header={<div style={{fontSize: '16px'}}>{'热搜榜'}</div>} style={{textAlign: 'left'}}>
        { state.hotsList.map(el =>
                <List.Item onClick={() => {
                    setState((state) => {
                        return {
                            ...state,
                            showKeyword: el.searchWord,
                            keywords: el.searchWord
                        }
                    })
                    searchRef.current.nativeElement.value = el.searchWord
                }}
                arrow={false}
                description={el.content || ''}
                key={el.searchWord} color='#999'>{el.searchWord}</List.Item>
        )}
        </List>
        {state.keywords && <SearchList keywords={state.keywords}></SearchList>}
        {/* <Empty description='暂无数据~' /> */}
    </div>
}
export default Search