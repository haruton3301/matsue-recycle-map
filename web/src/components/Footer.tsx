import { FaGithub } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

export const Footer = () => (
  <footer className="bg-slate-600">
    <div className="flex items-center justify-center gap-5 max-w-4xl h-11 mx-auto">
      <a
        href="https://github.com/haruton3301/matsue-recycle-map"
        target="_blank"
      >
        <FaGithub size={20} color="white" />
      </a>
      <a href="mailto:kduxwr@gmail.com">
        <IoMdMail size={22} color="white" />
      </a>
    </div>
  </footer>
)
