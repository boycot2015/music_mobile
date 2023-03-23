

import { List, Grid, Avatar, Button, Card, Toast } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'
import config from '@/config'
import { connect } from 'react-redux'
import './styles.less'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function UserInfo(props) {
    const NavigateTo = useNavigate()
    const onLogout = () => {
        localStorage.removeItem(config.appPrefix + 'userInfo')
        props.onSetUser('')
        NavigateTo('/login')
    }
    // console.log(props.user, 'props.user');
    return <Card
        title={null}
        className="my-userinfo"
        style={{textAlign: 'center', width: '100%', backgroundColor: '#f8f8f8'}}
        bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '16px 0', backgroundColor: '#fff' }}
        >
        <div
        className='flexbox-v align-c'
            style={{textAlign: 'left', width: '100%'}}
        >
            <div className='avatar'><Avatar style={{'--border-radius': '100%'}} src={props.user?.profile?.avatarUrl || ''} /></div>
            <div className='info flexbox-h align-c'>
                <div className='name'>{props.user?.profile?.nickname || 'boycot2017@163.com'}</div>
                {/* <div className='desc'>
                    {props.user?.profile?.description || props.user?.profile?.signature || '人间烟火味，最抚凡人心'}
                </div> */}
            </div>
            <div className='others flexbox-h align-c'>
                <div className='follows'><span>{props.user?.profile?.follows || 0}</span>关注</div>
                <div className='followeds'><span>{props.user?.profile?.followeds || 0}</span>粉丝</div>
                <div className='level'><span>Lv.{props.user?.level ||  0 }</span></div>
            </div>
        </div>
    </Card>
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
