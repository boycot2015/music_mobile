import { Image, Ellipsis } from 'antd-mobile'
import './style.less'
function CategoryItem(props) {
    return <div className={'category-list-item'} onClick={(e) => props.onClick && props.onClick()}>
    <span className='category-icon'>{props.data.icon}</span>
    <Ellipsis rows={2} className='name' content={props.data.name} />
</div>
}
export default CategoryItem