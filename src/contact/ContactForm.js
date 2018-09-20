import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import loadingSVG from '../images/loading.svg';
import ReactGA from 'react-ga';

const FormStructure = ({
    values,
    errors,
    touched,
    isSubmitting,
    status
}) => (
    <div id="form-container">
        <div hidden={ status === 'success' || status === 'error' }>
        <Form className={ errors.exceededLimit ? "exceeded-limit" : ""}>
            <div id="name-and-email">
                <div id="name-container">
                    <div className="input-container"><Field type="text" name="name" id="name" placeholder="Name" className={ touched.name && errors.name ? "err-border" : "" } disabled={ errors.exceededLimit }/></div>
                    <div id="name-error" className="error" hidden={ !touched.name || !errors.name }><p>{ errors.name }</p></div>
                </div>
                <div id="email-container">
                    <div className="input-container"><Field type="email" name="email" id="email" placeholder="Email" className={ touched.email && errors.email ? "err-border" : "" } disabled={ errors.exceededLimit }/></div>
                    <div id="email-error" className="error" hidden={ !touched.email || !errors.email }><p>{ errors.email }</p></div>
                </div>
            </div>
            <div id="message-area">
                <Field component="textarea" name="message" id="message" placeholder="Message" className={ touched.message && errors.message ? "err-border" : "" } disabled={ errors.exceededLimit }/>
            </div>
            <div id="message-info-row" className="error">
                <div id="message-error" hidden={ !touched.message || !errors.message }><p>{ errors.message }</p></div>
                <div id="message-count" hidden={ values.message.length <= 1000 }><p>{ values.message.length }/2000</p></div>
            </div>
            <div id="submit">
                <button type="submit" 
                    className={ !isSubmitting && !errors.exceededLimit && !errors.name && !errors.email && !errors.message && values.message !== '' ? "hvr-underline-from-center hvr-grow" : "" } 
                    disabled={ isSubmitting || errors.exceededLimit || errors.name || errors.email || errors.message || values.message === ''}>
                    Submit</button>
            </div>
            <div id="exceeded-limit-message" className="error" hidden={ !errors.exceededLimit }>
                <p>You have exceeded the submission limit. Try again tomorrow</p>
            </div>
            <div id="loading" hidden={ !isSubmitting }>
                <img src={ loadingSVG } alt="Submitting" />
                <p>Submitting...</p>
            </div>
        </Form>
        </div>
        <div id="success" hidden={ status !== 'success' } className="submit">
            <h1>Thank you for getting in touch!</h1>
            <p>You should hear from me soon.</p>
        </div>
        <div id="error" hidden={ status !== 'error' } className="submit">
            <h1>There was an error connecting to the server!</h1>
            <p>Try again another time.</p>
        </div>
    </div>
)

const FormikForm = withFormik({
    mapPropsToValues: props => ({
            name: '',
            email: '',
            message: '',
            id: props.id
        }),
    validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().min(8).max(50).required(),
        message: Yup.string().min(1).max(2000).required()
    }),
    handleSubmit(values, { props, setErrors, setSubmitting, setStatus }) {
        // Log expand in Google Analytics
        ReactGA.event({
            category: 'Contact',
            action: 'Submit'
          });
        setSubmitting(true);
        values.id = props.id;
        fetch('http://localhost:3100/send', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        .then(res => {
            if (res.status === 401) {
                setErrors({ exceededLimit: true });
            } else {
                setStatus('success');
            }
            setSubmitting(false);
        })
        .catch(err => {
            if (err) {
                console.log(`Submit Error: ${err}`);
                setStatus('error');
                setSubmitting(false);
            }
        })
    }
})(FormStructure)


// Combine user information into a big string, used as an identifier if IP address fails
const getUserData = () => {
    return navigator.userAgent + 
           navigator.language +
           navigator.javaEnabled().toString() +
           window.innerHeight.toString() +
           window.innerWidth.toString()
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            exceededLimit: false
        }
    }

    // Try to get the user's IP address so we can limit their form submission frequency
    componentDidMount() {
        fetch('//api.ipify.org?format=json')
        .then(res => res.json())
        .then(res => { 
            this.setState({ id: res.ip })
        })
        // If user blocks ipify (uBlock blocks it), we'll just make a string of their
        // browser information and use that
        .catch(err => {
            console.log('IP error: ', err)
            console.log('Using userAgent strings as \'unique\' identifier', err)
            this.setState({ id: getUserData() })
        })
    }

    render() {
        return (
            <FormikForm id={ this.state.id } />
        );
    }
}

export default ContactForm;