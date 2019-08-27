import axios from 'axios';
import Util from '../util';
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

        const url = '----';
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.get(url, config)
            .then(response => {
                self.setState({ rawData: response.data });

                console.log(response.data);

                if (callback) {
                    callback();
                }
            })
            .catch(error => {
                let renderElement = (
                    <div className="home--error">

                        <div className="home--error--img"></div>

                        <p className="home--error--text">
                            Falha ao baixar os dados, recarregue a página e tente novamente!
                    </p>

                    </div>
                );

                this.setState({ renderElement: renderElement }, () => {
                    this.props.handlers.loadingHandler(false);
                });
            });
    }

    renderElementHandler = () => {
        let renderElement = [];

        renderElement.push(
            this.state.rawData.map(
                (data, index) => {
                    return (
                        <li
                            key={"element-" + index}
                        >
                            {data.name}
                        </li>
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
            <section className="home">

                {this.state.renderElement}

            </section>
        );
    }
}

export default Home;