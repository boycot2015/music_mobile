import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline
} from 'antd-mobile-icons'
function Actions(params) {
        return <div className="actions flex1 flexbox-h align-c">
        <div className="icon">
            <HeartOutline />
        </div>
        <div className="icon">
            <ArrowDownCircleOutline />
        </div>
        <div className="icon">
            <MessageOutline />
        </div>
        <div className="icon">
            <MoreOutline />
        </div>
    </div>
}
export default Actions