import { Empty } from 'antd-mobile'
import http from '@/api/request'
import { useState, useEffect } from 'react'
import {
    useLocation,
  } from 'react-router-dom'
function MvDetail() {
    // /mv/detail
    const location = useLocation()
    let { state: query } = location
    const [state, setState] = useState({});
    useEffect(() => {
        http('get', '/mv/detail', {mvid: query.id})
    }, [])
    // http('get', '/mv/detail', query)
    return <div className='flexbox-v align-c just-c'>
        <Empty description='mv， 敬请期待' />
    </div>
}
export default MvDetail