"use client";

import { UserModeContext } from "@/app/(tower)/lib/UserModeProvider.js";
import { ImageButton } from "@/app/(tower)/ui/ImageButton";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { user, setUser } = useContext(UserModeContext);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 border-b-4 bg-light dark:bg-dark border-dark dark:border-light">
      <ImageButton src="/jess.png" handleImageClick={() => setUser("Jess")} />
      <section className="flex items-baseline gap-4">
        <Link href="/">
          <h1 onClick={() => setUser("Both")} className="mb-2 text-4xl ">
            Lyovson.com
          </h1>
          <div className="h-2 w-[100%] mx-auto rounded-lg bg-gradient-to-r from-jess to-rafa"></div>
        </Link>
      </section>

      <ImageButton src="/rafa.png" handleImageClick={() => setUser("Rafa")} />
    </header>
  );
};

export default Header;
