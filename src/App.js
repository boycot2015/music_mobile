import './App.less';
import Layout from './layout'
import { disabledScale } from './utils' // 禁用页面缩放
function Music() {
    if (window) {
        disabledScale()
    }
    return (
        <div className="music">
        <Layout />
        </div>
    );
}

export default Music;
