import {
    MoreOutline,
    MessageOutline,
    ArrowDownCircleOutline,
    HeartOutline
} from 'antd-mobile-icons'
import { ProgressBar } from 'antd-mobile'
function CustomProgressBar(params) {
        return <div className="progress-bar">
        <ProgressBar
        percent={50}
        style={{
          '--track-width': '2px',
          '--fill-color': 'var(--adm-color-primary)'
        }}
        />
    </div>
}
export default CustomProgressBar