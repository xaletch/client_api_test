import { ButtonProps } from "../types"
import './style.css';

export const Button = ({ children, type, cl, onClick }: ButtonProps) => {
  return (
    <button className={`${cl} button`} type={type} onClick={onClick}>{children}</button>
  )
}
