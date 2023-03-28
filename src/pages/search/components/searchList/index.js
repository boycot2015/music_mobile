

import { Swiper, Tabs, Badge, DotLoading, Card } from 'antd-mobile'
import { useState, useEffect, createRef } from 'react'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
import { connect } from 'react-redux'
// import {
//     AppstoreOutline,
// } from 'antd-mobile-icons'
import './styles.less'
import http from '@/api/request'
import SearchPlayList from './playList'

import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function SearchList(props) {
    const navigate = useNavigate()
    // console.log(props.user, 'props.user');
    // 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000:
    // 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
    const [state, setState] = useState({
        loading: true,
        activeCate: '单曲',
        list: [{
            name: '单曲',
            total: 0,
            limit: 100,
            key: 'song',
            type: 1,
            data: []
        }, {
            name: '专辑',
            type: 10,
            key: 'album',
            total: 0,
            data: []
        }, {
            name: '歌手',
            key: 'artist',
            type: 100,
            total: 0,
            data: []
        }, {
            name: '歌单',
            key: 'playlist',
            total: 0,
            type: 1000,
            data: []
        }, {
            name: '用户',
            total: 0,
            key: 'userprofile',
            type: 1002,
            data: []
        }, {
            name: 'MV',
            total: 0,
            key: 'mv',
            type: 1004,
            data: []
        }, {
            name: '歌词',
            total: 0,
            key: 'song',
            limit: 100,
            type: 1006,
            data: []
        }, {
            name: '电台',
            total: 0,
            key: 'djRadio',
            type: 1009,
            data: []
        }, {
            name: '视频',
            total: 0,
            key: 'video',
            type: 1014,
            data: []
        },
        // {
        //     name: '综合',
        //     total: 0,
        //     type: 1018,
        //     data: []
        // },
        // {
        //     name: '声音',
        //     total: 0,
        //     type: 2000,
        //     data: []
        // }
    ]
    });
    const location = useLocation()
    let { state: query } = location
    useEffect(() => {
        // getData(1, 100, 1)
    }, [query?.key || props.keywords]);
    const handleCateChange = (val) => {
        if (val === state.activeCate) return
        setState({
            ...state,
            loading: false,
            activeCate: val
        })
    }
    return <div className='flexbox-v search-list'>
        <div className="records-list">
            <Tabs
            onChange={(key) => handleCateChange(key)}
            activeKey={state.activeCate}
            >
                {
                    (state.list && state.list.length) ? state.list.map((el, index) =>
                    <Tabs.Tab
                    key={el.name}
                    title={
                    // <Badge content={el.total || ''} style={{ '--right': '-10px', '--top': '8px' }}>
                    //     {el.name}
                    // </Badge>
                    el.name
                  } />) : <div style={{marginTop: 20}}><span style={{color: 'var(--adm-color-primary)'}}>加载中</span><DotLoading color={'primary'} /></div>
                }
            </Tabs>
            {
                state.list.map(el => state.activeCate === el.name ? <SearchPlayList key={el.name} query={{ keywords: query?.key || props.keywords, type: el.type, key: el.key }} /> : null)
            }
        </div>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
