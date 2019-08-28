import axios from 'axios';
import Util from '../util';
import Moment from 'moment';
import ReactMoment from 'react-moment';
import InputMask from 'react-input-mask';
import React, { Component } from 'react';
import { MdEdit as Edit } from 'react-icons/md';
import { MdSave as Save } from 'react-icons/md';
import { MdClose as Close } from 'react-icons/md';
import { MdDelete as Delete } from 'react-icons/md';
import { MdArrowForward as RightArrow } from 'react-icons/md';

class Item extends Component {
    state = {
        tempName: '',
        tempType: '',
        data: this.props,
        isEdition: false,
        tempCreatedAt: '',
        name: this.props.name,
        type: this.props.type,
        createdAt: new Date(this.props.createdAt)
    }

    componentWillMount = () => {
        Moment.suppressDeprecationWarnings = true;
    };

    editHandler = (event) => {
        event.preventDefault();
        document.getElementById('name-input').blur();
        document.getElementById('createdAt-input').blur();
        document.getElementById('type-input').blur();

        let self = this;
        let name = (
            this.state.tempName.length > 0 &&
                this.state.tempName !== this.state.name ?
                this.state.tempName :
                this.state.name
        );

        let type = (
            this.state.tempType.length > 0 &&
                this.state.tempType !== this.state.type ?
                this.state.tempType :
                this.state.type
        );

        let createdAt = (
            Moment(this.state.tempCreatedAt, 'DD/MM/YYYY').isValid() ?
                Moment(this.state.tempCreatedAt, 'DD/MM/YYYY').toDate() :
                Moment(this.state.createdAt, 'DD/MM/YYYY').isValid() ?
                    Moment(this.state.createdAt, 'DD/MM/YYYY').toDate() :
                    Moment()
        );

        let params = {
            name: name.toLowerCase(),
            type: type.toLowerCase(),
            createdAt: createdAt
        };

        const url = '/' + this.state.data.id;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.put(url, params, config)
            .then(response => {
                self.props.handlers.notifyHandler('success', 'Sucesso:', ' Dragão atualizado. ', () => {
                    this.setState({
                        name: name.toLowerCase(),
                        type: type.toLowerCase(),
                        isEdition: false,
                        createdAt: createdAt
                    });
                });
            })
            .catch(error => {
                self.props.handlers.notifyHandler('error', 'Erro:', ' Não foi possível atualizar o dragão, verifique os dados e tente novamente. ');
            });
    }

    isEditionHandler = () => {
        this.setState({
            isEdition: !this.state.isEdition
        });
    }

    detailsHandler = () => {
        Util.History.push(`${process.env.PUBLIC_URL}/details?id=${this.state.data.id}`);
    }

    deleteHandler = () => {
        let self = this;

        const url = '/' + this.state.data.id;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        axios.delete(url, {}, config)
            .then(response => {
                self.props.handlers.loadingHandler(true, () => {
                self.props.updateData();
                self.props.handlers.notifyHandler('success', 'Sucesso:', ' Dragão excluído. ');
            });
            })
            .catch(error => {
                self.props.handlers.loadingHandler(false, () => {
                self.props.handlers.notifyHandler('error', 'Erro:', ' Não foi possível excluir o dragão, tente novamente. ');
            });
        });
    }

    render = () => {
        return (
                    <li id={'item' + this.state.data.id} key={'item' + this.state.data.id} className="item">

                        {
                            this.state.isEdition ?
                                <React.Fragment>

                                    <Save className="item--icon item--save" onClick={(event) => { this.editHandler(event) }} />

                                    <Close className="item--icon item--close"
                                        onClick={
                                            () => {
                                                this.isEditionHandler();
                                            }
                                        }
                                    />

                                    <form onSubmit={(event) => { this.editHandler(event) }}>

                                        <h2> Nome:

                                            <input
                                                type="text"
                                                name="name"
                                                maxLength="20"
                                                id="name-input"
                                                defaultValue={this.state.name}
                                                onChange={(event) => {
                                                    this.setState({
                                                        tempName: event.target.value
                                                    });
                                                }}
                                            />

                                        </h2>

                                        <p> Criado em:
                                            
                                            <InputMask
                                                type="text"
                                                maskChar=" "
                                                mask="99/99/9999"
                                                id="createdAt-input"
                                                placeholder="DD/MM/AAAA"
                                                defaultValue={Moment(this.state.createdAt).format('DD/MM/YYYY')}
                                                onChange={(event) => {
                                                    this.setState({
                                                        tempCreatedAt: event.target.value
                                                    });
                                                }}
                                            />

                                        </p>

                                        <p> Tipo:
                                            
                                            <input
                                                type="text"
                                                name="type"
                                                maxLength="20"
                                                id="type-input"
                                                defaultValue={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({
                                                        tempType: event.target.value
                                                    });
                                                }}
                                            />

                                        </p>

                                    </form>

                                </React.Fragment> :
                                <React.Fragment>

                                    <Edit className="item--icon item--edit"
                                        onClick={
                                            () => {
                                                this.isEditionHandler();
                                            }
                                        }
                                    />

                                    <Delete className="item--icon item--delete"
                                        onClick={
                                            () => {
                                                this.deleteHandler();
                                            }
                                        }
                                    />

                                    <h2> Nome: <span> {this.state.name} </span> </h2>

                                    <p> Criado em: <span> <ReactMoment date={this.state.createdAt} format={'DD/MM/YYYY'} /> </span> </p>

                                    <p> Tipo: <span> {this.state.type} </span> </p>

                                    <RightArrow className="item--arrow" onClick={this.detailsHandler} />

                                </React.Fragment>
                        }

                    </li>
        );
    }
};

export default Item;
