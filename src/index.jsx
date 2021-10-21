import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import Contatos from './Pages/Contatos/App';
import Formularios from './Pages/Formularios/App';
import Contato from './Pages/Contato/App';

const Pagina404 = () => (<div><h1>Página 404</h1></div>);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Contatos} exact/>
            <Route path="/create" component={Formularios} exact />
            <Route path="/edit/:id" component={Formularios} exact />
            <Route path="/view/:id" component={Contato} exact />
            <Route component={Pagina404} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);