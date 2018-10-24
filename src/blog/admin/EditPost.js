import React from 'react';
import './editPost.css';
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
                <div id="summary-error" className="error" hidden={ !touched.summary || !errors.summary }>
                    <p>{ errors.summary }</p>
                </div>
                <p id="summary-char-count">{ values.summary.length }</p>
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
                    <label htmlFor="imageXOffsetPercent">
                        <Field type="number" name="imageXOffsetPercent" id="imageXOffsetPercent" placeholder="0" aria-label="x offset"/>
                        X_Offset
                    </label>
                    <label htmlFor="imageYOffsetPercent">
                    <Field type="number" name="imageYOffsetPercent" id="imageYOffsetPercent" placeholder="0" aria-label="y offset"/>
                    Y_Offset
                    </label>
                    <input id="image" name="image" type="file" onChange={e => {setFieldValue("image", e.currentTarget.files[0])}} />
                </div>
                <div id="image-error" className="error" hidden={ !touched.image || !errors.image }><p>{ errors.image }</p></div>
            </div>
            <div id="submit" hidden={ isSubmitting || status === 'success' }>
                <button type="submit" 
                    className={ !isSubmitting && !errors.exceededLimit && !errors.name && !errors.email && !errors.message && values.message !== '' ? "hvr-underline-from-center hvr-grow" : "" } 
                    disabled={ isSubmitting || errors.exceededLimit || errors.name || errors.email || errors.message || values.message === ''}>
                    Submit</button>
            </div>
            <div id="loading" hidden={ !isSubmitting }>
                <img src={ loadingSVG } alt="Submitting" />
                <p>Submitting...</p>
            </div>
        </Form>
        <div hidden={ status !== 'success'}>
            <a href={`/blog/admin/preview/${values.slug}`} id="preview" className="hvr-underline-from-center hvr-grow">Preview</a>
        </div>
    </div>
)

const FormikForm = withFormik({
    mapPropsToValues: props => ({
        title: props.title,
        slug: props.slug,
        summary: props.summary,
        body: props.body,
        tags: props.tags,
        isPublished: props.isPublished,
        allTags: props.allTags,
        imageXOffsetPercent: props.imageXOffsetPercent,
        imageYOffsetPercent: props.imageYOffsetPercent,
        image: props.image,
        token: props.token,
        isEdit: props.isEdit
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().min(5).max(50).required(),
        slug: Yup.string().lowercase().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(5).max(50).required(),
        summary: Yup.string().min(50).max(300).required(),
        body: Yup.string().min(100).required(),
        tags: Yup.array().min(1).required(),
        imageXOffsetPercent: Yup.number().min(0).max(100).required(),
        imageYOffsetPercent: Yup.number().min(0).max(100).required()
    }),
    handleSubmit(values, { setSubmitting, setStatus }) {
        setSubmitting(true);
        let url;
        let headers;
        let data;
        if (values.isEdit) {
            console.log('editing')
            url =`https://www.mdrichardson.net:3100/blog/admin/article/edit/${values.slug}`;
            headers = { 'x-access-token': values.token, 'Content-Type': 'application/json' };
            data = JSON.stringify(values);
        } else {
            url = 'https://www.mdrichardson.net:3100/blog/admin/article';
            headers = { 'x-access-token': values.token };
            data = new FormData();
            for (var key in values) {
                data.append(key, values[key])
            }
        }
        fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
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
            tags: [],
            article: {
                summary: '', // Only some variables are declared just to make things easier
                tags: [] 
            },
            isEdit: false
        }
    }

    getTags = async () => {
        const tagsResponse = await fetch('https://www.mdrichardson.net:3100/blog/tags');
        const tags = await tagsResponse.json();
        !this.isCancelled && this.setState({ tags: tags })
    }

    async componentDidMount() {
        if (this.state.tags.length === 0) this.getTags();
        if (this.props.match.params.slug && this.props.token) {
            // Fetch Article
            const slug = this.props.match.params.slug;
            const articleRespose = await fetch(`https://www.mdrichardson.net:3100/blog/admin/preview/${slug}`, {
                method: 'GET',
                headers: { 'x-access-token': this.props.token }
            });
            const article = await articleRespose.json();
            if (article._id) {
                console.log(article)
                this.setState({ article: article })
                this.setState({ isEdit: true })
            }
        }
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
                        <FormikForm allTags={ this.state.tags } token={ this.props.token } {...this.state.article} isEdit={ this.state.isEdit } enableReinitialize/>
                    </div>
                </div>
            )
        }
    }
}

export default NewPost;