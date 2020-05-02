import React, { useState, useEffect } from 'react';
import { toast }  from 'react-toastify';

import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = props => {

    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: "",
    });
    const [ errors, setErrors ] = useState({});

    useEffect( () => {
        const slug = props.match.params.slug;

        if ( slug ) {
            courseApi.getCourseBySlug(slug).then( _course => setCourse(_course));
        }
    }, [props.match.params.slug]);

    function handleChange({target}) {  // desctructuring the event; so we take only target from incoming event to avoid typing event.target everywhere
        //
        // here we're copying the `course` object to not mutate it directly!
        //
        // const updatedCourse = {...course}; // spread operator copies the course object
        // updatedCourse.title = event.target.value;

        // or we can do e=verything in one line:
        const updatedCourse = {...course, [target.name]: target.value}; // copy and midify in one line
        // [event.target.name] is not an array! it is the 'computed property'; it sets an object property based on a variable

        setCourse(updatedCourse);
    }

    function handleSubmit(event) {

        event.preventDefault();

        if ( ! formIsValid() ) {

            return;
        }

        courseApi.saveCourse(course).then( () => {
            props.history.push("/courses");

            toast.success("Course saved");
        } );
    }

    function formIsValid() {

        const _errors = {};

        if ( ! course.title ) {

            _errors.title = "Title is required";
        }
        if ( ! course.category ) {

            _errors.category = "Category is required";
        }
        if ( ! course.authorId ) {

            _errors.authorId = "Author is required";
        }

        setErrors(_errors);

        return Object.keys(_errors).length === 0; // if no properties -> form valid
    }

    return (
        <>
            <h2>Manage page</h2>
            <CourseForm 
                course={course}
                errors={errors}
                onChange={handleChange} 
                onSubmit={handleSubmit} 
            />
        </>
    )
};

export  default ManageCoursePage;