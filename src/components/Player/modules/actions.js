import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    HeartFill,
} from 'antd-mobile-icons'
import { Badge, Toast } from 'antd-mobile'
import { useState, useEffect } from 'react'
import {
    useNavigate,
  } from 'react-router-dom'
import { getComment, getSongDetail } from '@/api/song'
import CommentList from '@/pages/comment'
function Actions(props) {
      const [commitCount, setCommitCount] = useState(0);
    //   const [showComment, setShowComment] = useState(false);
    //   const [commentParams, setCommentParams] = useState({});
      useEffect(() => {
        getComment({id: props.id }).then(res => {
            if (res.code === 200) {
                setCommitCount(res.total)
            }
        })
      }, [])
        const navigate = useNavigate()
        const [star, setStar] = useState(false)
        return <div className="actions flexbox-h align-c">
        <div className={`icon heart ${star ? 'active' : ''}`} onClick={() => setStar(!star)}>
        {star ? <HeartFill /> : <HeartOutline />}
        </div>
        <div className="icon" onClick={() => Toast.show('建设中~')}>
            <ArrowDownCircleOutline  />
        </div>
        <div className="icon" onClick={() => {
            console.log(props, 'props');
            let data = {
                id: props.id,
                picUrl: props.al.picUrl,
                name: props.name,
                singers: props.ar?.map(el => el.name).join('/')
            }
            navigate('/comment', { state: { ...data } })
            // setCommentParams(data)
            // setShowComment(true)
            props.onChangeShowStatus(true)
        }}>
            <Badge content={commitCount > 999 ? '999+' : commitCount}
            style={{ '--right': '10%', '--top': '20%' }}
            >
                <MessageOutline />
            </Badge>
        </div>
        <div className="icon" onClick={() => Toast.show('建设中~')}>
            <MoreOutline />
        </div>
        {/* <Popup
                visible={showComment}
                onMaskClick={() => {
                    setShowComment(false)
            }}>
                <CommentList {...commentParams} />
            </Popup> */}
    </div>
}
export default Actions