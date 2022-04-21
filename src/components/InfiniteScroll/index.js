import { InfiniteScroll, DotLoading } from 'antd-mobile'
function CustomInfiniteScroll(props) {
    const {loadMore, hasMore = false, threshold = 100 } = props
    return <InfiniteScroll loadMore={loadMore} threshold={threshold} hasMore={hasMore}>
    {hasMore ? (
    <>
    <span style={{color: 'var(--adm-color-primary)'}}>加载中</span>
    <DotLoading color={'primary'} />
    </>
) : (
    <span>--- 我是有底线的 ---</span>
)}
</InfiniteScroll>
}
export default CustomInfiniteScroll