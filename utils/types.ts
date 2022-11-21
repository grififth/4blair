type CommentType = {
    authorId: number;
    content: string;
    createdAt: string;
    id: number;
    postId: number;
    replyToContent: string;
    replyToId: number;
    likedBy: number[];
    dislikedBy: number[];
};

type PostType = {
    authorId: number;
    titel: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    likedBy: number[];
    dislikedBy: number[];
    isSaged: boolean;
    isVisile: boolean;
    commentsCount: number;
};

export type { CommentType, PostType };
