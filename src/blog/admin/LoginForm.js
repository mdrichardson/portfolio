import React from 'react';
import loadingSVG from '../../images/loading.svg';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isSubmitting: false
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        try {
            const res = await fetch('https://www.mdrichardson.net:3100/blog/admin/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            const status = await res.status;
            if (status === 200) {
                const json = await res.json();
                this.saveUserToken(json.token);
            }
        } catch(err) {
            console.error(err);
        }
        this.setState({ isSubmitting: false });
    }

    saveUserToken = (token) => {
        localStorage.setItem('token', token)
        console.log('Token Set')
    }

    render() {
        return (
            <div id="blog-login-container">
                <form onSubmit={ this.handleSubmit }>
                    <div id="username">
                        <input type="text" name="username" id="username" value={ this.state.username } onChange={ this.handleInputChange } placeholder="username" aria-label="username" disabled={ this.state.isSubmitting }/>
                    </div>
                    <div id="password">
                        <input type="password" name="password" id="password" value={ this.state.password } onChange={ this.handleInputChange } placeholder="password" aria-label="password" disabled={ this.state.isSubmitting } />
                    </div>
                    <div id="submit">
                        <button type="submit" 
                            className="hvr-underline-from-center hvr-grow" >
                            Submit</button>
                    </div>
                    <div id="loading" hidden={ !this.state.isSubmitting }>
                        <img src={ loadingSVG } alt="Submitting" />
                        <p>Submitting...</p>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;