import React, { useState, useEffect } from "react";
import "./css/main.css";
import { useNavigate } from "react-router-dom";
import ListProduct from "./ListProduct";
// 🖼 Banner quảng cáo
import banner1 from "./assets/images/banner1.jpg";
import banner2 from "./assets/images/bannerst.png";
import banner3 from "./assets/images/bannerst2.webp";

// 🧢 Ảnh sản phẩm mẫu
import sp1 from "./assets/images/NikeAirZoom.jpg";
import sp2 from "./assets/images/banner2.jpg";
import sp3 from "./assets/images/banner3.jpg";
import sp4 from "./assets/images/ConverseClassic.jpg";

const Home = () => {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // ✅ thêm dòng này

  // 🕒 Tự động đổi ảnh sau 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  // 👉 Chuyển ảnh tiếp theo
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // 👈 Chuyển ảnh trước đó
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // 📦 Danh sách sản phẩm nổi bật
  const products = [
    { id: 1, name: "Nike Air Zoom", price: "2.450.000đ", image: sp1 },
    { id: 2, name: "Adidas Ultraboost", price: "3.200.000đ", image: sp2 },
    { id: 3, name: "Puma RS-X", price: "2.850.000đ", image: sp3 },
    { id: 4, name: "Converse Classic", price: "1.200.000đ", image: sp4 },
  ];

  return (
    <div className="home-page">
      <h1 className="title">Store Giày Chính Hãng</h1>

      {/* 🖼 Banner quảng cáo */}
      <div className="slideshow-container">
        <div className="slideshow-wrapper">
          <button className="arrow left" onClick={prevSlide}>
            ❮
          </button>
          <img
            src={banners[index]}
            alt="Quảng cáo giày"
            className="slideshow-image"
          />
          <button className="arrow right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      {/* 🌟 Sản phẩm nổi bật */}
      <h2 className="section-title">✨ Sản Phẩm Nổi Bật ✨</h2>
      <div className="product-list">
        {products.map((item) => (
          <div
            className="product-card"
            key={item.id}
            onClick={() => navigate(`/sanpham/${item.id}`)} // ✅ thêm sự kiện click
            style={{ cursor: "pointer" }} // ✅ đổi con trỏ chuột
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <button className="btn-buy">Mua ngay</button>
          </div>
        ))}
      </div>

      <ListProduct />

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-container">
          {/* Cột 1: Giới thiệu */}
          <div className="footer-section">
            <h3>Store Giày Chính Hãng</h3>
            <p>
              Cung cấp giày thể thao chính hãng từ Nike, Adidas, Puma, Converse.
              Cam kết 100% hàng thật – đổi trả miễn phí trong 7 ngày.
            </p>
          </div>

          {/* Cột 2: Liên hệ */}
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <ul>
              <li>🏠 123 Nguyễn Trãi, Quận 1, TP.HCM</li>
              <li>📞 0901 234 567</li>
              <li>✉️ contact@storegiay.vn</li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <ul>
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">Sản phẩm</a>
              </li>
              <li>
                <a href="#">Khuyến mãi</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Store Giày Chính Hãng | Thiết kế bởi Lem Lem 💙</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
