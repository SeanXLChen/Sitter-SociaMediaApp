'use client'

import usePosts from "@/app/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  // if data is not provided, it will default to an empty array
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem
          key={post.id}
          userId={userId}
          data={post}
        />
      ))}
    </>
  )
}

export default PostFeed