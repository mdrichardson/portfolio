import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class AdminToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onArticlePage: false,
      slug: '',
      prevPath: ''
    }
  }

    onArticlePage = (path) => {
      return path.includes('/articles/') || path.includes('admin/preview/')
    }

    componentDidUpdate() {
      const pathname = new URL(window.location.href).pathname;
      if (pathname !== this.state.prevPath) {
        this.setState({ prevPath: pathname });
        this.setState({ onArticlePage: this.onArticlePage(pathname) })
        this.setState({ slug: pathname.split('/').pop() });
      }
    }

    render() {
      return (
        <div id="admin-toolbar">
          <div className="admin-item"><a href="/blog/admin/newPost"><FontAwesomeIcon icon={faPlusSquare} />  New Post</a></div>
          <div className="admin-item" hidden={!this.state.onArticlePage}><a href={`/blog/admin/edit/${this.state.slug}`}><FontAwesomeIcon icon={faPencilAlt} />  Edit Post</a></div>
        </div>
      );
    }
}

export default AdminToolbar;