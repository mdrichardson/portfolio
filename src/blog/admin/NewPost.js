import React from 'react';
import './newPost.css';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import loadingSVG from '../../images/loading.svg';  
import TagCheckboxes from './TagCheckboxes';

const FormStructure = ({
    values,
    errors,
    touched,
    isSubmitting,
    status,
    setFieldValue
}) => (
    <div id="form-container">
        <Form>
            <div id="title-container">
                <div className="input-container">
                    <Field type="text" name="title" id="title" placeholder="Title" 
                        className={ touched.title && errors.title ? "err-border" : "" } aria-label="title"/>
                </div>
                <div id="title-error" className="error" hidden={ !touched.title || !errors.title }><p>{ errors.title }</p></div>
            </div>
            <div id="slug-container">
                <div className="input-container">
                    <Field type="text" name="slug" id="slug" placeholder="Slug" 
                        className={ touched.slug && errors.slug ? "err-border" : "" } aria-label="slug"/>
                </div>
                <div id="slug-error" className="error" hidden={ !touched.slug || !errors.slug }><p>{ errors.slug }</p></div>
            </div>
            <div id="summary-container">
                <div className="input-container">
                    <Field component="textarea" name="summary" id="summary" placeholder="Summary" 
                        className={ touched.summary && errors.summary ? "err-border" : "" } aria-label="summary"/>
                </div>
                <div id="summary-error" className="error" hidden={ !touched.summary || !errors.summary }><p>{ errors.summary }</p></div>
            </div>
            <div id="body-container">
                <div className="input-container">
                    <Field component="textarea" name="body" id="body" placeholder="Body Text" 
                        className={ touched.body && errors.body ? "err-border" : "" } aria-label="body"/>
                </div>
                <div id="body-error" className="error" hidden={ !touched.body || !errors.body }><p>{ errors.body }</p></div>
            </div>
            <div id="tags-container">
                <h2>Tags</h2>
                <TagCheckboxes values={ values }/>
                <div id="tags-error" className="error" hidden={ !touched.tags || !errors.tags }><p>{ errors.tags }</p></div>
            </div>
            <div id="isPublished-container">
                <label htmlFor="isPublished">
                    <Field name="isPublished" component="input" type="checkbox" checked={values.isPublished} />
                    Published?
                </label>
                <div id="isPublished-error" className="error" hidden={ !touched.isPublished || !errors.isPublished }><p>{ errors.isPublished }</p></div>
            </div>
            <div id="image-container">
                <div id="image-fields">
                    <label htmlFor="x_offset">
                        <Field type="number" name="x_offset" id="x_offset" placeholder="0" aria-label="x_offset"/>
                        X_Offset
                    </label>
                    <label htmlFor="x_offset">
                    <Field type="number" name="y_offset" id="y_offset" placeholder="0" aria-label="y_offset"/>
                    Y_Offset
                    </label>
                    <input id="image" name="image" type="file" onChange={e => {setFieldValue("image", e.currentTarget.files[0])}} />
                </div>
                <div id="image-error" className="error" hidden={ !touched.image || !errors.image }><p>{ errors.image }</p></div>
            </div>
            <div id="submit" hidden={ isSubmitting }>
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
)

const FormikForm = withFormik({
    mapPropsToValues: props => ({
        title: '',
        slug: '',
        summary: '',
        body: '',
        tags: [],
        isPublished: true,
        allTags: props.allTags,
        x_offset: 0,
        y_offset: 0,
        image: '',
        token: props.token
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().min(5).max(50).required(),
        slug: Yup.string().lowercase().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(5).max(50).required(),
        summary: Yup.string().min(50).max(300).required(),
        body: Yup.string().min(100).required(),
        tags: Yup.array().min(1).required(),
        x_offset: Yup.number().min(0).max(100).required(),
        y_offset: Yup.number().min(0).max(100).required()
    }),
    handleSubmit(values, { setSubmitting, setStatus }) {
        let formData = new FormData();
        for (var key in values) {
            formData.append(key, values[key])
        }
        setSubmitting(true);
        console.log(values)
        fetch('https://www.mdrichardson.net:3100/blog/admin/article', {
            method: 'POST',
            headers: { 'x-access-token': values.token},
            body: formData
        })
        .then(res => {
            if (res.status === 200) {
                setStatus('success');
                setSubmitting(false);
            }
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

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
    }

    getTags = async () => {
        const tagsResponse = await fetch('https://www.mdrichardson.net:3100/blog/tags');
        const tags = await tagsResponse.json();
        !this.isCancelled && this.setState({ tags: tags })
    }

    componentDidMount() {
        if (this.state.tags.length === 0) this.getTags();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render() {
        if (!this.props.userIsAdmin) {
            return (
                <h1>Unauthorized</h1>
            )
        } if (this.state.tags.length === 0) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div id="new-post-container" className="section-container">
                    <div id="new-post-content">
                        <h1>New Post</h1>
                        <FormikForm allTags={ this.state.tags } token={ this.props.token } />
                    </div>
                </div>
            )
        }
    }
}

export default NewPost;