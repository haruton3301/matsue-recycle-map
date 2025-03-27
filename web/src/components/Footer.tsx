import { FaGithub } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

export const Footer = () => (
  <footer className="py-4 bg-slate-600">
    <div className="mb-3 text-center text-white text-sm">
      情報は
      <a
        href="https://www.city.matsue.lg.jp/soshikikarasagasu/kankyoenergybu_recycletoshisuishinka/5/2/1/2817.html"
        target="_blank"
        className="underline"
      >
        松江市のWebサイト
      </a>
      から取得しています。
    </div>
    <div className="mb-3 text-center text-white text-sm">
      Developed by
      <a
        href="https://github.com/haruton3301"
        target="_blank"
        className="pl-2 underline"
      >
        haruton3301
      </a>
    </div>
    <div className="flex items-center justify-center gap-5 max-w-4xl mx-auto">
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
