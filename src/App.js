import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      email: 't@t.com',
      password: '123',
      fieldsEmpty: false,
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');

    if (token) {
      console.log('session contains token');
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const nameValue = event.target.name.value;
    const emailValue = event.target.email.value;
    const pwdValue = event.target.password.value;

    if (nameValue !== '' && emailValue !== '' && pwdValue !== '') {
      console.log('auth');
    } else {
      this.setState({ fieldsEmpty: true });
      setTimeout(() => {
        this.setState({ fieldsEmpty: false });
      }, 2000);
    }
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.setState({ token: null });
  };

  render() {
    const { token, fieldsEmpty } = this.state;
    return (
      <div className='App'>
        {token ? (
          <div className='container'>
            <p>Dashboard</p>
            <p>Dear Name, welcome to your profile!</p>
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className='container'>
            {fieldsEmpty ? (
              <div className='error'>Please fill the fields first!</div>
            ) : null}
            <Form inline onSubmit={this.handleFormSubmit}>
              <FormGroup floating>
                <Input
                  id='exampleName'
                  name='name'
                  placeholder='Name'
                  type='text'
                />
                <Label for='exampleEmail'>Name</Label>
              </FormGroup>{' '}
              <FormGroup floating>
                <Input
                  id='exampleEmail'
                  name='email'
                  placeholder='Email'
                  type='email'
                />
                <Label for='exampleEmail'>Email</Label>
              </FormGroup>{' '}
              <FormGroup floating>
                <Input
                  id='examplePassword'
                  name='password'
                  placeholder='Password'
                  type='password'
                />
                <Label for='examplePassword'>Password</Label>
              </FormGroup>{' '}
              <Button>Login</Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}