import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100,
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 10,
  paddingBottom: 10,
  width: 500,
};

const buttonStyle = {
  marginBottom: 0,
};

const errorStyle = {
  color: "red"
};

const linkStyle = {
  color: "white",
  paddingTop: 5,
};

class LoginForm extends Component {

  constructor() {
     super();
     this.state = {
       fields: {},
       errors: {}
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleFormSubmit = this.handleFormSubmit.bind(this);

   };

   handleChange(e) {
     let fields = this.state.fields;
     fields[e.target.name] = e.target.value;
     this.setState({
       fields
     });

    }

    handleFormSubmit(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["emailid"] = "";
          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "Please enter your Email ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "Please enter valid Email ID.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "Please enter secure and strong password.";
        }
      }

      this.setState({
        errors: errors
      });

      return formIsValid;

    }

  render() {
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
        <h2>Member Login</h2>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl type="email" placeholder="Email Address" name="emailid" value={this.state.fields.emailid} />
              <div style={errorStyle}>{this.state.errors.emailid}</div>
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" placeholder="Password" name="password" value={this.state.fields.password} />
              <div style={errorStyle}>{this.state.errors.password}</div>
            </FormGroup>
             <FormGroup style={buttonStyle}>
             <div class="btn-group mr-2" role="group">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
              </div>
              <div class="btn-group" role="group">
              <Button bsStyle="primary" type="reset">
                Reset
              </Button>
              </div>
              </FormGroup>
              <div style={linkStyle}>Don't have an account? <a href="signup">Sign Up</a></div>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default LoginForm;
