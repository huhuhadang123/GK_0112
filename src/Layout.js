import "./assets/css/layout.css";
import logo from "./assets/images/logohaidang.jpg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header id="header" className="header">
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          crossOrigin="anonymous"
        />

        <div>
          {/* TOP BAR */}
          <div id="topbar" className="topbar">
            <nav id="topnav">
              <ul className="topnav-list">
                <li>
                  <a className="nav-link cart-link" href="/giohang">
                    <i className="fa-solid fa-cart-plus"></i>
                  </a>
                </li>

                <li>
                  <a
                    className="nav-link admin-link"
                    href="/ListProducts_SP_Admin"
                  >
                    QUẢN LÝ SẢN PHẨM
                  </a>
                </li>

                <li>
                  <a className="nav-link login-link" href="/LoginPage">
                    <i className="fas fa-user"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* BANNER CHÍNH */}
          <div id="banner" className="banner">
            {/* Cột logo */}
            <div className="logo-container">
              <a href="/">
                <img src={logo} alt="Logo" className="logo" />
              </a>
            </div>

            {/* MENU TRÁI */}
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai">
                  <li className="menutrai-list__item">
                    <a href="/" className="menutrai-link">
                      TRANG CHỦ
                    </a>
                  </li>

                  {/* MENU SẢN PHẨM — CÓ SUBMENU */}
                  <li className="menutrai-list__item menu-has-child">
                    <a className="menutrai-link" href="/trang1">
                      SẢN PHẨM
                    </a>

                    {/* SUBMENU */}
                    <ul className="submenu">
                      <li>
                        <a href="/dongho-nam">Đồng hồ Nam</a>
                      </li>
                      <li>
                        <a href="/dongho-nu">Đồng hồ Nữ</a>
                      </li>
                    </ul>
                  </li>

                  <li className="menutrai-list__item">
                    <a className="menutrai-link" href="/trang2">
                      SINH VIÊN
                    </a>
                  </li>

                  <li className="menutrai-list__item">
                    <a className="menutrai-link" href="/Listsanpham">
                      DANH SÁCH SẢN PHẨM
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* TÌM KIẾM */}
            <div className="search-container">
              <form className="search-form">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* OUTLET */}
      <div className="outlet-container">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="footer-clothing">
        <div className="footer-container">
          <div className="footer-section info">
            <h3>Store Đồng Hồ Chính Hãng</h3>
            <p>
              Chuyên cung cấp Đồng Hồ & Phụ Kiện cao cấp từ các thương hiệu hàng
              đầu. Cam kết 100% chính hãng & bảo hành đầy đủ.
            </p>
          </div>

          <div className="footer-section contact">
            <h3>Liên hệ</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> số 33 đường Vĩnh Viễn,
                phường Vườn Lài, Quận 10, TP.HCM
              </li>
              <li>
                <i className="fas fa-phone"></i> 0901 234 567
              </li>
              <li>
                <i className="fas fa-envelope"></i> 23662054@kthcm.edu.vn
              </li>
            </ul>
          </div>

          <div className="footer-section links">
            <h3>Hỗ trợ</h3>
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/trang1">Bộ Sưu Tập</a>
              </li>
              <li>
                <a href="/trang2">Tin tức & Blog</a>
              </li>
              <li>
                <a href="/Listsanpham">Danh Sách Sản Phẩm</a>
              </li>
            </ul>
          </div>

          <div className="footer-section categories">
            <h3>Danh mục</h3>
            <ul>
              <li>
                <a href="/dongho-nam">Đồng hồ Nam</a>
              </li>
              <li>
                <a href="/dongho-nu">Đồng hồ Nữ</a>
              </li>
              <li>
                <a href="#">Phụ kiện Dây đeo</a>
              </li>
              <li>
                <a href="#">Thương hiệu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Store Đồng Hồ. All Rights Reserved. | Thiết kế bởi Đăng
            💙
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
