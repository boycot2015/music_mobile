import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline,
    HeartFill,
} from 'antd-mobile-icons'
import { useEffect, useRef, useState } from 'react'
function Actions(params) {
        const [star, setStar] = useState(false)
        return <div className="actions flexbox-h align-c">
        <div className={`icon heart ${star ? 'active' : ''}`} onClick={() => setStar(!star)}>
        {star ? <HeartFill /> : <HeartOutline />}
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