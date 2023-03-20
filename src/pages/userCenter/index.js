

import { Empty, List, Avatar, Button } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'
import config from '@/config'
function PersonalCenter() {
        const NavigateTo = useNavigate()
        const demoAvatarImages = [
        'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
        'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      ]
    const onLogout = () => {
        localStorage.removeItem(config.appPrefix + '_cookie')
        NavigateTo('/login')
    }
    return <div className='flexbox-v align-c'>
        <List style={{width: '100%'}}>
          <List.Item
          style={{textAlign: 'left'}}
            prefix={<Avatar style={{'--border-radius': '100%'}} src={demoAvatarImages[3]} />}
            description='人间烟火味，最抚凡人心'
          >
            boycot2017@163.com
          </List.Item>
        </List>
        <Empty description='个人中心，敬请期待'  style={{height: '80%'}} />
        <Button block color='primary' style={{width: '80%'}} onClick={onLogout} size='middle'>
            退出登录
        </Button>
    </div>
}
export default PersonalCenter