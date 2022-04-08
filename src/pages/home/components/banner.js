
import React, { useRef, useImperativeHandle, useState, useEffect } from 'react'
import { Swiper, Toast, Image } from 'antd-mobile'
import './banner.less'
import { getBanner } from '@/api/home'
const randomColor = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let str = '#'
    for (let index = 0; index < 4; index++) {
        str += arr[Math.ceil(Math.random() * (arr.length - 1))]
    }
    return str
}
function Banner(props, homeRef) {
    // const colors = [randomColor(), randomColor(), randomColor(), randomColor()]
    const [state, setState] = useState({
        banners: props.data || []
    })
    useEffect(() => {
        !props.data && getBanner().then(res => {
            if (res.code === 200) {
                setState({
                    ...state,
                    banners: res.banners
                })
            }
        })
    }, [])
    const SwiperRef = useRef(null)
    homeRef.current && useImperativeHandle(homeRef, () => ({
        swipePrev: SwiperRef.current?.swipePrev,
        swipeNext: SwiperRef.current?.swipeNext,
    }))
    return <div className={'swiper'}>
        <Swiper
        ref={SwiperRef}
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
                  Toast.show(`你点击了卡片 ${index + 1}`)
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
          ))}</Swiper>
            {props.children}
        </div>
}
export default React.memo(Banner)