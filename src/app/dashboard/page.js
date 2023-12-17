import DashHeader from "@/app/dashboard/ui/DashHeader";
import { auth } from "@/app/lib/auth.js";
import { redirect } from "next/navigation";
import { prisma } from "../lib/db.js";
import DashTable from "./ui/DashTable.js";

const Page = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? "",
    },
  });

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <main>
      <DashHeader user={user} />
      <DashTable posts={posts} />
    </main>
  );
};

export default Page;
