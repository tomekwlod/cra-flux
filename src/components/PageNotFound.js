import React from 'react';
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h2>Page Not Found (404)</h2>

            <Link to="/" className="btn btn-secondary" >Back to Home</Link>
        </div>
    );
}

export default PageNotFound;