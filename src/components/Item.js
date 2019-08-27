import React from 'react';
import { MdEdit as Edit } from 'react-icons/md';
import { MdDelete as Delete } from 'react-icons/md';

const Item = (props) => {
    return (
        <li className="item" onClick={props.event}>

            <h2>
                Nome: <span> {props.name} </span>

                <Edit className="item--icon item--edit"
                    onClick={
                        () => {
                            props.edit(props.id, 'name');
                        }
                    }
                />

                <Delete className="item--icon item--delete"
                    onClick={
                        () => {
                            props.delete(props.id, 'name');
                        }
                    }
                />

            </h2>

            <p>
                Criado em: <span> {props.createdAt} </span>

                <Edit className="item--icon item--edit"
                    onClick={
                        () => {
                            props.edit(props.id, 'createdAt');
                        }
                    }
                />

                <Delete className="item--icon item--delete"
                    onClick={
                        () => {
                            props.delete(props.id, 'createdAt');
                        }
                    }
                />
            </p>

            <p>
                Tipo: <span> {props.type} </span>

                <Edit className="item--icon item--edit"
                    onClick={
                        () => {
                            props.edit(props.id, 'type');
                        }
                    }
                />

                <Delete className="item--icon item--delete"
                    onClick={
                        () => {
                            props.delete(props.id, 'type');
                        }
                    }
                />

            </p>

        </li>
    );
};

export default Item;
