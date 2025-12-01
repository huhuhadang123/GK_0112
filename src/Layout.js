import "./assets/css/layout.css";
import logo from "./assets/images/logo2.png";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  // Giả lập số lượng sản phẩm trong giỏ hàng
  const [cartCount, setCartCount] = useState(3);

  return (
    <div>
      <header>
        <div id="header" className="header">
          <div id="banner" className="banner">
            {/* Logo Container */}
            <div id="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>

            {/* Menu Container */}
            <nav id="menutrai">
              <ul className="menutrai">
                <li>
                  <a href="/" className="menutrai">
                    TRANG CHỦ
                  </a>
                </li>
                <li>
                  <a className="menutrai" href="/ListSanPham">
                    SẢN PHẨM
                  </a>
                </li>
                <li>
                  <a className="menutrai" href="/trang2">
                    SINH VIÊN
                  </a>
                </li>
                <li>
                  <a className="menutrai" href="/ListProduct">
                    ListProduct
                  </a>
                </li>
                <li>
                  <a className="menutrai" href="/LoginPage">
                    ĐĂNG NHẬP
                  </a>
                </li>
                <li>
                  <a className="menutrai" href="/ListProducts_SP_Admin">
                    QUẢN TRỊ
                  </a>
                </li>
              </ul>
            </nav>

            {/* Search Bar + Giỏ hàng */}
            <div id="search-cart">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
              />
              <button className="search-btn">Tìm</button>

              {/* Giỏ hàng */}
              <div className="cart-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="cart-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .485.379L3.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 1.607 0 1zM5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                <span className="cart-count">{cartCount}</span>
              </div>
            </div>
          </div>
          <div id="menubar" className="menubar"></div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>{/* Footer content here */}</footer>
    </div>
  );
};

export default Layout;
