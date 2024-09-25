import React from 'react';
import PersonalizedDescription from '../components/PersonalizedDescription';
import ProfileEditor from '../components/ProfileEditor';
import ProductSorter from '../components/ProductSorter';

const HomePage = () => {
  return (
    <div className="personalized-shopping-experience">
      <h1>Welcome to Your Personalized Shopping Experience</h1>
      
      <section className="profile-section">
        <h2>Your Profile</h2>
        <ProfileEditor />
      </section>

      <section className="product-list">
        <h2>Personalized Product Recommendations</h2>
        <ProductSorter />
        {/* Example product listing - in a real app, this would be dynamically generated */}
        <div className="product-item" data-product-id="1234567890">
          <h3>Product Name</h3>
          <PersonalizedDescription productId="1234567890" />
        </div>
        {/* More product items would be listed here */}
      </section>
    </div>
  );
};

export default HomePage;