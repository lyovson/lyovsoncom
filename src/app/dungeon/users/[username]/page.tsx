import { db } from "@/data/db";
import { users } from "@/data/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { redirect } from "next/navigation";
import UserForm from "../../ui/user-form";

const Page = async ({ params }: { params: any }) => {
  const { username } = params;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    redirect("/dungeon/users");
  }

  const userUpdate = async (formData: FormData) => {
    "use server";
    const schema = createInsertSchema(users, {});
    const data = Object.fromEntries(formData);
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      console.log("Validation error", parsedData.error.issues);
      return;
    }
    await db.update(users).set(data).where(eq(users.username, username));
    redirect("/dungeon/users/" + username);
  };

  return (
    <article className="flex flex-col w-full max-w-screen-lg gap-4 p-4 mx-auto my-4 rounded-lg shadow-lg">
      <h1>{user.name}</h1>
      <UserForm action={userUpdate} user={user} />
    </article>
  );
};

export default Page;
