import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthorsList from "./AuthorsList";
import authorStore from "../stores/authorStore";
import { loadAuthors, deleteAuthor } from "../actions/authorActions";

function AuthorsPage() {
    const [authors, setAuthors] = useState(authorStore.getAuthors());

    useEffect(() => {

        authorStore.addChangeListener(onChange);
    
        if (authors.length === 0) {

            loadAuthors();
        }
    
        return () => authorStore.removeChangeListener(onChange); // cleanup on unmount
    }, [authors.length]);

    function onChange() {

        setAuthors(authorStore.getAuthors());
    }

    return (
        <>
            <h2>Authors</h2>
            <Link to="/author" className="btn btn-primary">
                Add new author
            </Link>
            <AuthorsList authors={authors} deleteAuthor={deleteAuthor} />
        </>
    );
}

export default AuthorsPage;