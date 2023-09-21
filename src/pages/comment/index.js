import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { List, Image, Skeleton, Ellipsis, Popup } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import {
    useLocation,
  } from 'react-router-dom'
import {
    CloseOutline
} from 'antd-mobile-icons'
import CommentItem from '@/components/Comment'
import { getComment } from '@/api/song'
import './style.less'
const filterComment = (comments) => {
    let arr = []
    comments.map(el => {
        if (el.parentCommentId && el.beReplied?.length) {
            const { beReplied, time, timeStr, likedCount, ...others } = el
            let existIndex = arr.findIndex(ele => ele.beRepliedCommentId === el.parentCommentId)
            if (existIndex > -1) {
                arr[existIndex]?.beReplied.push({
                    time,
                    timeStr,
                    ...others
                })
            } else {
                arr.push({
                    time,
                    timeStr,
                    ...beReplied[0],
                    ...beReplied[0]?.user,
                    likedCount,
                    beReplied: [{
                        time,
                        timeStr,
                        ...others
                    }]
                })
            }
        } else {
            arr.push(el)
        }
    })
    console.log(arr, 'arr');
    return arr
}
// const sortArray = (arr, key = 'beRepliedCommentId') => {
//     return arr.filter((el, index, self) => self.findIndex(val => el[key] === val[key]) === index)
// }
function CommentList(props) {
    const location = useLocation()
    const { state: query } = location
    // const query = props
    // console.log(location, 'query');
    const { song, songs, showStatus, isPlay, onChangeShowStatus } = props;
    const [state, setState] = useState({
        coverDetail: { ...query },
        commentList: [],
        hotComments: [],
        currentCommit: {},
        offset: 0,
        limit: 20
    })
    const [hasMore, setHasMore] = useState(true)
    const [showRepeat, setShowRepeat] = useState(false);

    const loadMore = () =>  {
        return fetchData({offset: state.offset })
    }
    const fetchData = (params) => {
        return getComment({id: song.id || query.id, limit: state.limit, ...params, offset: ++(params.offset) * state.limit }).then(res => {
            if (res.code === 200) {
                let {ar, al, name, ...others } = {...songs.filter(el => el.id === song.id)[0]}
                setState({
                    ...state,
                    coverDetail: {...others, name: name || query.name, picUrl: al?.picUrl || query.picUrl, singers: ar?.map(el => el.name)?.join('/') || query.singers},
                    offset: ++(params.offset) || 0,
                    commentList: params?.offset ? [...state.commentList, ...filterComment(res.comments)] : filterComment(res.comments),
                    hotComments: res.hotComments ? filterComment(res.hotComments) : state.hotComments
                })
                setHasMore(res.comments.length > 0)
            }
        })
    }
    const { beReplied, ...currentCommit } = state.currentCommit
    return <div className='commit-list flexbox-v' style={{"minHeight": 300, ...props.style}}>
        {state.coverDetail.picUrl ? <div
        className='commit-list-top flexbox-h'
        onClick={() => songs && songs.length && onChangeShowStatus(false)}>
            <Image className='img' src={state.coverDetail.picUrl} />
            <div className="cover-text flexbox-h align-c">
                <div className="name">{state.coverDetail.name}</div>-
                <Ellipsis rows={1} className="singer" content={state.coverDetail.singers} />
            </div>
        </div> : <Skeleton animated className={'customSkeleton'} />}
        <div className="music-commit">
            {state.hotComments && state.hotComments.length ? <List
                columns={1} gap={8}>
                {
                    state.hotComments.map((el, index) =>
                    <List.Item key={index}>
                        <CommentItem setShowRepeat={(val) => {
                            setShowRepeat(val)
                            setState({
                                ...state,
                                currentCommit: el
                            })
                        }} {...el} />
                    </List.Item>)
                }
            </List> : null}
            {state.commentList && state.commentList.length ? <List>
                {
                    state.commentList.map((el, index) =>
                    <List.Item key={index}>
                        <CommentItem setShowRepeat={(val) => {
                            setShowRepeat(val)
                            setState({
                                ...state,
                                currentCommit: el
                            })
                        }} {...el} />
                    </List.Item>)
                }
            </List> : null}
            <InfiniteScroll loadMore={loadMore} threshold={100} hasMore={hasMore} />
        </div>
        <Popup
        forceRender
        visible={showRepeat}
        bodyStyle={{
            borderRadius: '10px 10px 0 0'
        }}
        onMaskClick={() => {
            setShowRepeat(false)
        }}>
            <h3 className='title clearfix'
            style={{
                padding: '15px',
                fontSize: 18,
                margin: 0,
                textAlign: 'center',
                borderBottom: '1px solid #e8e8e8'
            }}>回复({beReplied ? beReplied.length : 0})
            <CloseOutline
            onClick={() => {
                setShowRepeat(false)
            }}
            style={{
                fontSize: 20,
            }} className='fr' />
            </h3>
            <div className="commit-list repeat">
                <List className='repeated-user'>
                    <List.Item>
                        <CommentItem {...currentCommit} />
                    </List.Item>
                </List>
                <div className="repeated-title"
                style={{
                    padding: '10px 15px',
                    fontSize: 14,
                    borderBottom: '1px solid #e8e8e8'
                }}
                >
                    <span className="name">全部回复</span>
                </div>
                {beReplied && beReplied.length ? <List>
                    {
                        beReplied.map((el, index) =>
                        <List.Item key={index}>
                            <CommentItem {...el} />
                        </List.Item>)
                    }
                </List> : null}
            </div>
        </Popup>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)