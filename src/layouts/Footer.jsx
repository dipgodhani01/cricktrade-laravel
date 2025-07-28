import { Link } from "react-router-dom";
import icon from "../assets/icon2.png";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 pt-5">
        <div className="">
          <img src={icon} alt="" className="mx-auto mb-2" />
          <div className="text-center p-4 ">
            <ul className="flex sm:flex-row flex-col sm:gap-8 gap-2 flex-wrap justify-center">
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/refund-cancellation">Refunds and Cancellation</Link>
              </li>
              <li>
                <Link to="contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <p className="text-gray-300">
              Experience the thrill of live cricket auctions, build your dream
              team, and compete with others in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black text-center text-sm text-gray-400 pb-4 p-4">
        © {new Date().getFullYear()} Cricktrade. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
