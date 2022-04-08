import { useEffect, useState } from 'react'
import { Grid, Button } from 'antd-mobile'
import Banner from './components/banner'
import CategoryItem from './components/CategoryItem'
import {
    useNavigate,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPersonalized, getPrivatecontentList } from '@/api/home'
import {
    RightOutline,
    HistogramOutline,
    CalendarOutline,
    FileOutline,
    AntOutline,
    HeartOutline,
    MovieOutline
} from 'antd-mobile-icons'
import './home.less'
function Home() {
    const navigate = useNavigate()
    const [state, setState] = useState({
        privatecontent: [],
        recommand: [],
        categoryList: [{
            icon: <CalendarOutline />,
            name: '每日推荐'
        }, {
            icon: <HeartOutline />,
            name: '私人FM'
        }, {
            icon: <FileOutline />,
            name: '歌单'
        }, {
            icon: <HistogramOutline />,
            name: '排行榜'
        },
        // {
        //     icon: <AntOutline />,
        //     name: '直播'
        // },
        {
            icon: <MovieOutline />,
            name: '数字专辑'
        }]
    })
    useEffect(() => {
        getPersonalized().then(res => {
            if (res.code === 200) {
                getPrivatecontentList().then(data => {
                    if (data.code === 200) {
                        setState({
                            ...state,
                            recommand: res.result,
                            privatecontent: data.result
                        })
                    }
                })
            }
        })
    }, [])
    return <div className='home'>
        {/* 轮播图 */}
        <Banner
        style={{
            '--border-radius': '8px',
        }}
        />

        {/* 金刚区 */}
        <div className="category-list flexbox-h algin-c just-c" style={{padding: '0 15px'}}>
            {
                state.categoryList.map((category, index) => <CategoryItem key={index} data={category} />)
            }
        </div>

        {/* 推荐歌单 */}
        <h3 className='title clearfix'>
            推荐歌单
            <Button className='more fr' onClick={() => navigate('/custom/list', {state: {type: ''}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.recommand.slice(0, 9).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>

        {/* 云村出品 */}
        <h3 className='title clearfix'>
            云村出品
            <Button className='more fr' size="mini" onClick={() => navigate('/custom/list', {state: {type: 1}})} shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        <Grid
            columns={2}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.privatecontent.slice(0, 2).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={1} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>

        {/* 超级歌单 */}
        <h3 className='title clearfix'>
            超级歌单
            <Button className='more fr' onClick={() => navigate('/custom/list', {state: {type: ''}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.recommand.slice(9, 15).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>

        {/* 宝藏曲库 */}
        <h3 className='title clearfix'>
            宝藏曲库
            <Button className='more fr' size="mini" onClick={() => navigate('/custom/list', {state: {type: 1}})} shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        <Grid
            columns={2}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.privatecontent.slice(2, 6).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={1} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>

        {/* 猜你喜欢 */}
        <h3 className='title clearfix'>
            猜你喜欢
            <Button className='more fr' onClick={() => navigate('/custom/list', {state: {type: ''}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.recommand.slice(15, 24).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>
    </div>
}
export default Home