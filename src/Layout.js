import "./assets/css/layout.css";
import logo from "./assets/images/logo2.png";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  return (
    <>
      <header id="header" className="header">
        {/* Link Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <div>
          {/* THANH TOP BAR */}
          <div id="topbar" className="topbar">
            <nav id="topnav">
              <ul className="topnav-list">
                {/* Giỏ Hàng */}
                <li>
                  <a className="nav-link cart-link" href="/giohang">
                    <i className="fa-solid fa-cart-plus"></i>
                  </a>
                </li>
                {/* Quản lý Sản phẩm */}
                <li>
                  <a
                    className="nav-link admin-link"
                    href="/ListProducts_SP_Admin"
                  >
                    QUẢN LÝ SẢN PHẨM
                  </a>
                </li>
                {/* Đăng Nhập */}
                <li>
                  <a className="nav-link login-link" href="/LoginPage">
                    <i className="fas fa-user"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* BANNER CHÍNH - Logo, Menu Chính, Tìm kiếm */}
          <div id="banner" className="banner">
            {/* Cột 1: Logo */}
            <div className="logo-container">
              <a href="/">
                <img src={logo} alt="Logo" className="logo" />
              </a>
            </div>

            {/* Cột 2: Menu Chính (Menutrai) - ĐÃ SỬA CHỮA LỖI DÍNH CHỮ */}
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai">
                  {/* QUAN TRỌNG: ĐÃ THÊM class menutrai-list__item vào đây */}
                  <li className="menutrai-list__item">
                    <a href="/" className="menutrai-link">
                      TRANG CHỦ
                    </a>
                  </li>
                  <li className="menutrai-list__item">
                    <a className="menutrai-link" href="/trang1">
                      SẢN PHẨM
                    </a>
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

            {/* Cột 3: Thanh Tìm kiếm */}
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
            <h3>Store Quần Áo Chính Hãng</h3>
            <p>
              Chuyên cung cấp Quần Áo & Phụ Kiện thời trang cao cấp, cam kết
              100% hàng thật, chất lượng đảm bảo. Đổi trả miễn phí trong 7 ngày.
            </p>
          </div>
          <div className="footer-section contact">
            <h3>Liên hệ</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> số 33 đường Vĩnh Viễn,
                phường Vườn Lài, Quận 10, Thành phố Hồ Chí Minh
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
                <a href="./">Trang chủ</a>
              </li>
              <li>
                <a href="/trang1">Sản Phẩm</a>
              </li>
              <li>
                <a href="/trang2">Sinh Viên</a>
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
                <a href="#">Áo (Tops)</a>
              </li>
              <li>
                <a href="#">Quần (Bottoms)</a>
              </li>
              <li>
                <a href="#">Phụ kiện</a>
              </li>
              <li>
                <a href="#">Hàng mới về</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Store Quần Áo. All Rights Reserved. | Thiết kế bởi Đăng
            💙
          </p>
        </div>
      </footer>
    </>
  );
};
export default Layout;
