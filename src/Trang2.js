import React from "react";
import anhsinhvien from "./assets/images/anhsinhvien.jpg"; // ✅ import ảnh

const sinhviens = [
  {
    id: 1,
    ten: "Trần Thanh Lâm",
    diachi: "TP. Hồ Chí Minh",
    email: "23662013@kthcm.edu.vn",
    anh: anhsinhvien, // ✅ dùng biến import
  },
];

const Trang2 = () => {
  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "26px",
          color: "#333",
        }}
      >
        👨‍🎓 Danh sách sinh viên
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {sinhviens.map((sv) => (
          <div
            key={sv.id}
            style={{
              width: "220px",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={sv.anh}
              alt={sv.ten}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            />
            <div style={{ padding: "12px" }}>
              <h4 style={{ fontSize: "18px", margin: "6px 0", color: "#222" }}>
                {sv.ten}
              </h4>
              <p style={{ margin: "4px 0", color: "#555" }}>{sv.diachi}</p>
              <p
                style={{
                  margin: "4px 0",
                  color: "#007bff",
                  fontSize: "14px",
                }}
              >
                {sv.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trang2;
