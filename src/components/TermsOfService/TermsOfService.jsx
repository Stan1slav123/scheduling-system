// Import SCSS styles for the Terms of Service page
import "./TermsOfService.scss";

// Component that displays the Terms of Service of the application
export const TermsOfService = () => {
  return (
    <main className="termsOfService">
      {/* Page header with title and effective date */}
      <div className="termsOfService__header">
        <h1 className="termsOfService__header-title">Terms of Service for SK</h1>
        <p className="termsOfService__header-text">
          <span className="termsOfService__section-list--bold">Effective Date:</span> 07.09.2024
        </p>
      </div>

      {/* Section: Acceptance of Terms */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Acceptance of Terms</h2>
        <p className="termsOfService__section-description">
          By accessing or using our website and services, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
        </p>
      </section>

      {/* Section: Services */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Services</h2>
        <p className="termsOfService__section-description">
          <span className="termsOfService__section-list--bold">SK</span> provides web development and IT consulting services. We reserve the right to modify or discontinue our services at any time without notice.
        </p>
      </section>

      {/* Section: User Responsibilities */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">User Responsibilities</h2>
        <ul className="termsOfService__section-list">
          <li><span className="termsOfService__section-list--bold">Eligibility:</span> You must be at least 18 years old to use our services.</li>
          <li><span className="termsOfService__section-list--bold">Account:</span> You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
          <li><span className="termsOfService__section-list--bold">Prohibited Activities:</span> You agree not to use our services for any unlawful purpose or to engage in any activity that could damage, disable, overburden, or impair our services.</li>
        </ul>
      </section>

      {/* Section: Intellectual Property */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Intellectual Property</h2>
        <p className="termsOfService__section-description">
          All content and materials provided by <span className="termsOfService__section-list--bold">SK</span> are owned by us or our licensors and are protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works from any content without our express written permission.
        </p>
      </section>

      {/* Section: Limitation of Liability */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Limitation of Liability</h2>
        <p className="termsOfService__section-description">
          To the maximum extent permitted by law, <span className="termsOfService__section-list--bold">SK</span> shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of our services, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      {/* Section: Indemnification */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Indemnification</h2>
        <p className="termsOfService__section-description">
          You agree to indemnify, defend, and hold harmless <span className="termsOfService__section-list--bold">SK</span>, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or related to your use of our services or any violation of these Terms of Service.
        </p>
      </section>

      {/* Section: Termination */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Termination</h2>
        <p className="termsOfService__section-description">
          We may terminate or suspend your access to our services at any time, with or without cause, and with or without notice, including if we believe you have violated these Terms of Service.
        </p>
      </section>

      {/* Section: Changes to Terms */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Changes to Terms</h2>
        <p className="termsOfService__section-description">
          We reserve the right to update or modify these Terms of Service at any time. Any changes will be effective when we post the revised terms on our website. Your continued use of our services constitutes your acceptance of the updated terms.
        </p>
      </section>

      {/* Section: Governing Law */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Governing Law</h2>
        <p className="termsOfService__section-description">
          These Terms of Service are governed by and construed in accordance with the laws of your jurisdiction. Any disputes shall be resolved in the courts located in your jurisdiction.
        </p>
      </section>

      {/* Section: Contact Information */}
      <section className="termsOfService__section">
        <h2 className="termsOfService__section-title">Contact Information</h2>
        <p className="termsOfService__section-description">
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </p>
        <address>
          Email: <a className="termsOfService__section-link" href="mailto:contact.sktech247@gmail.com">contact.sktech247@gmail.com</a><br />
          Phone: <a className="termsOfService__section-link" href="tel:+0 999 999 9999">+0 999 999 9999</a><br />
          Address: <a className="termsOfService__section-link" href="https://maps.app.goo.gl/mnbypunD94D24P429" target="_blank" rel="noopener noreferrer">20 Quantum House, Shoreditch High Street, London, E1 6PJ, United Kingdom</a>
        </address>
      </section>
    </main>
  );
};