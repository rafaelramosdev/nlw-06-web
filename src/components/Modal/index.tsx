import { ReactNode } from 'react';

import ModalComponent from 'react-modal';

import './styles.scss';

type ModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  children: ReactNode;
}

ModalComponent.setAppElement('#root');

export function Modal({ isOpened, closeModal, children }: ModalProps) {
  return (
    <ModalComponent
      className="modal"
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