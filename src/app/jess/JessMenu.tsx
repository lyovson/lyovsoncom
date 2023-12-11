import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import JessSocials from "./JessSocials"; // Import JessSocials component

const JessMenu = ({ windowWidth }: { windowWidth: number }) => {
  return (
    <motion.aside
      className={`fixed top-20 h-full overflow-auto z-10 bg-gradient-to-b from-jess to-dark left-0  flex flex-col items-center gap-5 text-light`}
      initial={{ width: "0%", opacity: 0 }}
      animate={{ width: windowWidth > 992 ? "400px" : "100%", opacity: 1 }}
      exit={{ width: "0%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        className="w-[200px]  rounded-sm  "
        alt="jess"
        src="/jess.png"
        width={400}
        height={400}
      />
      <Link className=" text-3xl" href="/jess">
        Jess Lyovson
      </Link>
      <JessSocials />
      <ul className="text-2xl list-none">
        <Link href="/jess/bio">
          <li className="flex gap-2 items-center py-4">
            <div className="w-10 h-10">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </div>
            Bio
          </li>
        </Link>
        <Link href="/jess/portfolio">
          <li className="flex gap-2 items-center py-4">
            <div className="w-10 h-10">
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </div>
            Portfolio
          </li>
        </Link>
        <li className="flex gap-2 items-center py-4">
          <div className="w-10 h-10">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </div>
          Contact
        </li>
        <li className="flex gap-2 items-center py-4">
          <div className="w-10 h-10">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </div>
          Project 1
        </li>
        <li className="flex gap-2 items-center py-4">
          <div className="w-10 h-10">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </div>
          Project 2
        </li>
      </ul>
    </motion.aside>
  );
};

export default JessMenu;
