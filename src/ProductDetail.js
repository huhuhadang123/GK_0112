import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "1.2rem",
          color: "#6c757d",
        }}
      >
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px", // Tăng chiều rộng tối đa
        margin: "40px auto", // Tăng margin
        padding: "30px",
        border: "none", // Loại bỏ border
        borderRadius: "12px", // Bo góc mềm mại hơn
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)", // Shadow nổi bật hơn
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#6c757d", // Màu xám trung tính cho nút quay lại
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
          fontSize: "1rem",
          transition: "background-color 0.3s ease",
          fontWeight: "600",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
      >
        ← Quay lại danh sách
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px", // Tăng khoảng cách giữa các phần
          alignItems: "flex-start",
        }}
      >
        {/* Hình ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 400px", // Tăng kích thước khu vực ảnh
            maxWidth: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f7f7f7", // Nền ảnh sáng hơn
            borderRadius: "15px", // Bo góc lớn hơn
            overflow: "hidden",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "450px", // Giới hạn chiều cao
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Thông tin chi tiết */}
        <div style={{ flex: "1 1 450px", padding: "10px 0" }}>
          <h1
            style={{
              marginBottom: "15px",
              fontSize: "2.2rem", // Tiêu đề lớn hơn
              color: "#343a40",
              fontWeight: "700",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "1.8rem", // Giá lớn và nổi bật hơn
              color: "#dc3545", // Màu đỏ nổi bật
              fontWeight: "bold",
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
            }}
          >
            ${product.price}
          </p>

          <div style={{ marginBottom: "25px" }}>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#ffc107", // Màu vàng cho rating
                fontWeight: "600",
              }}
            >
              ⭐ {product.rating_rate} / 5
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d", // Màu xám cho số lượng đánh giá
                marginTop: "5px",
              }}
            >
              ({product.rating_count} đánh giá)
            </p>
          </div>

          <h3
            style={{
              fontSize: "1.2rem",
              color: "#495057",
              marginBottom: "10px",
            }}
          >
            Mô tả sản phẩm
          </h3>
          <p
            style={{
              lineHeight: "1.8",
              color: "#495057",
              textAlign: "justify",
              marginBottom: "30px",
              fontSize: "1rem",
            }}
          >
            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
          </p>

          <button
            style={{
              backgroundColor: "#28a745", // Màu xanh lá cây nổi bật cho nút mua hàng
              color: "#fff",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "600",
              transition: "background-color 0.3s ease, transform 0.1s ease",
              boxShadow: "0 4px 10px rgba(40, 167, 69, 0.3)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#218838")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#28a745")
            }
            onClick={() => alert("Đã thêm vào giỏ hàng!")}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
