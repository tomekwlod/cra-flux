import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { getCourses } from "../api/courseApi"
import CoursesList from  "./CoursesList";

function CoursesPage() {
    
    const [ courses, setCourses ] = useState([]);
    
    useEffect( () => {
        getCourses().then( _courses => setCourses(_courses) );
    }, [] );
    
    return (
        <>
            <h2>Courses</h2>
            <Link to="/course" className="btn btn-primary">
                Add new course
            </Link>
            <CoursesList courses={courses} />
        </>
    );

}

export default CoursesPage;