export type InputProps = {
  type: string
  name: string;
  value: string;
  placeholder: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};