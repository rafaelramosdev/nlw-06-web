import { ReactNode } from 'react';

import ModalComponent from 'react-modal';

import { useTheme } from '../../hooks/useTheme';

import './styles.scss';

type ModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  children: ReactNode;
};

ModalComponent.setAppElement('#root');

export function Modal({ isOpened, closeModal, children }: ModalProps) {
  const { theme } = useTheme();

  return (
    <ModalComponent
      className={`modal ${theme === 'dark' ? 'dark' : ''}`}
      overlayClassName="overlay-modal"
      isOpen={isOpened}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Example Modal"
    >
      {children}
    </ModalComponent>
  );
}
