import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      mobile: "",
      pin: "",
      pin2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  //life cycle method
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      mobile: this.state.mobile,
      pin: this.state.pin,
      pin2: this.state.pin2
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    // pulling errors
    const { errors } = this.state;

    //dirrect assigning
    // const errors = this.state.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto pt-10">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your TaxiDoo account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Mobile no"
                  name="mobile"
                  type="text"
                  value={this.state.mobile}
                  onChange={this.onChange}
                  error={errors.mobile}
                />
                <TextFieldGroup
                  placeholder="Pin"
                  name="pin"
                  type="password"
                  value={this.state.pin}
                  onChange={this.onChange}
                  error={errors.pin}
                />{" "}
                <TextFieldGroup
                  placeholder="Confirm pin"
                  name="pin2"
                  type="password"
                  value={this.state.pin2}
                  onChange={this.onChange}
                  error={errors.pin2}
                />
                <input
                  type="submit"
                  value="Register now"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
