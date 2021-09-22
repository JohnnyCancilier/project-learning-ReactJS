import { BrowserRouter, Route } from 'react-router-dom';
import {Home} from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvinder } from './contexts/AuthContext'

function App() {

  return(
    <BrowserRouter>
      <AuthContextProvinder>
        <Route  path="/" exact component={Home}/>
        <Route  path="/rooms/new" component={NewRoom}/>
      </AuthContextProvinder>
    </BrowserRouter>
  )
}

export default App;