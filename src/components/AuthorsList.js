import React from 'react';
import { Link } from 'react-router-dom';

function AuthorsList(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.authors.map(author => {
                    return (
                        <tr key={author.id}>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        props.deleteAuthor(author.id);
                                    }}
                                >
                                Delete
                                </button>
                            </td>
                            <td>
                                <Link to={"/author/" + author.id }>
                                    {author.name}
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AuthorsList;