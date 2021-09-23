import '../styles/room.scss';
import { useParams } from 'react-router-dom'
import { Button } from '../componentes/Button';
import { RoomCode } from '../componentes/RoomCode';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import logoImg from '../assets/imagens/logo.svg';

type FirebaseQuestion = Record<string,{
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswer: boolean;
    isHighlighted: boolean;
}

type RoomParms = {
    id: string;
}

export function Room(){
    const params = useParams<RoomParms>();
    const { user } = useAuth();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.once('value', room => {
            console.log(room.val())
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestion = databaseRoom.question ?? {};
            const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswer: value.isAnswered,
                }
            });
            console.log(parsedQuestions);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return
        }

        if(!user){
            throw Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author:{
                name: user?.name,
                avatar: user.avatar,
            },
            isAnswer: false,
            isHighlighted: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder="O que você quer perguntar?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
                        ) }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    );
}