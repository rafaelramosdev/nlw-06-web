import toast, { Toaster } from 'react-hot-toast';

import { useTheme } from '../../hooks/useTheme';

import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);

    if(theme === 'dark') {
      toast.success('Successfully copied!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.success('Successfully copied!');
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <button
        type="button"
        className={`room-code ${theme === 'dark' ? 'dark' : ''}`}
        onClick={copyRoomCodeToClipboard}
      >
        <div>
          <img src={copyImg} alt="Copiar código da sala" />
        </div>

        <span>Sala #{code}</span>
      </button>
    </>
  );
}
