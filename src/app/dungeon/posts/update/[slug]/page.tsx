import { PostForm } from '@/app/dungeon/ui/post-form';
import { postUpdateAction } from '@/lib/actions/server-actions/post/post-update-action';
import { redirect } from 'next/navigation';
import { postSelectFullOneBySlug } from '@/lib/actions/db-actions/post/post-select-full-one';

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  if (!slug) {
    redirect('/dungeon');
  }

  const result = await postSelectFullOneBySlug({ slug });

  if (!result.success || !result.post) {
    redirect('/dungeon/posts');
  }

  return (
    <main className=" mx-auto">
      <div className="flex flex-col p-10 space-y-6 border   ">
        <h1 className="text-2xl font-bold text-center">Update Post</h1>
        <PostForm post={result.post} action={postUpdateAction} />
      </div>
    </main>
  );
};

export default Page;
