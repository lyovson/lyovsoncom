import { createPost } from "@/app/dungeon/lib/postActions";
import UploadForm from "@/app/dungeon/ui/postForm/imageForm/UploadForm";
import Button from "@/app/ui/Button";
import ContentForm from "../ui/postForm/ContentForm";
import TitleForm from "../ui/postForm/TitleForm";

const Page = async () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col p-10 space-y-6 border shadow-md border-dark dark:border-light w-96">
        <h1 className="text-2xl font-bold text-center">Create Post</h1>
        {/* @ts-ignore */}
        <form action={createPost} className="flex flex-col space-y-4">
          <TitleForm />
          <ContentForm />
          <UploadForm />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default Page;