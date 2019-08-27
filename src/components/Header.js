import React from 'react';
import Util from '../util';
import { MdMenu as Menu } from 'react-icons/md';

const Header = (props) => {
    return (
        <header className="header">

            <div className="header--logo"
                onClick={() => {
                    Util.History.push(`${process.env.PUBLIC_URL}/home`);
                }}></div>

            <h1 className="header--title">
                {props.title}
            </h1>

            <Menu className="header--menu"
                onClick={
                    () => {
                        props.action();
                    }
                }
            />

        </header>
    );
};

export default Header;
