'use client'

import Form from "@/app/components/Form"
import Header from "@/app/components/Header"
import CommentFeed from "@/app/components/post/CommentFeed"
import PostItem from "@/app/components/post/PostItem"
import usePost from "@/app/hooks/usePost"
import { ClipLoader } from "react-spinners"

const Posts = ({ params, }: { params: { postId: string } }) => {
  const { data: fetchedPost, isLoading } = usePost(params.postId)

  if (isLoading || !fetchedPost) {
    return (
      <div className='
        flex
        justify-center
        items-center
        h-full
      '>
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={params.postId}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default Posts