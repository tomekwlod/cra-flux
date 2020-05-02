import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect(() => {

        courseStore.addChangeListener(onChange);

        const slug = props.match.params.slug; // from the path `/courses/:slug`

        if (courses.length === 0) {

            courseActions.loadCourses();

        } else if (slug) {

            setCourse(courseStore.getCourseBySlug(slug));
        }

        return () => courseStore.removeChangeListener(onChange);

    }, [courses.length, props.match.params.slug]);

    function onChange() {

        setCourses(courseStore.getCourses());
    }

    function handleChange({ target }) {

        setCourse({
            ...course,
            [target.name]: target.value
        });
    }

    function handleSubmit(event) {

        event.preventDefault();

        if ( ! formIsValid() ) {

            return;
        }

        courseActions.saveCourse(course).then(() => {

            props.history.push("/courses");
            toast.success("Course saved.");
        });
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
    );
};

export default ManageCoursePage;