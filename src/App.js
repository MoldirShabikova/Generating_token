import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import { v4 as uuidv4 } from 'uuid';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      token: null,
      email: 't@t.com',
      password: '123',
      fieldsEmpty: false,
      notFound: false,
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    let name = sessionStorage.getItem('name');

    if (token) {
      this.setState({ token, name });
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const nameValue = event.target.name.value;
    const emailValue = event.target.email.value;
    const pwdValue = event.target.password.value;

    if (nameValue !== '' && emailValue !== '' && pwdValue !== '') {
      if (emailValue === email && pwdValue === password) {
        const token = emailValue + pwdValue; // t@t.com123
        // const token = uuidv4();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('name', nameValue);
        this.setState({ token: 'abc', name: nameValue });
      } else {
        this.setState({ notFound: true });
        setTimeout(() => {
          this.setState({ notFound: false });
        }, 2000);
      }
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
    const { token, fieldsEmpty, name, notFound } = this.state;
    return (
      <div>
        {token ? (
          <div className='container'>
            <p>Dashboard</p>
            <p>Dear {name}, welcome to your profile!</p>
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className='container'>
            {fieldsEmpty ? (
              <div className='error'>Please fill the fields first!</div>
            ) : null}
            {notFound ? (
              <div className='error'>User is not found in our system!</div>
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