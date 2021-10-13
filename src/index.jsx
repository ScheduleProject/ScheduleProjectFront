import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import Contatos from './Pages/Contatos/App';
import Formularios from './Pages/Formularios/App';

const Pagina404 = () => (<div><h1>Página 404</h1></div>);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Contatos} exact/>
            <Route path="/form" component={Formularios} exact />
            <Route component={Pagina404} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);