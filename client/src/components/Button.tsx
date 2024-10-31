import { ReactNode } from "react"

const Button = ({children, click}: { children: ReactNode, click?: () => void}) => {
  return (
    <button className="py-2 px-4 text-center rounded-md bg-primary text-fourth text-lg" onClick={click}>
      {children}
    </button>
  )
}

export default Button