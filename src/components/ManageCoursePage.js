import React from 'react';

const ManageCoursePage = props => {

    return (
        <>
            <h2>Manage page</h2>
            {props.match.params.slug}
        </>
    )
};

export  default ManageCoursePage;