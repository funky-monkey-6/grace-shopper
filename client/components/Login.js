import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkUser as checkUserActionCreator } from '../store';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	handleChange = ev => {
		ev.preventDefault();
		this.setState({ [`${ev.target.name}`]: ev.target.value });
	};

	handleSubmit = () => {
		const { checkUser } = this.props;

		checkUser(this.state);
	};

	render() {
		const { handleChange, handleSubmit } = this;
		const { email, password } = this.state;

		return (
			<div>
				<h4>Enter login information below:</h4>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>
							Email:
              <input type="text" name="email" value={email} onChange={handleChange} />
						</label>
					</div>

					<div className="form-group">
						<label>
							Password:
              <input type="text" name="password" value={password} onChange={handleChange} />
						</label>
					</div>

					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkUser: user => dispatch(checkUserActionCreator(user)),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Login);
