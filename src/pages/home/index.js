import { useEffect, useState } from 'react'
import { Grid, Button, Skeleton, SearchBar, NavBar } from 'antd-mobile'
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
    HeartOutline,
    MovieOutline
} from 'antd-mobile-icons'
import './home.less'
function Home() {
    const navigate = useNavigate()
    let hasFetch = false // 防止多次渲染
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
        const fetchData = async () => {
            let res = await getPersonalized()
            if (res.code === 200) {
                let data =  await getPrivatecontentList()
                if (data.code === 200) {
                    setState({
                        ...state,
                        recommand: res.result,
                        privatecontent: data.result
                    })
                }
            }
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [])
    return <div className='home'>
        {/* 轮播图 */}
        <Banner
        style={{
            '--border-radius': '8px',
        }}
        />

        {/* 金刚区 */}
        {state.categoryList.length ? <div className="category-list flexbox-h algin-c just-c" style={{padding: '0 15px'}}>
            {
                state.categoryList.map((category, index) => <CategoryItem key={index} data={category} />)
            }
        </div> : <Skeleton animated className={'customSkeleton'} />}
        {/* 推荐歌单 */}
        <h3 className='title clearfix'>
            推荐歌单
            <Button className='more fr' onClick={() => navigate('/category/list', {state: {cat: ''}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        {state.recommand.length ? <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.recommand.slice(0, 9).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <Skeleton animated className={'customSkeleton'} />}

        {/* 云村出品 */}
        <h3 className='title clearfix'>
            云村出品
            <Button className='more fr' size="mini" onClick={() => navigate('/custom/list', {state: {type: 1, title: '云村出品'}})} shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        {state.privatecontent.length ? <Grid
            columns={2}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.privatecontent.slice(0, 2).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={1} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <Skeleton animated className={'customSkeleton'} />}

        {/* 超级歌单 */}
        <h3 className='title clearfix'>
            超级歌单
            <Button className='more fr' onClick={() => navigate('/custom/list', {state: {type: '', title: '超级歌单'}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        {state.recommand.length ? <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.recommand.slice(9, 15).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <Skeleton animated className={'customSkeleton'} />}

        {/* 宝藏曲库 */}
        <h3 className='title clearfix'>
            宝藏曲库
            <Button className='more fr' size="mini" onClick={() => navigate('/custom/list', {state: {type: 1, title: '宝藏曲库'}})} shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        {state.privatecontent.length ? <Grid
            columns={2}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.privatecontent.slice(2, 6).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={1} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <Skeleton animated className={'customSkeleton'} />}

        {/* 猜你喜欢 */}
        <h3 className='title clearfix'>
            猜你喜欢
            <Button className='more fr' onClick={() => navigate('/custom/list', {state: {type: '', title: '猜你喜欢'}})} size="mini" shape='rounded'>
                更多 <RightOutline />
            </Button>
        </h3>
        {state.recommand.length ? <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.recommand.slice(15, 24).map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <Skeleton animated className={'customSkeleton'} />}
    </div>
}
export default Home