import { PostFull } from '@/data/types';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Category, Tag } from '@/data/schema';

export const PostHeader = async ({ post }: { post: PostFull }) => {
  return (
    <header className="flex flex-col lg:flex-row gap-8 p-6 bg-gradient-to-r from-[#f0f0f0] to-[#e0e0e0] dark:from-[#1c1c1e] dark:to-[#121212] rounded-xl shadow-xl ">
      {/* Featured Image */}
      <section className="flex justify-center w-full lg:w-1/2 shadow-md  hover:shadow-lg">
        <Image
          src={post.featuredImage?.url || '/placeholder-image.jpg'}
          alt={post.featuredImage?.altText || 'Featured image'}
          width={600}
          height={600}
          className="rounded-lg shadow-lg object-cover w-full h-auto max-h-96 lg:max-h-full "
          priority
          placeholder="blur"
          blurDataURL="/placeholder-image.jpg"
        />
      </section>

      {/* Post Details */}
      <section className="flex flex-col gap-6 lg:w-1/2 p-6 bg-[#f5f5f5] dark:bg-[#1a1a1c] rounded-lg shadow-md hover:shadow-lg">
        {/* Post Title */}
        <h1 className="text-2xl font-bold text-center lg:text-left leading-tight text-gray-800 dark:text-white">
          {post.title}
        </h1>

        {/* Author, Date, and Categories */}
        <aside className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
          {/* Author */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <User className="text-primary w-5 h-5" />
            <p className="text-lg">
              <span className="text-sm">by </span>
              <Link href={{ pathname: `/${post.author!.username}` }}>
                <span className="font-medium text-gray-800 dark:text-white">
                  {post.author!.name}
                </span>
              </Link>
            </p>
          </div>
          {/* Date */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Calendar className="text-primary w-5 h-5" />
            <p className="text-lg">
              <span className="text-sm">on </span>
              <span className="text-gray-800 dark:text-white">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>

          {/* Categories */}
          <section className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {post.categories!.map((category: Category) => (
              <Link
                className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                key={category.id}
                href={{ pathname: `/categories/${category.slug}` }}
              >
                {`@${category.name}`}
              </Link>
            ))}
          </section>
        </aside>

        {/* Tags */}
        <section className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {post.tags!.map((tag: Tag) => (
            <Link
              className={`py-1 px-4 rounded-full text-sm font-semibold text-gray-800 dark:text-gray-100 bg-yellow-200 dark:bg-yellow-700 hover:bg-yellow-300 dark:hover:bg-yellow-600 transition-colors shadow-md`}
              key={tag.id}
              href={{ pathname: `/tags/${tag.slug}` }}
            >
              {`#${tag.name}`}
            </Link>
          ))}
        </section>
      </section>
    </header>
  );
};
