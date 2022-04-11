import { Image, Ellipsis } from 'antd-mobile'
import { formatNum } from '@/utils'
import './style.less'
import {
    PlayOutline
} from 'antd-mobile-icons'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
  function MusicItem(props) {
    const navigate = useNavigate()
    const toDetail = () => {
        if (!props.showPlayer) {
            navigate('/song/list', {state: {id: props.data.id}})
            return
        }
        props.showPlayer(true)
    }
    return <div className={props.type ? 'type-' + props.type + ' music-grid-item' : 'music-grid-item'} onClick={() => toDetail()}>
    {!props.index ? <Image className='img' src={props.data.picUrl || props.data.coverImgUrl || props.data.al?.picUrl} /> : <span className='index'>{props.index}</span>}
    {props.data.playCount && <div className="play-count">
    <PlayOutline className='play-icon' />
    {formatNum(props.data.playCount)}
    </div>}
    <div className="text flexbox-v">
        <Ellipsis rows={props.type === 2 ? 1 : 2} className='name' content={props.data.name} />
        {props.data.ar && <Ellipsis rows={1} className='description tl' content={props.data.ar?.map(el => el.name).join('/') + ' - ' + props.data.al?.name} />}
    </div>
</div>
}
export default MusicItem