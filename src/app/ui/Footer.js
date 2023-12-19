"use client";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext, WindowWidthContext } from "../Providers";
import FooterNav from "./FooterNav";

const Footer = () => {
  const { user, setUser } = useContext(UserContext);
  const { windowWidth } = useContext(WindowWidthContext);
  return (
    <motion.footer
      className="flex justify-around p-8 border-t-4 bg-light dark:bg-dark border-dark dark:border-light"
      layout
      animate={{
        marginRight: user === "Rafa" && windowWidth > 992 ? "400px" : "0px",
        marginLeft: user === "Jess" && windowWidth > 992 ? "400px" : "0px",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center mb-2">
        <p className="text-2xl">© 2023 Lyovson</p>
        <div className="h-2 w-[100%] mx-auto rounded-lg bg-gradient-to-r from-jess to-rafa"></div>
      </div>

      <FooterNav />
    </motion.footer>
  );
};

export default Footer;
