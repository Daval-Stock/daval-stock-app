import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import UserContext from './UserContext';

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
      const authToken = localStorage.getItem('authToken');

    useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
  axiosInstance
    .get('/users/profile')
    .then((response) => {
      console.log('User profile data:', response.data);
      setUserProfile(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <span className="text-orange-500">{userProfile?.name}</span>
  );
}

export default UserProfile;