

import { Button, Tabs } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'

import config from '@/config'
import { connect } from 'react-redux'
import './styles.less'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
import MyPlaylist from './coms/playlist'
import UserInfo from './coms/userInfo'
import Apps from './coms/apps'

function PersonalCenter(props) {
    const NavigateTo = useNavigate()
    const onLogout = () => {
        localStorage.removeItem(config.appPrefix + 'userInfo')
        props.onSetUser('')
        NavigateTo('/login')
    }
    // console.log(props.user, 'props.user');
    return <div className='flexbox-v align-c my' style={{background: '#f8f8f8'}}>
        <div className='content' style={{width: '100%'}}>
            <UserInfo></UserInfo>
            <Apps></Apps>
            <MyPlaylist></MyPlaylist>
            {/* <Empty description='个人中心，敬请期待'  style={{height: '80%'}} /> */}
        </div>
        <Button block color='primary' style={{width: '80%'}} onClick={onLogout} size='large'>
            退出登录
        </Button>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
