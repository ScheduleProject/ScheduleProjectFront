import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import Contatos from './Pages/Contatos/App';
import Formularios from './Pages/Formularios/App';
import Contato from './Pages/Contato/App';
import Login from './Pages/Login/App'

const Pagina404 = () => (<div><h1>Página 404</h1></div>);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/contact/:user" component={Contatos} exact/>
            <Route path="/create/:user" component={Formularios} exact />
            <Route path="/edit/:user/:id" component={Formularios} exact />
            <Route path="/view/:user/:id" component={Contato} exact />
            <Route component={Pagina404} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);