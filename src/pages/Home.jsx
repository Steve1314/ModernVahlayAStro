import React from 'react';
import { useNavigate } from 'react-router-dom';
import Animation from './Animation';
import Courses from './Courses';

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="home-container">
            <Animation onGetDetails={() => navigate('/login')} />
            <Courses />
        </main>
    );
};

export default Home;
