import { inter, lusitana } from '@/assets/Fonts';
import {
  SessionProvider,
  ThemeProvider,
  TooltipProvider,
} from '@/components/providers';
import { Toaster } from '@/components/shadcn/ui/sonner';
import { auth } from '@/data/auth';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Lyovson.com',
  description: 'The official website of Mr and Mrs Lyovsons.',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`relative h-full overflow-hidden ${inter.variable} ${lusitana.variable} `}
    >
      <body
        className={`h-full overflow-auto relative  font-inter min-w-[375px]`}
      >
        <SessionProvider session={session} basePath={'/bridge/auth'}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              <Toaster visibleToasts={1} position="top-right" />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
