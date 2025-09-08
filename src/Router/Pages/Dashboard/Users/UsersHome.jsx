import React from 'react';
import AddPost from './AddPost';

const UsersHome = () => {
    return (
        <div>
            <h1 className='font-bold text-2xl mb-20'>User Dashboard</h1>
            <AddPost></AddPost>
        </div>
    );
};

export default UsersHome;