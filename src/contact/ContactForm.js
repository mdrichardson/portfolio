import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const FormStructure = ({
    errors,
    touched,
    isSubmitting
}) => (
    <Form>
        <div>
            <Field type="text" name="name" placeholder="Name" />
            { touched.name && errors.name && <p>{ errors.name }</p>}
        </div>
        <div>
            <Field type="email" name="email" placeholder="Email" />
            { touched.email && errors.email && <p>{ errors.email }</p>}
        </div>
        <div>
            <Field component="textarea" name="message" placeholder="Message"/>
            { touched.message && errors.message && <p>{ errors.message }</p>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
)

const FormikForm = withFormik({
    mapPropsToValues() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(50).required(),
        email: Yup.string().email().min(8).max(50).required(),
        message: Yup.string().min(20).max(2000).required()
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        fetch('http://localhost:3100/send', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        .then(res => console.log(res))
        resetForm();
        setSubmitting(false);
    }
})(FormStructure)

class ContactForm extends React.Component {

    render() {
        return (
            <FormikForm />
        );
    }
}

export default ContactForm;