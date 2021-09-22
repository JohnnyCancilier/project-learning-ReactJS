import logoImg from '../assets/imagens/logo.svg'
import { Button } from '../componentes/Button';



export function Room(){
    return(
        <div id="page-Room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>codigo</div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form  className="form-footer">
                    <textarea 
                    placeholder="O que você quer perguntar?"
                    />

                    <div>
                        <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}