import logo from './logo.svg';
import './App.css';
import Header from './containers/header';
import Home from './containers/home';
import Agenda from './containers/agenda';
import Login from './containers/user/login';
import Logout from './containers/user/logout';
import Register from './containers/user/register';
import Forgot from './containers/user/forgot';
import AddProspect from './containers/prospect/addProspect';
import EditProspect from './containers/prospect/editProspect';
import DetailProspect from './containers/prospect/detailProspect';
import Follow from './containers/follow';
import Stat from './containers/stat';
import RequireAuth from './helpers/require-auth';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={RequireAuth(Home, true)} />
        <Route exact path="/agenda" component={RequireAuth(Agenda, true)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/follow" component={RequireAuth(Follow, true)} />
        <Route exact path="/stat" component={RequireAuth(Stat, true)} />
        <Route exact path="/addProspect" component={RequireAuth(AddProspect, true)} />
        <Route exact path="/editProspect/:id" component={RequireAuth(EditProspect, true)} />
        <Route exact path="/detail/:id" component={RequireAuth(DetailProspect, true)} />
      </Switch>
    </div>
  );
}

export default App;
