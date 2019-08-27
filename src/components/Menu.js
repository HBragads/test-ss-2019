import React from 'react';
import Util from '../util';
import { MdClose as Close } from 'react-icons/md';

const Menu = (props) => {
    return (
        <section id="menu" className="menu">

            <div className="menu--logo"
                onClick={() => {
                    props.menuHandler(false);
                    Util.History.push(`${process.env.PUBLIC_URL}/`);
                }}
            >
            </div>

            <Close className="menu--close"
                onClick={
                    () => {
                        props.menuHandler(false);
                    }
                }
            />

            <div className="menu--info">

                <p className="menu--info--text">
                    Conectado como

                    <span>
                        {localStorage.getItem('email')}
                    </span>
                </p>

                <p className="menu--info--logout"
                    onClick={() => {
                        localStorage.clear();
                        props.menuHandler(false);
                        Util.History.push(`${process.env.PUBLIC_URL}/login`);
                    }}
                >
                    Logout
            </p>

            </div>

            <ul className="menu--links">

                <li onClick={
                    () => {
                        Util.History.push(`${process.env.PUBLIC_URL}/home`);
                    }
                }>
                    Lista de Dragões
                </li>

                <li onClick={
                    () => {
                        Util.History.push(`${process.env.PUBLIC_URL}/create`);
                    }
                }>
                    Criar Dragão
                </li>

            </ul>

        </section>
    );
};

export default Menu;
