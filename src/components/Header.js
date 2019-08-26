import React from 'react';
import Util from '../util';
import { MdClose as Close } from 'react-icons/md';

const Header = (props) => {
    return (
        <header className="header">

            {
                props.logo ?
                    <div className="header--logo" style={props.logo}></div> :
                    ''
            }

            {
                props.title ?
                    <h1 className="header--title">{props.title}</h1> :
                    ''
            }

            <Close className="header--close"
                onClick={() => {
                    let url = props.url.replace('/', '');
                    Util.History.push(`${process.env.PUBLIC_URL + url}`);
                }}
            />

        </header>
    );
};

export default Header;
