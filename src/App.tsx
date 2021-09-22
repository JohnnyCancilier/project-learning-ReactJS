import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvinder } from './contexts/AuthContext'
import { Room } from './pages/Room';

function App() {

  return(
    <BrowserRouter>
      <AuthContextProvinder>
        <Switch>
          <Route  path="/" exact component={Home} />
          <Route  path="/rooms/new" component={NewRoom} />
          <Route  path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvinder>
    </BrowserRouter>
  )
}

export default App;