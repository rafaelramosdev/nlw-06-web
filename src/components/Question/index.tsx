import { ReactNode } from 'react';

import cx from 'classnames';

import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cx(
        'question',
        {dark: theme === 'dark'},
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}
    >
      <p>{content}</p>

      <footer>
        <div className={`user-info ${theme === 'dark' ? 'dark' : ''}`}>
          <img src={author.avatar} alt={author.name} />

          <span>{author.name}</span>
        </div>

        <div className={`${theme === 'dark' ? 'dark' : ''}`}>{children}</div>
      </footer>
    </div>
  );
}
