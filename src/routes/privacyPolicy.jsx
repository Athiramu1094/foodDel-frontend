import React from 'react';
import Header from './header';
import './privacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <Header />
      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          <h2>Privacy Policy</h2>
          <p>
            Welcome to Foodiko! This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website [www.foodiko.com] (“Site”). Please read this policy carefully.
            If you do not agree with the terms of this privacy policy, please do not access the Site.
          </p>
          <h3>1. Information We Collect</h3>
          <p>
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address,
              email address, and telephone number that you voluntarily give to us when you register with the Site or
              when you choose to participate in various activities related to the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site,
              such as your IP address, your browser type, your operating system, your access times, and the pages you
              have directly viewed.
            </li>
          </ul>
          <h3>2. How We Use Your Information</h3>
          <p>
            We use the information we collect in the following ways:
          </p>
          <ul>
            <li>To provide, operate, and maintain our Site.</li>
            <li>To improve, personalize, and expand our Site.</li>
            <li>To understand and analyze how you use our Site.</li>
            <li>To develop new products, services, features, and functionality.</li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
