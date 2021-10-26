import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import Contatos from './Pages/Contatos/App';
import Formularios from './Pages/Formularios/App';
import Contato from './Pages/Contato/App';
import Login from './Pages/Login/App'
import NewUser from './Pages/NewUser/App'

const Pagina404 = () => (<div><h1>Página 404</h1></div>);

function CustomRoute({ isPrivate, ...rest}) {

    if(isPrivate && !localStorage.getItem("token")){
        return <Redirect to="/"/>;
    }

    return <Route {...rest}/>;
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <CustomRoute path="/" component={Login} exact/>
            <CustomRoute path="/newUser" component={NewUser} exact/>
            <CustomRoute path="/contact/:user" component={Contatos} exact isPrivate/>
            <CustomRoute path="/create/:user" component={Formularios} exact isPrivate/>
            <CustomRoute path="/edit/:user/:id" component={Formularios} exact isPrivate/>
            <CustomRoute path="/view/:user/:id" component={Contato} exact isPrivate/>
            <CustomRoute component={Pagina404} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);