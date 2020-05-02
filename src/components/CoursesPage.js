import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CoursesList from "./CoursesList";
import courseStore from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
    const [courses, setCourses] = useState(courseStore.getCourses());

    useEffect(() => {

        courseStore.addChangeListener(onChange);
    
        if (courses.length === 0) {

            loadCourses();
        }
    
        return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
    }, [courses.length]);

    function onChange() {

        setCourses(courseStore.getCourses());
    }

    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">
                Add new course
            </Link>
            <CoursesList courses={courses} deleteCourse={deleteCourse} />
        </>
    );
}

export default CoursesPage;