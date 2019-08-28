import axios from 'axios';
import Util from '../util';
import Card from '../components/Item';
import React, { Component } from 'react';

class Home extends Component {
    state = {
        rawData: [],
        renderElement: ''
    }

    componentWillMount = () => {
        window.scroll(0, 0);

        if (!localStorage.getItem('sessionToken')) {
            Util.History.push(`${process.env.PUBLIC_URL}/login`);
        }
        else {
            this.props.handlers.loadingHandler(true, () => {
                this.getData(() => {
                    this.renderElementHandler();
                });
            });
        }
    }

    getData = (callback) => {
        let self = this;

        const url = '';
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.get(url, config)
            .then(response => {
                if (response.data.length > 0) {
                    self.setState({ rawData: response.data });

                    if (callback) {
                        callback();
                    }
                }
                else {
                    let renderElement = (
                        <li className="home--error">

                            <div className="home--error--img"></div>

                            <p className="home--error--text">
                                Não há dragões para serem listados, adicione um clicando <a href="/create">aqui</a>.
                        </p>

                        </li>
                    );

                    this.setState({ renderElement: renderElement }, () => {
                        this.props.handlers.loadingHandler(false);
                    });
                }
            })
            .catch(error => {
                let renderElement = (
                    <li className="home--error">

                        <div className="home--error--img"></div>

                        <p className="home--error--text">
                            Falha ao baixar os dados, recarregue a página e tente novamente!
                    </p>

                    </li>
                );

                self.setState({ renderElement: renderElement }, () => {
                    self.props.handlers.loadingHandler(false);
                });
            });
    }

    renderElementHandler = () => {
        let renderElement = [];
        this.state.rawData.sort((one, two) => (one.name > two.name) ? 1 : -1);

        renderElement.push(
            this.state.rawData.map(
                (data, index) => {
                    return (
                        <Card
                            id={data.id}
                            name={data.name}
                            type={data.type}
                            createdAt={data.createdAt}
                            handlers={this.props.handlers}
                            key={"item-id-" + data.id + '-name-' + data.name}
                            updateData={() => {
                                this.getData(() => {
                                    this.renderElementHandler();
                                });
                            }}
                        />
                    );
                }
            )
        );

        this.setState({ renderElement: renderElement }, () => {
            this.props.handlers.loadingHandler(false);
        });
    }

    render() {
        return (
            <ul className="home">

                {this.state.renderElement}

            </ul>
        );
    }
}

export default Home;