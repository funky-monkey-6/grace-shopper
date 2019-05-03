import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUser } from '../store'

<<<<<<< HEAD
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
=======
const Login = (props) => {

    const enteredUser = {
        email: '',
        password: ''
>>>>>>> 612ea752749d56a633fdae5f9b9ea5f0b9849038
    }

    handleChange = (ev) => {
        ev.preventDefault()
        this.setState({ [`${ev.target.name}`]: ev.target.value })

    }

    handleSubmit = () => {
        props.checkUser(this.state)
    }

<<<<<<< HEAD
    render() {
        return (
            <div>
                <h4>Enter login information below:</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Email:
                <input type="text" name="email" value={this.state.email} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password:
                 <input type="text" name="password" value={this.state.password} onChange={handleChange} />
                        </label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
=======
    return (
        <div>
            <h4>Enter login information below:</h4>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>
                        Email:
                <input type="text" name="email" onChange={handleChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Password:
                 <input type="text" name="password" onChange={handleChange} />
                    </label>
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
>>>>>>> 612ea752749d56a633fdae5f9b9ea5f0b9849038
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkUser: (user) => dispatch(checkUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)
