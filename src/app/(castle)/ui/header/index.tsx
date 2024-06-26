import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { users } from "@/data/users";
import { Menu } from "./user-menu";

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between h-24 px-4 border-b-4 bg-background ">
        <section>
          <Sheet>
            <SheetTrigger>
              <Avatar className="w-12 h-14" aria-label="Open Jess Menu">
                <AvatarImage src="/jess.png" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <Menu user={users["jess"]} />
          </Sheet>
        </section>
        <section>
          <Button asChild variant={"link"}>
            <Link href="/">
              <h1 className="mb-2 text-2xl lg:text-4xl ">Lyovson.com</h1>
            </Link>
          </Button>
        </section>
        <section>
          <Sheet>
            <SheetTrigger>
              <Avatar className="w-12 h-14" aria-label="Open Rafa Menu">
                <AvatarImage src="/rafa.png" />
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <Menu user={users["rafa"]} />
          </Sheet>
        </section>
      </header>
    </>
  );
};
