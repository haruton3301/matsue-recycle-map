import { FaRecycle } from "react-icons/fa"

export const Header = () => (
  <header className="shadow-md">
    <div className="flex items-center max-w-4xl h-14 mx-auto">
      <h1 className="flex items-center gap-3 text-slate-800 text-lg font-semibold">
        <FaRecycle size={28} />
        松江リサイクルマップ
      </h1>
    </div>
  </header>
)
