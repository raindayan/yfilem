export interface InfiniteScrollListItemData {
    id: number | string;          // 唯一标识
    title: string;                // 标题
    content: string;              // 内容摘要或全文
    author: {
        id: number | string;
        name: string;
        avatar?: string;            // ? 表示可选字段
    };
    createdAt: string | Date;     // 创建时间
    viewCount: number;            // 浏览量
    likeCount: number;            // 点赞数
    commentCount: number;         // 评论数
    isSticky?: boolean;           // 是否置顶
    isLocked?: boolean;           // 是否锁定
    tags?: string[];              // 标签列表
}