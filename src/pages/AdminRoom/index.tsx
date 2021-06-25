import { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

import { FaSun, FaMoon } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { database } from '../../services/firebase';

import { useRoom } from '../../hooks/useRoom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

import { Modal } from '../../components/Modal';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import './styles.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const [ isOpenedModalQuestion, setIsOpenedModalQuestion ] = useState(false);
  const [ isOpenedModalRoom, setIsOpenedModalRoom ] = useState(false);
  const [ questionId, setQuestionId ] = useState('');

  const params = useParams<RoomParams>();
  
  const roomId = params.id;
  
  const { questions, title, authorIdRoom } = useRoom(roomId);
  
  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const history = useHistory();

  useEffect(() => {
    if(authorIdRoom.trim() !== ''){
      if (user?.id !== authorIdRoom){
        toast('Ops, you are not the room admin.', {
          duration: 4000,
          icon: '😬'
        })
        
        history.push(`/rooms/${roomId}`)
      }
    }
  }, [authorIdRoom, history, roomId, user?.id]);

  function openModalQuestion(questionId: string) {
    setIsOpenedModalQuestion(true);
    setQuestionId(questionId)
  }

  function openModalRoom() {
    setIsOpenedModalRoom(true);
  }

  function closeModalQuestion() {
    setIsOpenedModalQuestion(false);
  }

  function closeModalRoom() {
    setIsOpenedModalRoom(false);
  }

  async function handleEndRoom(roomId: string) {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    setIsOpenedModalRoom(false);

    toast.success('Room successfully closed!');

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    setIsOpenedModalQuestion(false);

    toast.success('Question successfully deleted!')
  }

  async function handleCheckQuestionsAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  function handleLogout() {
    history.push('/');
  }

  return (
    <>
      <Helmet>
        <title>Sala {title} | Letmeask</title>
      </Helmet>
      
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <Modal
        isOpened={isOpenedModalQuestion}
        closeModal={closeModalQuestion}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <h1>Excluir pergunta</h1>

        <span>Tem certeza que você deseja excluir esta pergunta?</span>
        
        <div>
          <button
            className="cancel-button"
            type="button"
            onClick={() => closeModalQuestion()}
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

      <Modal
        isOpened={isOpenedModalRoom}
        closeModal={closeModalRoom}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.6598 18.3398L18.3398 29.6598" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M29.6598 29.6598L18.3398 18.3398" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <h1>Encerrar sala</h1>

        <span>Tem certeza que você deseja encerrar esta sala?</span>
        
        <div>
          <button
            className="cancel-button"
            type="button"
            onClick={() => closeModalRoom()}
          >
            Cancelar
          </button>

          <button
           className="confirm-button"
            type="button"
            onClick={() => handleEndRoom(roomId)}
          >
            Sim, encerrar
          </button>
        </div>
      </Modal>
        
      <div id="page-admin-room">        
        <header>
          <div className="content">
            <img src={logoImg} alt="Logo do Letmeask" />

            <div>
              <RoomCode code={roomId} />

              <Button 
                isOutlined 
                onClick={() => openModalRoom()}
              >
                Encerrar sala
              </Button>

              <div>
                <button 
                  className="toggle-theme"
                  type="button"
                  aria-label={theme === 'light' ? 'Mudar para o modo escuro' : 'Mudar para o modo claro'}
                  onClick={() => toggleTheme()}
                >            
                  {theme === 'light' ? (
                    <FaMoon size={24} color="#ffffff" />
                  ) : (
                    <FaSun size={24} color="#ffffff" />
                  )}
                </button>

                <button 
                  className="logout-button"
                  type="button"
                  aria-label="Sair da sala"
                  onClick={() => handleLogout()}
                >            
                  <FiLogOut size={24} color="#ffffff" />
                </button>
              </div>
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
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionsAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => openModalQuestion(question.id)}
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