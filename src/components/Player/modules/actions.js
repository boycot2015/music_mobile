import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    HeartFill,
} from 'antd-mobile-icons'
import { Badge } from 'antd-mobile'
import { useState, useEffect } from 'react'
import {
    useNavigate,
  } from 'react-router-dom'
import { getComment, getSongDetail } from '@/api/song'
  function Actions(props) {
      const [commitCount, setCommitCount] = useState(0);
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
        <div className="icon">
            <ArrowDownCircleOutline />
        </div>
        <div className="icon" onClick={() => {
            console.log(props, 'props');
            let data = {
                id: props.id,
                picUrl: props.al.picUrl,
                name: props.name,
                singers: props.ar?.map(el => el.name).join('/')
            }
            navigate('/commit', { state: { ...data } })
            props.onChangeShowStatus(true)
        }}>
            <Badge content={commitCount > 999 ? '999+' : commitCount}
            style={{ '--right': '10%', '--top': '20%' }}
            >
                <MessageOutline />
            </Badge>
        </div>
        <div className="icon">
            <MoreOutline />
        </div>
    </div>
}
export default Actions