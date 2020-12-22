import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Auth } from './components/Auth';
import Header from './components/Header';

import LoginPage from './views/LoginPage';
import Configs from './views/Configs';
import ConfigCreate from './views/ConfigCreate';
import ConfigSingle from './views/ConfigSingle';

// Check is user login status
const checkLoginStatus = () => {
  if (localStorage.getItem('token-rc')){
    Auth.token = localStorage.getItem('token-rc');
  }
}

// Private routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.token !== false
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/'
        }} />
  )} />
)

checkLoginStatus();
class App extends Component {
  render(){
    return (
      <div className="wrapper">
        {/* Doesn't show header on login page */}
        {(!this.props.location.pathname.match(/\/$/)) &&
          <Header /> 
        }

        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/configs" component={Configs} />
          <PrivateRoute exact path="/config/create" component={ConfigCreate} />
          <PrivateRoute exact path="/config/:name?/:version?" component={ConfigSingle} />
        </Switch>  
      </div>
    );
  }
}

export default withRouter(props => <App {...props}/>);
