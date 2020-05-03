import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AuthorForm from "./AuthorForm";
import authorStore from "../stores/authorStore";
import * as authorActions from "../actions/authorActions";

const ManageAuthorPage = props => {
    const [errors, setErrors] = useState({});
    const [authors, setAuthors] = useState(authorStore.getAuthors());
    const [author, setAuthor] = useState({
        id: null,
        name: "",
    });

    useEffect(() => {

        authorStore.addChangeListener(onChange);

        const id = props.match.params.id; // from the path `/authors/:is`

        if (authors.length === 0) {

            authorActions.loadAuthors();

        } else if (id) {

            setAuthor(authorStore.getAuthorById(id));
        }

        return () => authorStore.removeChangeListener(onChange);

    }, [authors.length, props.match.params.id]);

    function onChange() {

        setAuthors(authorStore.getAuthors());
    }

    function handleChange({ target }) {

        setAuthor({
            ...author,
            [target.name]: target.value
        });
    }

    function handleSubmit(event) {

        event.preventDefault();

        if ( ! formIsValid() ) {

            return;
        }

        authorActions.saveAuthor(author).then(() => {

            props.history.push("/authors");
            toast.success("Author saved.");
        });
    }

    function formIsValid() {

        const _errors = {};

        if ( ! author.name ) {

            _errors.name = "Name is required";
        }

        setErrors(_errors);

        return Object.keys(_errors).length === 0; // if no properties -> form valid
    }

    return (
        <>
            <h2>Manage page</h2>
            <AuthorForm 
                author={author}
                errors={errors}
                onChange={handleChange} 
                onSubmit={handleSubmit} 
            />
        </>
    );
};

export default ManageAuthorPage;