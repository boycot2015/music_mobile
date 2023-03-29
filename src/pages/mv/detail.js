import { Tag, NavBar, Avatar } from 'antd-mobile'
import http from '@/api/request'
import { useState, useEffect } from 'react'
import {
    useLocation,
    useNavigate
  } from 'react-router-dom'
import {
    MoreOutline
} from 'antd-mobile-icons'
import './styles.less'
function MvDetail() {
    // /mv/detail
    const location = useLocation()
    const Navigate = useNavigate()
    let { state: query } = location
    const [state, setState] = useState({
        url: '',
    });
    useEffect(() => {
        http('get', '/mv/detail', {mvid: query.id}).then(res => {
            http('get', '/mv/url', {id: res.data.id, r: res.mp.pl}).then(urlRes => {
                // console.log(urlRes, res.data, 'urlRes');
                setState({
                    ...state,
                    ...res.data,
                    ...urlRes.data
                })
            })
        })
    }, [])
    return <div className='flexbox-v mv-detail'>
        <NavBar
        className="header"
        onBack={() => Navigate(-1)} right={<MoreOutline style={{fontSize: 24}} />}></NavBar>
        <div className="content flexbox-v align-c just-c">
            <video src={state.url} controls autoPlay style={{width: '100%'}}></video>
            <div className="bottom">
                <div className='info flexbox-h  align-c'>
                    <Avatar src={state.cover} style={{borderRadius: 100}}></Avatar>
                    <div className='artistName'>{state.artistName}</div>
                </div>
                <div className='text'>
                    <p className='name'><Tag className='tag'>mv</Tag>{state.name}</p>
                    <p>{state.briefDesc}</p>
                    <p className='desc'>{state.desc}</p>
                </div>
            </div>
        </div>
    </div>
}
export default MvDetail