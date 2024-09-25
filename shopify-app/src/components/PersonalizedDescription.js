import React, { useEffect, useState } from 'react';
import axios from '../utils/api';

const PersonalizedDescription = ({ productId }) => {
  const [benefits, setBenefits] = useState([]);
  const [sideEffects, setSideEffects] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonalizedDescription = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/user/personalized-content`, {
          params: { product_id: productId },
        });
        const data = response.data;

        setBenefits(JSON.parse(data.personalized_benefits));
        setSideEffects(JSON.parse(data.personalized_side_effects));
        setScore(data.score);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching personalized description:', error);
        setError('Failed to load personalized content. Please try again later.');
        setLoading(false);
      }
    };

    fetchPersonalizedDescription();
  }, [productId]);

  if (loading) return <div>Loading personalized content...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="personalized-description">
      <h3>Personalized Information</h3>
      {benefits.length > 0 && (
        <div className="benefits">
          <h4>Potential Benefits:</h4>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {sideEffects.length > 0 && (
        <div className="side-effects">
          <h4>Potential Side Effects:</h4>
          <ul>
            {sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>
      )}
      {score !== null && (
        <div className="score">
          <h4>Suitability Score:</h4>
          <p>{score} / 10</p>
        </div>
      )}
    </div>
  );
};

export default PersonalizedDescription;