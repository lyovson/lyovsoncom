"use client";

import Card from "@/components/Card";
import { PostWithUser } from "@/lib/getAllPosts";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({ postWithUser }: { postWithUser: PostWithUser }) => {
  console.log(postWithUser);
  const { post, user } = postWithUser;
  return (
    <Card>
      <Link href={`/posts/${post.slug}`}>
        <Image
          className="absolute object-cover w-full h-full"
          src={post.featuredImg || "/images/placeholder.png"}
          alt={post.title + " featured image"}
          width="400"
          height="400"
        />
        <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black to-transparent"></div>
        <header className="absolute bottom-0 w-full p-4 bg-transparent text-light ">
          <h2 className="text-lg font-bold capitalize">{post.title}</h2>
          <p>{user?.name}</p>
        </header>
      </Link>
    </Card>
  );
};

export default PostCard;
