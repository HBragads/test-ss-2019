import axios from 'axios';
import Util from '../util';
import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

        const url = '...';
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.get(url, config)
            .then(response => {
                self.setState({ rawData: response.data.data });

                if (callback) {
                    callback();
                }
            })
            .catch(error => {
                self.props.handlers.loadingHandler(false, () => {
                    self.props.handlers.notifyHandler('error', 'Erro:', ' Ao buscar os dados. ', () => {
                        localStorage.clear();
                        Util.History.push(`${process.env.PUBLIC_URL}/login`);
                    });
                });
            });
    }

    renderElementHandler = () => {
        let renderElement = [];

        renderElement.push(
            this.state.map(
                (data, index) => {
                    return (
                        <li
                            key={"element-" + index}
                        >
                            {data}
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

                <Header />

                {this.state.renderElement}

                <Footer />

            </section>
        );
    }
}

export default Home;