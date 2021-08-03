import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg'
import Routes from './Routes';
import {LoginNavbar, LogoutNavbar, AdminNavbar} from './component/Navbar'
import {getUsers} from './action/userAction'
import './App.scss'
class App extends Component {

  componentDidMount(){
    this.props.getUsers()
  }

  render(){
    const user = this.props.users.users
    console.log(this.props.users)
    if (!this.props.users.loading){
      if(this.props.users.is_authenticated){
          if(user.is_superuser){
            return(
              
              <div className="App">
                <AdminNavbar username = {user.username }/>
                <Routes />
              </div>
          );
          }
        else{
          return(
            <div className="App">
              <LoginNavbar username = {user.username }/>
              <Routes />
            </div>
        );
        }}
      else{
        return(
          
          <div className="App">
            <LogoutNavbar />
            <Routes />
          </div>
      );
      }
  }
  else{
    return(
      <div className="App loader-app">
        <h1><img src={logo} className="App-logo" width="200px" /></h1>
      </div>
    )
  }

}
};

const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(App)
