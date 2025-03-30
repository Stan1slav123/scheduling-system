// Import the SCSS stylesheet for the Footer component
import "./Footer.scss"

// Define and export the Footer component
export const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2024 SK NextGen Technologies</p>
      <p className="footer__links">
        <a className="footer__link" href="/privacy-policy">Privacy Policy</a>
        {" | "}
        <a className="footer__link" href="/terms-of-service">Terms of Service</a>
      </p>
    </footer>
  )
}