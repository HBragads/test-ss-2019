import axios from 'axios';
import Util from '../util.js';
import InputMask from 'react-input-mask';
import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    componentWillMount = () => {
        window.scroll(0, 0);

        if (localStorage.getItem('sessionToken')) {
            Util.History.push(`${process.env.PUBLIC_URL}/home`);
        }
        else {
            this.props.handlers.loadingHandler(false);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        document.getElementById('email-input').blur();

        let email = this.state.email;
        let password = this.state.password;

        if (Util.validateEmail(email) || password.length >= 4) {
            this.props.handlers.loadingHandler(true, () => {
                this.loginAction();
            });
        }
        else {
            this.props.handlers.notifyHandler('warn', 'Atenção:', ' Credenciais, inválidas. ');
        }
    }

    loginAction = () => {
        let self = this;
        let params = {};

        const url = '...';
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (true) {
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('sessionToken', 'true');

            Util.History.push(`${process.env.PUBLIC_URL}/home`);
        }
        else {
            axios.post(url, params, config)
                .then(response => {
                    localStorage.setItem('email', this.state.email);
                    localStorage.setItem('sessionToken', response.data.token);

                    Util.History.push(`${process.env.PUBLIC_URL}/home`);
                })
                .catch(error => {
                    self.props.handlers.loadingHandler(false, () => {
                        self.props.handlers.notifyHandler('error', 'Erro:', ' Ao efetuar o login, por favor tente novamente! ');
                    });
                });
        }
    }

    render() {
        return (
            <section className="login">

                <section className="login--content">

                    <header className="login--header">

                        <div
                            className="login--header--logo"
                            src={`${process.env.PUBLIC_URL}/images/logo.png`}
                        >
                        </div>

                        <h1 className="login--header--title">Login</h1>

                    </header>

                    <form
                        className="login--content--form"
                        onSubmit={(event) => {
                            this.submitHandler(event);
                        }}>

                        <InputMask
                            mask=""
                            type="text"
                            maskChar=" "
                            id="email-input"
                            placeholder="user / e-mail"
                            className="login--content--form--input"
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}
                        />

                        <InputMask
                            maskChar=" "
                            type="password"
                            id="password-input"
                            placeholder="senha"
                            className="login--content--form--input"
                            onChange={(event) => {
                                this.setState({
                                    password: event.target.value
                                });
                            }}
                        />

                        <input
                            type="submit"
                            value="enviar"
                            className="login--content--form--button"
                            onClick={(event) => {
                                this.submitHandler(event);
                            }}
                        />

                    </form>

                </section>

            </section>
        );
    }
}

export default Login;