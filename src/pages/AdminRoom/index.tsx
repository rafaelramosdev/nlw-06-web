import { useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import Modal from 'react-modal';

import toast, { Toaster } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

import { database } from '../../services/firebase';

import { useRoom } from '../../hooks/useRoom';
// import { useAuth } from '../../hooks/useAuth';

import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import './styles.scss';

type RoomParams = {
  id: string;
}

Modal.setAppElement('#root');

export function AdminRoom() {
  const [ isOpened, setIsOpened ] = useState(false);
  const [ questionId, setQuestionId ] = useState('');

  const params = useParams<RoomParams>();
  
  const roomId = params.id;
  
  const { questions, title } = useRoom(roomId);
  
  // const { user } = useAuth();

  const history = useHistory();

  function openModal(questionId: string) {
    setIsOpened(true);
    setQuestionId(questionId)
  }

  function closeModal() {
    setIsOpened(false);
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    toast.success('Room successfully closed!');

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    setIsOpened(false);

    toast.success('Question successfully deleted!')
  }

  return (
    <>
      <Helmet>
        <title>Sala {title} | Letmeask</title>
      </Helmet>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Modal
        className="modal"
        overlayClassName="overlay-modal"
        isOpen={isOpened}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <h1>Excluir pergunta</h1>

        <span>Tem certeza que você deseja excluir esta pergunta?</span>
        
        <div>
          <button
            className="cancel-button"
            type="button"
            onClick={() => closeModal()}
          >
            Cancelar
          </button>

          <button
           className="confirm-button"
            type="button"
            onClick={() => handleDeleteQuestion(questionId)}
          >
            Sim, excluir
          </button>
        </div>
      </Modal>
        
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="Logo do Letmeask" />

            <div>
              <RoomCode code={roomId} />

              <Button 
                isOutlined 
                onClick={handleEndRoom}
              >
                Encerrar sala
              </Button>
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>

            {questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}
          </div>

          <div className="question-list">
            {questions.map(question => {
              return (
                <Question 
                  key={question.id}
                  content={question.content} 
                  author={question.author} 
                >
                  <button
                    type="button"
                    onClick={() => openModal(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
            })}
          </div>
        </main>
      </div>
    </>
  );
}