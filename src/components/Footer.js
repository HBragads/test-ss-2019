import React from 'react';
import Util from '../util.js';

const Footer = (props) => {
    return (
        <footer className="footer">

            <div className="footer--logo"
                onClick={() => { Util.History.push(`${process.env.PUBLIC_URL}/`); }}
            >
            </div>

            <ul className="footer--links">

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

        </footer>
    );
};

export default Footer;