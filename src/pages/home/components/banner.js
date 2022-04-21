
import React, { useState, useEffect } from 'react'
import { Swiper, Toast, Image, Skeleton } from 'antd-mobile'
import {
    useNavigate
} from 'react-router-dom'
import './banner.less'
import { getBanner } from '@/api/home'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';

function Banner(props) {
    // const colors = [randomColor(), randomColor(), randomColor(), randomColor()]
    let hasFetch = false // 防止多次渲染
    const [state, setState] = useState({
        banners: []
    })
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBanner()
                if (res.code === 200) {
                    setState({
                        ...state,
                        banners: res.banners
                    })
                }
            } catch (error) {
                console.log(error);
            }
          };
        !hasFetch && fetchData();
        hasFetch = true
    }, [])
    return <div className={'swiper'}>
        {state.banners.length ? <Swiper
        // ref={SwiperRef}
        autoplay
        loop
        indicatorProps={{
            color: 'white',
            style: {
                '--dot-color': 'rgba(0, 0, 0, 0.4)',
                '--active-dot-color': 'var(--adm-color-primary)',
                '--dot-size': '4px',
                '--active-dot-size': '20px',
                '--dot-border-radius': '50%',
                '--active-dot-border-radius': '15px',
                '--dot-spacing': '8px',
            }
        }}
        defaultIndex={0}
        {...props}
        style={{
            '--border-radius': '8px',
            ...props.style
        }}
        >{state.banners.map((banner, index) => (
            <Swiper.Item key={index}>
              <div
                className={'swiper-item'}
                style={{ background: banner }}
                onClick={() => {
                    if (banner.url && banner.url !== null) {
                        window.open(banner.url, '_blank')
                    } else if (banner.targetId) {
                        props.onChangeSong(banner.targetId)
                    }
                }}
              >
                <Image fit={'cover'} src={banner.imageUrl} />
                <div
                className="title"
                style={{
                    backgroundColor: banner.titleColor
                }}>{banner.typeTitle}</div>
              </div>
            </Swiper.Item>
          ))}</Swiper> : <Skeleton />}
            {props.children}
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner)