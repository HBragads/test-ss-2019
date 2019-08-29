//Styles:
import './sass/_main.scss';
import 'react-toastify/dist/ReactToastify.min.css';

//Customs:
import Util from './util';

import Home from './pages/Home';
import Login from './pages/Login';
import Create from './pages/Create';
import Details from './pages/Details';

import Menu from './components/Menu';
import Header from './components/Header';
import Footer from './components/Footer';

//Vendors:
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import LoadingScreen from 'react-loading-screen';
import { toast, cssTransition } from 'react-toastify';
import { Redirect, Switch, Router, Route } from 'react-router-dom';

//Axios:
import axios from 'axios';
axios.defaults.baseURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

//Constants:
const Zoom = cssTransition({
  exit: 'zoomOut',
  enter: 'zoomIn',
  duration: [500, 800]
});

const MenuContainer = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        damping: 25,
        restSpeed: 10,
        type: 'spring',
        restDelta: 0.5,
        stiffness: 500
      },
      default: { duration: 100 }
    }
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      x: {
        damping: 25,
        restSpeed: 10,
        type: 'spring',
        restDelta: 0.5,
        stiffness: 500
      },
      default: { duration: 200 }
    }
  }
});

class App extends Component {
  state = {
    menuFlag: false,
    loadingFlag: false
  }

  notifyHandler = (type, title, msg, callback) => {
    if (!toast.isActive(1)) {
      toast.configure({
        autoClose: 2000,
        draggable: false,
        transition: Zoom,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_CENTER
      });

      toast[type](<React.Fragment><strong>{title}</strong> {msg}</React.Fragment>, { toastId: 1 });

      if (callback) {
        callback();
      }
    }
  }

  loadingHandler = (flag, callback) => {
    this.setState({ loadingFlag: flag }, () => {
      if (callback) {
        callback();
      }
    });
  }

  menuHandler = (flag) => {
    this.setState({ menuFlag: flag }, () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = flag ? 'hidden' : 'visible';

      if (document.getElementById('app')) {
        document.getElementById('app').style.overflow = flag ? 'hidden' : 'visible';
      }

      if (document.getElementById('menu')) {
        document.getElementById('menu').style.overflow = flag ? 'hidden' : 'visible';
      }

      if (document.getElementById('menu-container')) {
        document.getElementById('menu-container').style.overflow = flag ? 'hidden' : 'visible';
      }

    });
  }

  render() {
    const handlers = {
      menuHandler: this.menuHandler,
      notifyHandler: this.notifyHandler,
      loadingHandler: this.loadingHandler
    };

    return (
      <LoadingScreen
        bgColor='#FFF'
        textColor='#555'
        text='Carregando'
        spinnerColor='#6B8E23'
        loading={this.state.loadingFlag}
      >

        <PoseGroup>

          {this.state.menuFlag && [
            <MenuContainer id="menu-container" key="menu-container" className="menu-container">
              <Menu menuHandler={this.menuHandler} />
            </MenuContainer>
          ]}

        </PoseGroup>

        <Router history={Util.History}>

          <Switch>

            <Route path={`${process.env.PUBLIC_URL}/login`}
              render={
                () => (
                  <Login handlers={handlers} />
                )
              }
            />

            <Route path={`${process.env.PUBLIC_URL}/home`}
              render={
                () => (
                  <React.Fragment>

                    <Header title="Lista de Dragões" action={() => { this.menuHandler(!this.state.menuFlag) }} />

                    <Home menuFlag={this.state.menuFlag} handlers={handlers} />

                    <Footer />

                  </React.Fragment>
                )
              }
            />

            <Route path={`${process.env.PUBLIC_URL}/details`}
              render={
                () => (
                  <React.Fragment>

                    <Header back="home" title="Detalhes" action={() => { this.menuHandler(!this.state.menuFlag) }} />

                    <Details menuFlag={this.state.menuFlag} handlers={handlers} />

                    <Footer />

                  </React.Fragment>
                )
              }
            />

            <Route path={`${process.env.PUBLIC_URL}/create`}
              render={
                () => (
                  <React.Fragment>

                    <Header back="home" title="Criar Dragão" action={() => { this.menuHandler(!this.state.menuFlag) }} />

                    <Create menuFlag={this.state.menuFlag} handlers={handlers} />

                    <Footer />

                  </React.Fragment>
                )
              }
            />

            <Redirect from="*" to={`${process.env.PUBLIC_URL}/login`} />

          </Switch>

        </Router>

      </LoadingScreen>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));