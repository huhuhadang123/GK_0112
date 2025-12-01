import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";

const ListSanPham = () => {
  const navigate = useNavigate();

  const cardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const cardHover = {
    transform: "translateY(-6px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={cardStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, cardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, cardStyle);
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#222",
                minHeight: "40px",
              }}
            >
              {p.title}
            </h4>
            <p
              style={{
                color: "#ff4d4f",
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "8px",
              }}
            >
              ${p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSanPham;
