import axios from 'axios';
import Util from '../util';
import ReactMoment from 'react-moment';
import React, { Component } from 'react';

class Details extends Component {
    state = {
        rawData: [],
        renderElement: ''
    }

    componentWillMount = () => {
        window.scroll(0, 0);
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");


        if (!localStorage.getItem('sessionToken')) {
            Util.History.push(`${process.env.PUBLIC_URL}/login`);
        }
        else if (!id) {
            this.errorHandler();
        }
        else {
            this.props.handlers.loadingHandler(true, () => {
                this.getData(id, () => {
                    this.renderElementHandler();
                });
            });
        }
    }

    errorHandler = () => {
        this.props.handlers.notifyHandler('error', 'Erro:', 'Código do dragão inválido. ', () => {
            Util.History.push(`${process.env.PUBLIC_URL}/home`);
        });
    }

    getData = (id, callback) => {
        let self = this;

        const url = '/' + id;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.get(url, config)
            .then(response => {
                self.setState({ rawData: response.data });

                if (callback) {
                    callback();
                }

            })
            .catch(error => {
                self.errorHandler();
            });
    }

    renderElementHandler = () => {
        let renderElement = (
            <div className="details--card">

                <h2> Nome: <span> {this.state.rawData.name} </span> </h2>

                <p> Criado em: <span> <ReactMoment date={this.state.rawData.createdAt} format={'DD/MM/YYYY'} /> </span> </p>

                <p> Tipo: <span> {this.state.rawData.type} </span> </p>

            </div>
        );

        this.setState({ renderElement: renderElement }, () => {
            this.props.handlers.loadingHandler(false);
        });
    }

    render() {
        return (
            <section className="details">

                {this.state.renderElement}

            </section>
        );
    }
}

export default Details;