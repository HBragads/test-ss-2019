import Util from '../util';
import InputMask from 'react-input-mask';
import React, { Component } from 'react';
import { MdEdit as Edit } from 'react-icons/md';
import { MdSave as Save } from 'react-icons/md';
import { MdClose as Close } from 'react-icons/md';
import { MdDelete as Delete } from 'react-icons/md';
import { MdArrowForward as RightArrow } from 'react-icons/md';

class Item extends Component {
    state = {
        data: this.props,
        isEdition: false,
        name: this.props.name,
        type: this.props.type,
        tempName: this.props.name,
        tempType: this.props.type,
        createdAt: this.props.createdAt,
        tempCreatedAt: this.props.createdAt
    }

    editHandler = (event) => {
        event.preventDefault();
        document.getElementById('name-input').blur();
        document.getElementById('createdAt-input').blur();
        document.getElementById('type-input').blur();

        console.log(this.state.data);
    }

    isEditionHandler = () => {
        this.setState({
            isEdition: !this.state.isEdition
        });
    }

    detailsHandler = () => {
        Util.History.push(`${process.env.PUBLIC_URL}/detail?id=${this.state.data.id}`);
    }

    deleteHandler = () => {
        console.log(this.state.data.id);
    }

    render = () => {
        return (
            <li className="item">
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
                                        defaultValue={this.state.createdAt}
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

                            <p> Criado em: <span> {this.state.createdAt} </span> </p>

                            <p> Tipo: <span> {this.state.type} </span> </p>

                            <RightArrow className="item--arrow" onClick={this.detailsHandler} />

                        </React.Fragment>
                }
            </li>
        );
    }
};

export default Item;
