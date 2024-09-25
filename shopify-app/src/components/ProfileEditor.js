import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

const ProfileEditor = () => {
  const [surveyResponses, setSurveyResponses] = useState({});
  const [geneticData, setGeneticData] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/user/profile');
        setSurveyResponses(response.data.survey_responses);
        setGeneticData(response.data.genetic_data || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setMessage('Updating profile...');
      await axios.post('/user/update-profile', { surveyResponses, geneticData });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-editor">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <h3>Survey Responses</h3>
          {Object.entries(surveyResponses).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                value={value}
                onChange={(e) => setSurveyResponses({ ...surveyResponses, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div>
          <h3>Genetic Data</h3>
          <textarea
            value={geneticData}
            onChange={(e) => setGeneticData(e.target.value)}
            placeholder="Enter your genetic data here"
            rows={5}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileEditor;