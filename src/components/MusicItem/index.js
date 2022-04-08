import { Image, Ellipsis } from 'antd-mobile'
import { formatNum } from '@/utils'
import './style.less'
import {
    PlayOutline
} from 'antd-mobile-icons'
function MusicItem(props) {
    return <div className={props.type ? 'type-' + props.type + ' music-grid-item' : 'music-grid-item'}>
    <Image className='img' src={props.data.picUrl} />
    {props.data.playCount && <div className="play-count">
    <PlayOutline className='play-icon' />
    {formatNum(props.data.playCount)}
    </div>}
    <Ellipsis rows={2} className='name' content={props.data.name} />
</div>
}
export default MusicItem