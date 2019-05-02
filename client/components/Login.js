import React from 'react'
import { connect } from 'react-redux'
import { checkUser } from '../store'

const Login = (props) => {

    const enteredUser = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const handleChange = (ev) => {
        ev.preventDefault()
        enteredUser[ev.target.name] = ev.target.value

    }

    const handleSubmit = (ev) => {
        props.checkUser(enteredUser)
    }

    return (
        <div>
            <h4>Enter login information below:</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        First Name:
                    <input type="text" name="firstName" onChange={handleChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Last Name:
                <input type="text" name="lastName" onChange={handleChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Email:
                 <input type="text" name="email" onChange={handleChange} />
                    </label>
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkUser: (user) => dispatch(checkUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)