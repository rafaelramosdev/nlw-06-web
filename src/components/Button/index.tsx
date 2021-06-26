import { ButtonHTMLAttributes } from 'react';

import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const { theme } = useTheme();
  return (
    <button
      type="button"
      className={`button ${theme === 'dark' ? 'dark' : ''} ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  );
}
