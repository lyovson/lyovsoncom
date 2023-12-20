import { prisma } from "@/app/lib/db.js";
import Image from "next/image";

const Page = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: true,
    },
  });

  return (
    <article className="flex flex-col w-full max-w-screen-lg gap-4 p-4 mx-auto my-4 rounded-lg shadow-lg ">
      <h1 className="mb-4 text-5xl font-bold text-center ">{post.title}</h1>
      <aside className="flex items-center justify-between gap-4 mb-4">
        <p className="text-lg font-medium ">{post.author.name}</p>
        <p className="text-sm ">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </aside>
      <div className="flex justify-center">
        <Image
          src={post.featuredImg}
          alt={post.title}
          width="400"
          height="400"
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="container mt-4 text-lg leading-relaxed ">
        {post.content}
      </div>
    </article>
  );
};

export default Page;
