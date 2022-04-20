import React, {useState} from 'react'
import { List, Switch, Button, Badge, Image, Ellipsis, Swiper } from 'antd-mobile'
import {
    CouponOutline,
    BillOutline,
    SetOutline,
    MessageOutline,
    ShopbagOutline,
    EyeOutline,
    ClockCircleOutline,
    BellOutline,
    RightOutline,
    ScanningOutline,
    FileOutline,
    TextOutline,
    ExclamationCircleOutline,
    CheckShieldOutline,
    StopOutline,
    TagOutline
} from 'antd-mobile-icons'
import {
    CloudOutlined,
    BulbOutlined,
    BoldOutlined,
    BgColorsOutlined,
    CustomerServiceOutlined,
    RedditOutlined,
    BlockOutlined,
    SecurityScanOutlined,
    ShareAltOutlined,
    FileProtectOutlined,
} from '@ant-design/icons'
import './style.less'
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
                extra: <div className="flexbox-h align-c just-c">
                    <Ellipsis style={{fontSize: 'var(--size-12)'}} content="高性能耳机仅69元"></Ellipsis>
                    <Image src={''} style={{
                        borderRadius: 50, marginLeft: 5
                    }} />
                </div>,
                name: '商城',
                prefix: <ShopbagOutline />,
                onClick: () => {}
            }, {
                name: 'Beat专区',
                disabled: true,
                prefix: <BoldOutlined />,
                onClick: () => {}
            }, {
                extra: <div className="flexbox-h align-c just-c">
                    <Ellipsis style={{fontSize: 'var(--size-12)'}} content="送你一份好心情"></Ellipsis>
                    <Image src={''} style={{
                        borderRadius: 50, marginLeft: 5
                    }}/>
                </div>,
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
                prefix: <BillOutline />,
                onClick: () => {}
            }, {
                name: '添加Siri捷径',
                extra: '未开启',
                prefix: <BlockOutlined />,
                onClick: () => {}
            }, {
                name: '音乐黑名单',
                extra: '未开启',
                prefix: <StopOutline />,
                onClick: () => {}
            }, {
                name: '青少年模式',
                extra: '未开启',
                prefix: <CheckShieldOutline />,
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
                prefix: <CustomerServiceOutlined />,
                onClick: () => {}
            }, {
                name: '我的订单',
                onClick: () => {},
                prefix: <FileOutline />
            }, {
                name: '优惠券',
                extra: '未开启',
                prefix: <CouponOutline />,
                onClick: () => {}
            }, {
                name: '分享网抑云音乐',
                prefix: <ShareAltOutlined />,
                onClick: () => {}
            }, {
                name: '个人信息收集与使用清单',
                prefix: <FileProtectOutlined />,
                onClick: () => {}
            }, {
                name: '个人信息第三方共享清单',
                prefix: <TextOutline />,
                onClick: () => {}
            }, {
                name: '个人信息与隐私保护',
                prefix: <SecurityScanOutlined />,
                onClick: () => {}
            }, {
                name: '关于',
                prefix: <ExclamationCircleOutline />,
                onClick: () => {}
            }]
        }
    ])
    const banners = [{
        text: '立享21项专属特权 >'
    }, {
        text: '今天讲真话 | 礼品卡上新'
    }, {
        text: '春意盎然 | 黑胶VIP皮肤上新'
    }]
  return (
    <div className='menu'>
        <div className="user-info flexbox-h align-c just-between">
            <div className="left flexbox-h align-c just-c">
                <Image src={''} width={32} height={32} style={{
                    borderRadius: 32, marginRight: 5
                }} />
                <span>大唐江流儿 <RightOutline /></span>
            </div>
            <ScanningOutline fontSize={26} style={{color: 'var(--color-333)'}} />
        </div>
        <div
        className="menu-main">
            <div className="vip">
                <div className="top flexbox-h align-c just-between" style={{
                    '--border': 'var(--border-color)'
                }}>
                    <div className="text">
                        <div className="title">尊贵的黑胶VIP</div>
                        <div className="label">
                        <Swiper
                            // ref={SwiperRef}
                            autoplay
                            loop
                            allowTouchMove={false}
                            indicator={() => null}
                            direction='vertical'
                            style={{
                                '--height': '16px',
                                overflow: 'hidden'
                              }}
                            defaultIndex={0}
                            >{banners.map((banner, index) => (
                                <Swiper.Item key={index}>
                                <div >
                                    <div
                                    style={{
                                        backgroundColor: banner.titleColor
                                    }}>{banner.text}</div>
                                </div>
                                </Swiper.Item>
                            ))}</Swiper>
                        </div>
                    </div>
                    <Button color='primary' className="btn" size='mini' fill="outline" shape="rounded">会员中心</Button>
                </div>
                <div className="bottom flexbox-h align-c just-between">
                    <div className="desc">9周年狂欢！黑胶VIP首开￥0.19/天</div>
                    {/* <Image className='img' src={''} width={32} height={32} style={{
                        borderRadius: '100%', marginRight: 5
                    }} /> */}
                    <div className="img">
                        <TagOutline />
                    </div>
                </div>
            </div>
            {
                menu.map(item => <List
                className='menu-list'
                header={item.title}
                key={item.title}>
                    {
                    item.list.map(list => <List.Item
                        className='menu-list-item'
                    {...list}
                    key={list.name}
                    >{list.name}</List.Item>)
                }
                </List>)
            }
        </div>
    </div>
  )
}
export default Menu