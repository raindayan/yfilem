import { useEffect, useRef, useState } from "react";

// 定义 Props 类型
interface Props<T> {
  /** 请求数据的异步函数 */
  loadData: (page: number) => Promise<T[]>;
  /** 渲染每一项的方法 */
  renderItem: (item: T) => React.ReactNode;
  /** 每次加载多少条 */
  pageSize?: number;
  /** 距离底部多少距离触发加载 */
  threshold?: number;
}


/**
 * 滚动懒加载列表组件
 */
export default function InfiniteScrollList<T>({
  loadData,
  renderItem,
  pageSize = 10,
  threshold = 200,
}: Props<T>) {
  // 列表数据
  const [list, setList] = useState<T[]>([]);
  // 是否正在加载
  const [loading, setLoading] = useState(false);
  // 当前页码
  const pageRef = useRef(1);
  // 是否还有更多数据
  const hasMoreRef = useRef(true);
  // 列表容器 ref
  const containerRef = useRef<HTMLDivElement>(null);

  // 加载数据
  const fetchData = async () => {
    if (!hasMoreRef.current || loading) return;

    setLoading(true);
    try {
      const data = await loadData(pageRef.current);
      // 没有更多数据
      if (data.length < pageSize) {
        hasMoreRef.current = false;
      }
      setList((prev) => [...prev, ...data]);
      pageRef.current += 1;
    } catch (err) {
      console.error('加载失败：', err);
    } finally {
      setLoading(false);
    }
  };

  // 首次加载
  useEffect(() => {
    fetchData();
  }, []);

  // 监听滚动
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // 距离底部不足 threshold → 加载下一页
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        fetchData();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '12px',
      }}
    >
      {/* 列表内容 */}
      {list.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}

      {/* 加载提示 */}
      {loading && <div style={{ textAlign: 'center', padding: '12px' }}>加载中...</div>}

      {/* 没有更多 */}
      {!hasMoreRef.current && list.length > 0 && (
        <div style={{ textAlign: 'center', color: '#999', padding: '12px' }}>
          已加载全部
        </div>
      )}
    </div>
  );
}