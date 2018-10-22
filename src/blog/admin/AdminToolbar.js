import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

class AdminToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id="admin-toolbar">
                <a href="/blog/admin/newPost"><FontAwesomeIcon icon={faPlusSquare} />  New Post</a>
            </div>
        );
    }
}

export default AdminToolbar;