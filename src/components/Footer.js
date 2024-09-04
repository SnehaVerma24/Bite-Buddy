import { NavLink, Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer">
      <p data-testid="footer-logo" className="paragraph colwhite">
        Bite Buddy.
      </p>
      <p className="paragraph colwhite">
        Developed by Sneha and Team{" "}
      </p>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/about">
          <li>About</li>
        </NavLink>
        <NavLink to="/contact">
          <li>Contact</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Footer;
