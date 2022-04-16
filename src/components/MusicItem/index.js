import { Image, Ellipsis } from 'antd-mobile'
import { formatNum } from '@/utils'
import './style.less'
import {
    PlayOutline,
    HistogramOutline,
} from 'antd-mobile-icons'
import {
    useNavigate,
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { mapStateToProps } from '@/redux/dispatch';
  function MusicItem(props) {
    const { song, data } = props;

    const navigate = useNavigate()
    const toDetail = () => {
        if (!props.showPlayer) {
            navigate('/song/list', {state: {id: data.id}})
            return
        }
        props.showPlayer(true)
    }
    return <div className={(props.type ? 'type-' + props.type + ' music-grid-item ' : 'music-grid-item ') + (song.id === data.id ? 'active' : '') } onClick={() => toDetail()}>
    {!props.index ? <Image className='img' src={data.picUrl || data.coverImgUrl || data.al?.picUrl} /> : <span className='index'>{props.index}</span>}
    {data.playCount && <div className="play-count">
    <PlayOutline className='play-icon' />
    {formatNum(data.playCount)}
    </div>}
    <div className="text flexbox-v">
        <Ellipsis rows={props.type === 2 ? 1 : 2} className='name' content={data.name} />
        {data.ar && <Ellipsis rows={1} className='description tl' content={data.ar?.map(el => el.name).join('/') + ' - ' + data.al?.name} />}
    </div>
    {song.id === data.id ? <HistogramOutline fontSize={20} color={'var(--adm-color-primary)'} /> : null}
</div>
}
export default connect(mapStateToProps)(MusicItem)