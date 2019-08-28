import axios from 'axios';
import Moment from 'moment';
import Util from '../util.js';
import React, { Component } from 'react';

class Create extends Component {
    state = {
        name: '',
        type: '',
    }

    componentWillMount = () => {
        window.scroll(0, 0);

        if (!localStorage.getItem('sessionToken')) {
            Util.History.push(`${process.env.PUBLIC_URL}/create`);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        document.getElementById('name-input').blur();
        document.getElementById('type-input').blur();

        if (this.state.name.length > 1 || this.state.type.length > 1) {
            this.props.handlers.loadingHandler(true, () => {
                this.createHandler();
            });
        }
        else {
            this.props.handlers.notifyHandler('warn', 'Atenção:', ' Informe todos os dados para cadastro. ');
        }
    }

    createHandler = () => {
        let self = this;
        let params = {
            histories: [],
            createdAt: Moment(),
            name: this.state.name,
            type: this.state.type
        };

        const url = '';
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.post(url, params, config)
            .then(response => {
                self.props.handlers.loadingHandler(false, () => {
                    self.props.handlers.notifyHandler('success', 'Successo:', ' Tudo certo ao criar o seu dragão. ', () => {
                        document.getElementById("create-form").reset();
                    });
                });
            })
            .catch(error => {
                self.props.handlers.loadingHandler(false, () => {
                    self.props.handlers.notifyHandler('error', 'Erro:', ' Ao criar seu dragão, por favor tente novamente! ');
                });
            });
    }

    render() {
        return (
            <section className="create">

                <section className="create--content">

                    <header className="create--header">

                        <div
                            className="create--header--logo"
                            src={`${process.env.PUBLIC_URL}/images/logo.png`}
                        >
                        </div>

                    </header>

                    <form
                        id="create-form"
                        className="create--content--form"
                        onSubmit={(event) => {
                            this.submitHandler(event);
                        }}>

                        <input
                            type="text"
                            name="name"
                            maxLength="20"
                            id="name-input"
                            placeholder="Nome"
                            defaultValue={this.state.name}
                            className="create--content--form--input"
                            onChange={(event) => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}
                        />

                        <input
                            type="text"
                            name="type"
                            maxLength="20"
                            id="type-input"
                            placeholder="Tipo"
                            defaultValue={this.state.type}
                            className="create--content--form--input"
                            onChange={(event) => {
                                this.setState({
                                    type: event.target.value
                                });
                            }}
                        />

                        <input
                            type="submit"
                            value="criar"
                            className="create--content--form--button"
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

export default Create;