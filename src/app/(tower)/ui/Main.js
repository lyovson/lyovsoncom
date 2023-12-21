"use client";

import JessMenu from "@/app/(tower)/jess/JessMenu";
import { UserModeContext } from "@/app/(tower)/lib/UserModeProvider.js";
import { WindowWidthContext } from "@/app/(tower)/lib/WindowWidthProvider";
import RafaMenu from "@/app/(tower)/rafa/RafaMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { colors } from "tailwindcss/defaultTheme";

const Main = ({ children }) => {
  const { user, setUser } = useContext(UserModeContext);
  const { windowWidth } = useContext(WindowWidthContext);
  const { theme } = useTheme();

  return (
    <>
      <AnimatePresence>
        {user === "Jess" ? (
          <JessMenu setUser={setUser} key="jess" windowWidth={windowWidth} />
        ) : user === "Rafa" ? (
          <RafaMenu setUser={setUser} key="rafa" windowWidth={windowWidth} />
        ) : null}
      </AnimatePresence>
      <motion.main
        onClick={() => setUser("Both")}
        className="relative min-h-screen my-8 overflow-auto font-heading"
        layout
        initial={{
          backgroundColor: theme === "light" ? colors.light : colors.dark,
        }}
        animate={{
          backgroundColor: theme === "dark" ? colors.dark : colors.light,
          marginRight: user === "Rafa" && windowWidth > 992 ? "400px" : "0px",
          marginLeft: user === "Jess" && windowWidth > 992 ? "400px" : "0px",
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </>
  );
};

export default Main;
