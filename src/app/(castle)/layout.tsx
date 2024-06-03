import { Footer } from "./ui/footer";
import { Header } from "./ui/header";
import { Main } from "./ui/main";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col justify-between">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </section>
  );
}
