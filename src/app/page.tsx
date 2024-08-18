import Image from "next/image";
import Header from "@/app/components/Header";
import Link from "next/link";
import Form from "@/app/components/Form";
import PostFeed from "./components/post/PostFeed";



export default function Home() {
  return (
    <>
      <Header label="Home" showBackArrow={true} />
      <Form placeholder="What's happening?" />
      <PostFeed  />
    </>
  );
}
