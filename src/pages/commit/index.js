import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { List, DotLoading, Image, InfiniteScroll, Skeleton, Ellipsis, Popup } from 'antd-mobile'
import {
    useLocation,
  } from 'react-router-dom'
import {
    CloseOutline
} from 'antd-mobile-icons'
import CommitItem from '@/components/Commit'
import { getComment, getSongDetail } from '@/api/song'
import './style.less'
function CustomList(props) {
    const location = useLocation()
    const { state: query } = location
    // console.log(location, 'query');
    const { song, songs, showStatus, isPlay, onChangeShowStatus } = props;
    const [state, setState] = useState({
        coverDetail: { ...query },
        commitList: [],
        hotComments: [],
        currentCommit: {},
        offset: 0
    })
    const [hasMore, setHasMore] = useState(true)
    const [showRepeat, setShowRepeat] = useState(false);

    const loadMore = () =>  {
        return fetchData({offset: state.offset })
    }
    const fetchData = (params) => {
        return getComment({id: song.id || query.id, ...params }).then(res => {
            if (res.code === 200) {
                setState({
                    ...state,
                    offset: ++(params.offset) || 1,
                    commitList: params?.offset ? [...state.commitList, ...res.comments] : res.comments,
                    hotComments: res.hotComments ? res.hotComments : state.hotComments
                })
                setTimeout(() => {
                    setHasMore(res.comments.length > 0)
                }, 500);
            }
        })
    }
    const { beReplied, ...currentCommit } = state.currentCommit
    return <div className='commit-list flexbox-v' style={{"minHeight": 300, ...props.style}}>
        {state.coverDetail.picUrl ? <div className='commit-list-top flexbox-h'>
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
                        <CommitItem setShowRepeat={(val) => {
                            setShowRepeat(val)
                            setState({
                                ...state,
                                currentCommit: el
                            })
                        }} {...el} />
                    </List.Item>)
                }
            </List> : null}
            {state.commitList && state.commitList.length ? <List>
                {
                    state.commitList.map((el, index) =>
                    <List.Item key={index}>
                        <CommitItem setShowRepeat={(val) => {
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
            borderRadius: '10px 10px 0 0',
            maxHeight: 400
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
                        <CommitItem {...currentCommit} />
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
                            <CommitItem {...el} />
                        </List.Item>)
                    }
                </List> : null}
            </div>
        </Popup>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomList)