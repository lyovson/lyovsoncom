"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
};

const FooterNav = () => {
  return (
    <aside>
      <AuthButton />
    </aside>
  );
};

export default FooterNav;