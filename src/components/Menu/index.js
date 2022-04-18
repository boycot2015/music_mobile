import React, {useState} from 'react'
import { List, Switch, Button, Badge } from 'antd-mobile'
import {
    CouponOutline,
    PayCircleOutline,
    SetOutline,
    MessageOutline,
    ShopbagOutline,
    EyeOutline,
    ClockCircleOutline,
    BellOutline,
} from 'antd-mobile-icons'
import {
    CloudOutlined,
    BulbOutlined,
    BehanceOutlined,
    BgColorsOutlined,
    CustomerServiceOutlined,
    MinusCircleOutlined,
    RedditOutlined,
} from '@ant-design/icons'
const Menu = () => {
    const [menu, setMenu] = useState([
        {
            title: '',
            list: [{
                extra: <Badge color="var(--adm-color-primary)" content='2'></Badge>,
                name: '消息中心',
                prefix: <MessageOutline />,
                onClick: () => {}
            }, {
                extra: <Button color='primary' size='mini' fill="outline" shape="rounded">签到</Button>,
                name: '云贝中心',
                prefix: <CloudOutlined />,
                onClick: () => {}
            }, {
                name: '创作者中心',
                prefix: <BulbOutlined />,
                onClick: () => {}
            }]
        },
        {
            title: '音乐服务',
            list: [{
                name: '演出',
                prefix: <CouponOutline />,
                onClick: () => {}
            }, {
                extra: '高性能耳机仅69元',
                name: '商城',
                prefix: <ShopbagOutline />,
                onClick: () => {}
            }, {
                name: 'Beat专区',
                disabled: true,
                prefix: <BehanceOutlined />,
                onClick: () => {}
            }, {
                extra: '送你一份好心情',
                name: '口袋彩铃',
                disabled: true,
                prefix: <BellOutline />,
                onClick: () => {}
            }, {
                name: '游戏专区',
                disabled: true,
                prefix: <RedditOutlined />,
                onClick: () => {}
            }]
        },
        {
            title: '系统设置',
            list: [{
                name: '设置',
                prefix: <SetOutline />,
                onClick: () => {}
            }, {
                extra: <Switch />,
                name: '夜间模式',
                prefix: <EyeOutline />
            }, {
                name: '定时关闭',
                extra: '未开启',
                prefix: <ClockCircleOutline />,
                onClick: () => {}
            }, {
                name: '个性装扮',
                description: '个性化主题设置',
                prefix: <BgColorsOutlined />,
                onClick: () => {}
            }, {
                name: '边听边存',
                extra: '未开启',
                prefix: <CustomerServiceOutlined />,
                onClick: () => {}
            }, {
                name: '在线听歌免流量',
                extra: '未开启',
                prefix: <PayCircleOutline />,
                onClick: () => {}
            }, {
                name: '添加Siri捷径',
                extra: '未开启',
                prefix: <PayCircleOutline />,
                onClick: () => {}
            }, {
                name: '音乐黑名单',
                extra: '未开启',
                prefix: <MinusCircleOutlined />,
                onClick: () => {}
            }, {
                name: '青少年模式',
                extra: '未开启',
                prefix: <PayCircleOutline />,
                onClick: () => {}
            }, {
                name: '音乐闹钟',
                extra: '未开启',
                prefix: <ClockCircleOutline />,
                onClick: () => {}
            }]
        },
        {
            title: '其他',
            list: [{
                name: '我的客服',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                extra: <Switch />,
                name: '我的订单',
                // prefix: <SetOutline />
            }, {
                name: '优惠券',
                extra: '未开启',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                name: '分享网抑云音乐',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                name: '个人信息收集与使用清单',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                name: '个人信息第三方共享清单',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                name: '个人信息与隐私保护',
                // prefix: <SetOutline />,
                onClick: () => {}
            }, {
                name: '关于',
                // prefix: <SetOutline />,
                onClick: () => {}
            }]
        }
    ])
  return (
    <div style={{
        height: '100vh',
        overflow: 'hidden',
        overflowY: 'auto'
    }}>
        {
            menu.map(item => <List header={item.title} key={item.title}>
                {
                item.list.map(list => <List.Item
                {...list}
                key={list.name}
                >{list.name}</List.Item>)
            }
            </List>)
        }
    </div>
  )
}
export default Menu