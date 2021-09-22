import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../componentes/Button';
import illustrationImg from '../assets/imagens/illustration.svg';
import logoImg from '../assets/imagens/logo.svg';
import googleIconImg from '../assets/imagens/google-icon.svg';
import '../styles/auth.scss';


export function Home(){
    const history = useHistory();
    const { user, singInWithGoogle } = useAuth();

    async function handleCreateRoom(){
        if(!user){
            await singInWithGoogle()
        }
        history.push('/rooms/new')
    }


    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e resposatas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}