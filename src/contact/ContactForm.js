import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const FormStructure = ({
    errors,
    touched,
    isSubmitting
}) => (
    <div>
        <Form className={ errors.exceededLimit ? "exceeded-limit" : ""}>
            <div>
                <Field type="text" name="name" id="name" placeholder="Name" disabled={ errors.exceededLimit }/>
                { touched.name && errors.name && <p>{ errors.name }</p>}
            </div>
            <div>
                <Field type="email" name="email" id="email" placeholder="Email"  disabled={ errors.exceededLimit }/>
                { touched.email && errors.email && <p>{ errors.email }</p>}
            </div>
            <div>
                <Field component="textarea" name="message" id="message" placeholder="Message" disabled={ errors.exceededLimit }/>
                { touched.message && errors.message && <p>{ errors.message }</p>}
            </div>
            <button type="submit" disabled={ isSubmitting || errors.exceededLimit }>Submit</button>
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