interface Statistics {
  like: number;
  dislike: number;
  replies: number;
}

export interface OpenUserInfo {
  uid: string;
  username: string;
  nickname: string;
  avatar: string;
}

export interface MediaItem {
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface CommentItem {
  id: string;
  contentId: string;
  rootId: string;
  parentId: string;
  comment: string;
  media: string[];
  top: boolean;
  statistics: Statistics;
  authorId: string;
  userInfo: OpenUserInfo;
  parentUserInfo: OpenUserInfo;
  createTime: number;
  replyTime: number;
}

export interface CommentDataItem {
  comment: CommentItem;
  replies: CommentItem[];
  replyCount: number;
}
