import React, { useState, useEffect } from "react";
import "./css/main.css";
import { useNavigate } from "react-router-dom";
import ListProduct from "./ListProduct";

// 🖼 Banner quảng cáo (Giữ nguyên các file ảnh gốc)
import banner1 from "./assets/images/dhnam.avif";
import banner2 from "./assets/images/STUHRLING.jpg";
import banner3 from "./assets/images/dhcaocap.jpg";

// 🧢 Ảnh sản phẩm mẫu (Giữ nguyên các file ảnh gốc, chỉ thay đổi tên biến)
import watchImage1 from "./assets/images/Huboler.jpg";
import watchImage2 from "./assets/images/KOI.avif";
import watchImage3 from "./assets/images/CITIZEN.avif";
import watchImage4 from "./assets/images/CASIO.avif";

const Home = () => {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

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

  // 📦 Danh sách sản phẩm đồng hồ nổi bật (Đã thay đổi dữ liệu sản phẩm)
  const products = [
    {
      id: 1,
      name: "Đồng Hồ Huboler",
      price: "6.450.000đ",
      image: watchImage1,
    },
    {
      id: 2,
      name: "Koi K001.403.642.05.01.01 ",
      price: "2.130.000 ₫",
      image: watchImage2,
    },
    {
      id: 3,
      name: "Citizen Eco-Drive BM7620-83L",
      price: "8.385.000 ₫",
      image: watchImage3,
    },
    {
      id: 4,
      name: "Casio Edifice ECB-S10DB",
      price: "7.612.000 ₫",
      image: watchImage4,
    },
  ];

  return (
    <div className="home-page">
      <h1 className="title">⌚ Store Đồng Hồ Chính Hãng ⌚</h1>

      {/* 🖼 Banner quảng cáo đồng hồ */}
      <div className="slideshow-container">
        <div className="slideshow-wrapper">
          <button className="arrow left" onClick={prevSlide}>
            ❮
          </button>
          <img
            src={banners[index]}
            alt="Quảng cáo đồng hồ" // Đã đổi alt text
            className="slideshow-image"
          />
          <button className="arrow right" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      {/* 🌟 Sản phẩm đồng hồ nổi bật */}
      <h2 className="section-title">✨ Đồng Hồ Nổi Bật ✨</h2>
      <div className="product-list">
        {products.map((item) => (
          <div
            className="product-card"
            key={item.id}
            onClick={() => navigate(`/sanpham/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Vẫn sử dụng ảnh giày/banner cũ, nhưng trong ngữ cảnh mới */}
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <button className="btn-buy">Mua ngay</button>
          </div>
        ))}
      </div>

      <ListProduct />
    </div>
  );
};

export default Home;
