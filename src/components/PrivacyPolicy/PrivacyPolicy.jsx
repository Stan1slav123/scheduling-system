// Import SCSS styles for the Privacy Policy page
import "./PrivacyPolicy.scss";

// Component that displays the Privacy Policy of the application
export const PrivacyPolicy = () => {
  return (
    <main className="privacyPolicy">
      {/* Page header with title and effective date */}
      <div className="privacyPolicy__header">
        <h1 className="privacyPolicy__header-title">Privacy Policy for SK</h1>
        <p className="privacyPolicy__header-text">
          <strong>Effective Date:</strong> 07.09.2024
        </p>
      </div>

      {/* Section: Information We Collect */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Information We Collect</h2>
        <p className="privacyPolicy__section-description">We may collect the following types of information:</p>
        <ul className="privacyPolicy__section-list">
          <li>
            <span className="privacyPolicy__section-list--bold">Personal Information:</span> Information that identifies you as an individual, such as your name, email address, phone number, and any other details you provide to us voluntarily.
          </li>
          <li>
            <span className="privacyPolicy__section-list--bold">Usage Data:</span> Information about how you interact with our website, such as your IP address, browser type, and operating system.
          </li>
          <li>
            <span className="privacyPolicy__section-list--bold">Cookies:</span> We may use cookies and similar tracking technologies to improve user experience on our website. You can choose to accept or decline cookies through your browser settings.
          </li>
        </ul>
      </section>

      {/* Section: How We Use Your Information */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">How We Use Your Information</h2>
        <p className="privacyPolicy__section-description">We may use the information we collect for various purposes, including:</p>
        <ul className="privacyPolicy__section-list">
          <li>To provide, operate, and maintain our services</li>
          <li>To improve and personalize your experience</li>
          <li>To communicate with you, including responding to inquiries or sending promotional information</li>
          <li>To analyze usage patterns and improve the quality of our services</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      {/* Section: How We Share Your Information */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">How We Share Your Information</h2>
        <p className="privacyPolicy__section-description">We do not sell or rent your personal information to third parties. We may share your data in the following situations:</p>
        <ul className="privacyPolicy__section-list">
          <li>
            <span className="privacyPolicy__section-list--bold">Service Providers:</span> We may share your information with trusted third-party vendors who assist us in providing services (e.g., hosting providers, email service providers).
          </li>
          <li>
            <span className="privacyPolicy__section-list--bold">Legal Requirements:</span> We may disclose your information if required by law or in response to valid legal requests by public authorities.
          </li>
        </ul>
      </section>

      {/* Section: Data Security */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Data Security</h2>
        <p className="privacyPolicy__section-description">We take reasonable precautions to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee its absolute security.</p>
      </section>

      {/* Section: Your Data Protection Rights */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Your Data Protection Rights</h2>
        <p className="privacyPolicy__section-description">Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul className="privacyPolicy__section-list">
          <li><span className="privacyPolicy__section-list--bold">Access:</span> You can request access to the personal information we hold about you.</li>
          <li><span className="privacyPolicy__section-list--bold">Correction:</span> You can request that we correct inaccurate or incomplete data.</li>
          <li><span className="privacyPolicy__section-list--bold">Deletion:</span> You can request that we delete your personal information under certain conditions.</li>
          <li><span className="privacyPolicy__section-list--bold">Objection:</span> You can object to our use of your personal information.</li>
          <li><span className="privacyPolicy__section-list--bold">Data Portability:</span> You can request a copy of your data in a structured, commonly used format.</li>
        </ul>
        <p>
          If you would like to exercise any of these rights, please contact us at{" "}
          <a className="privacyPolicy__section-link" href="mailto:contact.sktech247@gmail.com">
            contact.sktech247@gmail.com
          </a>.
        </p>
      </section>

      {/* Section: Third-Party Links */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Third-Party Links</h2>
        <p className="privacyPolicy__section-description">Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review their privacy policies for more information.</p>
      </section>

      {/* Section: Children's Privacy */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Children&apos;s Privacy</h2>
        <p className="privacyPolicy__section-description">Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
      </section>

      {/* Section: Changes to Policy */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Changes to This Privacy Policy</h2>
        <p className="privacyPolicy__section-description">We may update this Privacy Policy from time to time. The updated policy will be posted on our website with the "Effective Date" noted at the top. We encourage you to review this policy periodically.</p>
      </section>

      {/* Section: Contact Info */}
      <section className="privacyPolicy__section">
        <h2 className="privacyPolicy__section-title">Contact Us</h2>
        <p className="privacyPolicy__section-description">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <address>
          Email:{" "}
          <a className="privacyPolicy__section-link" href="mailto:contact.sktech247@gmail.com">
            contact.sktech247@gmail.com
          </a>
          <br />
          Phone:{" "}
          <a className="privacyPolicy__section-link" href="tel:+0 999 999 9999">
            +0 999 999 9999
          </a>
          <br />
          Address:{" "}
          <a
            className="privacyPolicy__section-link"
            href="https://maps.app.goo.gl/mnbypunD94D24P429"
            target="_blank"
            rel="noopener noreferrer"
          >
            20 Quantum House, Shoreditch High Street, London, E1 6PJ, United Kingdom
          </a>
        </address>
      </section>
    </main>
  );
};