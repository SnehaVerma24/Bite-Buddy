import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Title = () => {
  return (
    <Link to="/" className="logo-items">
      <img
        data-testid="logo"
        className="logo"
        alt="logo"
        src="https://icon-library.com/images/food-app-icon/food-app-icon-0.jpg"
      />
      <p className="logo-text colblack">Bite Buddy.</p>
    </Link>
  );

  
};

const Header = () => {
  const cartCount = useSelector((store) => store.cart.totalItemsCount);

  const location = useLocation();
  // console.log(location.pathname);

  return (
    <div className="header">
      <div className="header-items">
        <Title />
        <div className="navigation-menu">
          <div className="nav-items">
            <ul>
              <li>
                <NavLink to="/contact">Offers</NavLink>
              </li>

              <li className="cart-logo">
                {location.pathname !== "/checkout" &&
                  location.pathname !== "/order-summary" && (
                    <Link to="/cart" className="cart-logo">
                      {cartCount > 0 ? (
                        <span className="cart-logo-span">
                          <svg
                            class="cart-full"
                            viewBox="-1 0 37 32"
                            height="20"
                            width="20"
                            fill="#686b78"
                          >
                            <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                          </svg>
                          <span
                            data-testid="cart"
                            className="cart-count cart-full-no"
                          >
                            {cartCount}
                          </span>{" "}
                        </span>
                      ) : (
                        <span className="cart-logo-span">
                          <svg
                            class="cart-empty"
                            viewBox="-1 0 37 32"
                            height="20"
                            width="20"
                            fill="#686b78"
                          >
                            <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                          </svg>
                          <span data-testid="cart" className="cart-count">
                            {cartCount}
                          </span>{" "}
                        </span>
                      )}
                      Cart
                    </Link>
                  )}{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
