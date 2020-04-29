import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Home page</h1>
            <p>Home page paragraph</p>

            <Link to="about" className="btn btn-primary">About page</Link>
        </div>
    )
}

export default HomePage;