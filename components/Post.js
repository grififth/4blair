import timeDiff from "../utils/globalFunctions";

export default function Post({ post }) {
    return (
        <div
            className="flex flex-row justify-between"
            onClick={() => {
                Router.push(`/posts/${post.id}`);
            }}
        >
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="w-1/5 h-full grid grid-cols-3 items-center justify-items-center">
                <p className="col-span-1">a</p>
                <p className="col-span-1">a</p>
                <p className="col-span-1 text-sm">{timeDiff(Date.parse(post.updatedAt))}</p>
            </div>
        </div>
    );
}
