import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const FormStructure = ({
    errors,
    touched,
    isSubmitting
}) => (
    <div id="form-container">
        <Form className={ errors.exceededLimit ? "exceeded-limit" : ""}>
            <div id="name-and-email">
                <Field type="text" name="name" id="name" placeholder="Name" className={ touched.name && errors.name ? "err-border" : "" } disabled={ errors.exceededLimit }/>
                <Field type="email" name="email" id="email" placeholder="Email" className={ touched.email && errors.email ? "err-border" : "" } disabled={ errors.exceededLimit }/>
            </div>
            <div id="name-email-errors">
                <div id="name-error" className="error" hidden={ !touched.name || !errors.name }><p>{ errors.name }</p></div>
                <div id="email-error" className="error" hidden={ !touched.email || !errors.email }><p>{ errors.email }</p></div>
            </div>
            <div id="message-area">
                <Field component="textarea" name="message" id="message" placeholder="Message" className={ touched.message && errors.message ? "err-border" : "" } disabled={ errors.exceededLimit }/>
            </div>
            <div id="message-error" className="error" hidden={ !touched.message || !errors.message }><p>{ errors.message }</p></div>
            <div id="submit"><button type="submit" disabled={ isSubmitting || errors.exceededLimit }>Submit</button></div>
        </Form>
        <div id="exceeded-limit-message" hidden={ !errors.exceededLimit }>
            <p>Your IP address has exceeded the submission limit. Try again tomorrow</p>
        </div>
    </div>
)

const FormikForm = withFormik({
    mapPropsToValues({ ip }) {
        return {
            name: '',
            email: '',
            message: '',
            ip: ip
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().min(8).max(50).required(),
        message: Yup.string().min(20).max(2000).required()
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        fetch('http://localhost:3100/send', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        .then(res => {
            console.log(res)
            if (res.status === 401) {
                setErrors({ exceededLimit: true })
            }
        })
        resetForm();
        setSubmitting(false);
    }
})(FormStructure)

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: null,
            exceededLimit: false
        }
    }

    componentDidMount() {
        fetch('//api.ipify.org?format=json')
        .then(res => res.json())
        .then(res => { 
            this.setState({ ip: res.ip })
        })
    }

    render() {
        return (
            <FormikForm ip= { this.state.ip } />
        );
    }
}

export default ContactForm;