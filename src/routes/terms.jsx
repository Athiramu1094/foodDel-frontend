import React from 'react';
import Header from './header';
import './terms.css';

const Terms = () => {
    return (
        <div className="terms-container">
            <Header />
            <div className="terms-content">
                <h2>Terms and Conditions</h2>
                <p>
                    Welcome to Foodiko! These Terms and Conditions (“Terms”) govern your use of our website
                    <a href="http://www.foodiko.com" target="_blank" rel="noopener noreferrer">www.foodiko.com</a>
                    (“Site”) and the services provided through it. By accessing or using our Site, you agree to be bound
                    by these Terms. If you do not agree to these Terms, please do not use our Site.
                </p>
                <h3>1. Acceptance of Terms</h3>
                <p>
                    By using our Site, you agree to these Terms and any additional terms and conditions that may apply. We
                    may update these Terms from time to time, and your continued use of the Site constitutes acceptance
                    of those changes.
                </p>
                <h3>2. Use of the Site</h3>
                <p>
                    You agree to use the Site only for lawful purposes and in accordance with these Terms. You may not use
                    the Site:
                </p>
                <ul>
                    <li>In any way that violates any applicable local, national, or international law or regulation.</li>
                    <li>To engage in any fraudulent or illegal activities.</li>
                    <li>To transmit any harmful or malicious content, including viruses or malware.</li>
                </ul>
                <h3>3. Account Registration</h3>
                <p>
                    To use certain features of the Site, you may need to create an account. You agree to:
                </p>
                <ul>
                    <li>Provide accurate, current, and complete information during registration.</li>
                    <li>Maintain the security of your account by protecting your password.</li>
                    <li>Notify us immediately of any unauthorized use of your account.</li>
                    <li>Accept all responsibility for activities that occur under your account.</li>
                </ul>
                <h3>4. Orders and Payments</h3>
                <p>
                    All orders are subject to acceptance and availability. Prices and availability are subject to change
                    without notice. Payment must be made at the time of ordering. We accept various payment methods as
                    indicated on our Site. You are responsible for providing accurate delivery information. We are not
                    liable for any delays or errors in delivery caused by incorrect information.
                </p>
                <h3>5. Intellectual Property</h3>
                <p>
                    All content and materials on the Site, including text, graphics, logos, images, and software, are the
                    property of Foodiko or its licensors and are protected by intellectual property laws. You may not use,
                    reproduce, distribute, or create derivative works from any content without our express written permission.
                </p>
            </div>
        </div>
    );
};

export default Terms;
