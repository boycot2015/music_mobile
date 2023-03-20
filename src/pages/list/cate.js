import { useEffect, useState } from 'react'
import { Grid, NavBar, Ellipsis, Button  } from 'antd-mobile'
import {
    LoopOutline,
    FireFill,
    LeftOutline
} from 'antd-mobile-icons'
import './style.less'
function cate(props) {
    let cates = []
    const { cateList, categories, setShowCateMenu, activeCate, setActive } = props
    cateList.map(el => {
        let temp = {
            category: el.category,
            title: categories[el.category],
            list: [el]
        }
        if (cates && cates.length) {
            let index = cates.findIndex(val => val.category === el.category)
            if (index > -1) {
                cates[index].list.push(el)
            } else {
                cates.push(temp)
            }
        } else {
            cates.push(temp)
        }
    })
    // console.log(cates, 'props');
    return <div className="cate-menu">
        <NavBar
        className="music-header"
        onBack={() => setShowCateMenu(false)}>
            全部分类
        </NavBar>
        <div className="cate-menu-list">
            {
                cates.map(el =>
                <div key={el.category} className="cate-menu-list-item">
                    <div className="title">{el.title}</div>
                    <Grid columns={4} className={'music-grid tc'} gap={15}>
                        {
                            el.list?.map((cat, index) =>
                            <Grid.Item key={index}>
                                <div onClick={() => setActive(cat, index)} className={`cat-text tc align-c just-c flexbox-h ${activeCate === cat.name ? 'active' : ''}`}>
                                {cat.hot ? <div className="icon"><FireFill /></div> : null}
                                    <Ellipsis rows={2} content={cat.name} />
                                </div>
                            </Grid.Item>
                            )
                        }
                    </Grid>
                </div>
                )
            }
        </div>
    </div>
}
export default cate