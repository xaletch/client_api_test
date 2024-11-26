export type ButtonProps = {
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  cl?: string;
  onClick?: () => void;
}