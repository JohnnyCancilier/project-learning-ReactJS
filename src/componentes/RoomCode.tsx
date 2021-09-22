import copyImg from '../assets/imagens/copy.svg';
import '../styles/room-code.scss';

export function RoomCode(){
    return(
        <button>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #1238123767123</span>
        </button>
    );
}