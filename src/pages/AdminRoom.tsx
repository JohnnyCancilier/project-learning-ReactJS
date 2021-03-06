import '../styles/room.scss';
import '../styles/question.scss';
import logoImg from '../assets/imagens/logo.svg';
import checkImg from '../assets/imagens/check.svg'
import answerImg from '../assets/imagens/answer.svg'
import deleteImg from '../assets/imagens/delete.svg'
import { useHistory ,useParams } from 'react-router-dom'
import { Button } from '../componentes/Button';
import { RoomCode } from '../componentes/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { Question } from '../componentes/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Tem certeza que voçê deseja excluir está pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }

  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true, 
    })
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
    isHighlighted: true,
    })
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return(
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
                      onClick = {() =>handleCheckQuestionAsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar como pergunta respondida" />
                      </button>
                      <button
                      type="button"
                      onClick = {() =>handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta" />
                      </button>
                    </>
                  )}
                  <button
                  type="button"
                  onClick = {() =>handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}