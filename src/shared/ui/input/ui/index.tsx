import { InputProps } from "../types"
import './style.css'

export const Input = ({ type, name, value, placeholder, onChange, error  }: InputProps) => {
  return (
    <>
      <input 
        className={`input ${error ? 'input-error' : ''}`}
        type={type} 
        name={name} 
        value={value} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)} 
        placeholder={placeholder} 
      />
    </>
  )
}
