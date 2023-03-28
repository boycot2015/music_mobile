import { Image, Ellipsis } from 'antd-mobile'
import { formatNum } from '@/utils'
import './style.less'
import {
    PlayOutline,
    HistogramOutline,
    DownFill,
} from 'antd-mobile-icons'
import {
    useNavigate,
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { mapStateToProps } from '@/redux/dispatch';
  function MusicItem(props) {
    const { song, data, showTag, office } = props;

    const navigate = useNavigate()
    const toDetail = (e) => {
        e.stopPropagation()
        if (!props.showPlayer) {
            console.log(props, 'props');
            navigate(props.url || '/song/list', {state: {id: data.id, office, updateFrequency: data.updateFrequency }})
            return
        }
        props.showPlayer(true)
    }
    return <div className={(props.type ? 'type-' + props.type + ' music-grid-item ' : 'music-grid-item ') + (song.id === data.id && data.id ? 'active ' : ' ') + (props.className ? props.className : '') } onClick={(e) => toDetail(e)}>
    {!props.index ? <Image className='img' src={data.picUrl || data.cover || data.coverImgUrl || data.coverUrl || data.al?.picUrl} /> : <span className='index'>{props.index}</span>}
    {data.playCount && <div className="play-count">
    {!data.updateFrequency ? <PlayOutline className='play-icon' /> : null}
    {!data.updateFrequency ? formatNum(data.playCount) : data.updateFrequency}
    </div>}
    <div className={`text  ${office ? 'flexbox-h align-c flex4' : 'flexbox-v'}`}>
        <Ellipsis rows={props.type === 2 ? 1 : 2} className='name' style={office && {width: 'auto'}} content={data.name || data.nickname || data.title} />
        {data.ar  && <Ellipsis rows={1} className='description tl' content={office ? '-' + data.ar?.map(el => el.name).join('/') :  data.ar?.map(el => el.name).join('/') + ' — ' + data.al?.name} />}
    </div>
    {showTag ? <div className="tag tc">
        {data.newimported ? '新' : data.order ? <DownFill color='green' /> : '—'}
    </div> : null}
    {data.id && song.id === data.id ? <HistogramOutline fontSize={20} color={'var(--adm-color-primary)'} /> : null}
</div>
}
export default connect(mapStateToProps)(MusicItem)