import toast, { Toaster } from 'react-hot-toast';

import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);

    toast.success('Successfully copied!');
  }

  return (
    <>
      <Toaster
          position="top-center"
          reverseOrder={false}
      />

      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copiar código da sala" />
        </div>

        <span>Sala #{props.code}</span>
      </button>
    </>
  )
}