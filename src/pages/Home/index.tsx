import { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './styles.scss';

export function Home() {
  const [ roomKey, setRoomKey ] = useState('');

  const { user, signInWithGoogle } = useAuth();

  const history = useHistory();

  async function handleCreateRoom() {
    if (!user)
      await signInWithGoogle();
    
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomKey.trim() === '')
      return;

    const roomRef = await database.ref(`rooms/${roomKey}`).get();

    if(!roomRef.exists()) {
      toast.error('Room does not exists.');
      return;
    }

    if(roomRef.val().closedAt) {
      toast.error('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomKey}`)
  }

  return (
    <div id="page-auth" >
      <Helmet>
        <title>Bem-vindo(a) | Letmeask</title>
      </Helmet>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        
        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content" >
          <img src={logoImg} alt="Logo do Letmeask" />

          <button onClick={handleCreateRoom} className="create-room" >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          
          <div className="separator" >ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomKey(event.target.value)}
              value={roomKey}
            />

            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}