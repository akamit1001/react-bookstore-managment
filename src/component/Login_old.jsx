import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import {getUsers} from '../action/userAction'
import React, { Component } from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password:'',
            isLoggedIn: false,
            errors: {}}

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(e) {
        this.setState({username:e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password:e.target.value});
    }

    handleSubmit = async(e)  =>{
        
            e.preventDefault();
            var data={
                "username":this.state.username,
                "password":this.state.password
            }
    
            var headers = {
                'Content-Type': 'application/json'
            }
    
            console.log(data);
            await axios.post("https://book-store-management-backend.herokuapp.com/api/auth_user/login/", 
                        data, {headers: headers}).then((response)=>{
                            this.setState({
                                errors: {},
                            });
                            localStorage.setItem('access_token', "Token " + response.data.key);
                            
                        }).catch((error) => { ""
                            console.log(error);
                            this.state.username = ''
                            this.state.password = ''
                            this.setState({
                                errors: error.response.data
                            })
                        });
            this.props.getUsers();
        }

render() {
    if(this.props.users.is_authenticated){
        return (<Redirect to="/" />);
    }
    else
    {
        return(
        
            <div className="login_bg">
            <div className="col-md-6 login p-5">
                     <h2>Login</h2>
                     <form name="form" onSubmit ={this.handleSubmit}>
                         <div className='form-group py-2'>
                             <label htmlFor="username">Username</label>
                             <input type="text" className="form-control" name="username" value={this.state.username} 
                             onChange={this.handleChangeUsername} />
                            
                         </div>
                         <div className='form-group py-2'>
                             <label htmlFor="password">Password</label>
                             <input type="password" className="form-control" name="password" value={this.state.password}
                             onChange ={this.handleChangePassword}  />
                            
                         </div>
                         <div className="form-group py-2">
                             <button className="btn btn-primary">Login</button>                      
                             <Link to="/register" className="btn mx-3 btn-warning">Register</Link>
                         </div>
                     </form>
                 </div>
                 </div>
         )
           
    }
}
}


const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(Login)
 
