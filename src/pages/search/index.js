
import { DotLoading, List, Grid, Tag } from 'antd-mobile'
import SearchNavBar from './components/searchBar'
import http from '@/api/request'
import { useState, useEffect, createRef } from 'react'
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'
import './styles.less'
function Search(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const searchRef = createRef(null)
    let { state: query } = location
    const [state, setState] = useState({
        limit: 20,
        offset: 0,
        loading: true,
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
                                        loading: false,
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
    return !state.loading ? <div className={state.keywords ? 'flexbox-v hidden search' : 'flexbox-v search'}>
        <SearchNavBar ref={searchRef} clearable placeholder={state.showKeyword} keywords={query?.keywords || state.keywords || ''} onSearch={(keywords) => {
            navigate('/search/detail', { state: { keywords } })
        }}></SearchNavBar>
        {!state.keywords && <div className='like-list' columns={4} span={10} style={{textAlign: 'left', margin: '0 15px'}}>
            <div style={{textAlign: 'left', margin: '0 0 15px', fontSize: '16px', color: '#999'}}>猜你喜欢</div>
            {
                state.hots.map(el =>
                <Tag onClick={() => {
                    navigate('/search/detail', { state: { keywords: el.first } })
                }}
                round key={el.first} style={{margin: '0 5px 5px 0', fontSize: '14px'}} color='#999'>{el.first}</Tag>
            )
            }
        </div>}
        {!state.keywords && <List header={<div style={{fontSize: '16px'}}>{'热搜榜'}</div>} style={{textAlign: 'left'}}>
        { state.hotsList.map(el =>
                <List.Item onClick={() => {
                    navigate('/search/detail', { state: { keywords: el.searchWord } })
                    // searchRef.current.nativeElement.value = el.searchWord
                }}
                arrow={false}
                description={el.content || ''}
                key={el.searchWord} color='#999'>{el.searchWord}</List.Item>
        )}
        </List>}
    </div> : <div  style={{marginTop: 20}}><span style={{color: 'var(--adm-color-primary)'}}>加载中</span><DotLoading color={'primary'} /></div>
}
export default Search