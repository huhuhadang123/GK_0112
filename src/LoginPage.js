import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // Giả định file này tồn tại và được cấu hình

const LoginPage = () => {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // 💖 THAY ĐỔI CHỦ ĐỀ SANG GLASSMORPHISM VÀ VIBRANT COLORS
  const VIBRANT_COLOR_1 = "rgba(0, 150, 255, 0.8)"; // Blue sáng
  const VIBRANT_COLOR_2 = "rgba(255, 0, 150, 0.8)"; // Hồng sáng
  const GRADIENT_BG = "linear-gradient(135deg, #e0f7fa, #fce4ec)"; // Nền tổng thể nhẹ nhàng, có gradient
  const CARD_BG = "rgba(255, 255, 255, 0.15)"; // Nền card trong suốt
  const TEXT_COLOR = "#333333";
  const LIGHT_TEXT_COLOR = "#ffffff";
  const ACCENT_COLOR = "#0077b6"; // Xanh đậm làm điểm nhấn

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: GRADIENT_BG,
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  };

  // Vị trí các hình tròn phát sáng (Chỉ để trang trí)
  const sphereStyle = (top, left, color) => ({
    position: "absolute",
    top: top,
    left: left,
    width: "300px",
    height: "300px",
    background: color,
    borderRadius: "50%",
    filter: "blur(150px)",
    zIndex: 0,
    opacity: 0.6,
  });

  // Style chính của Glassmorphism Card (Lung linh, tinh tế)
  const cardStyle = {
    maxWidth: "420px",
    width: "100%",
    padding: "40px",
    borderRadius: "20px",
    background: CARD_BG,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(10px)", // Mờ nền phía sau
    border: "1px solid rgba(255, 255, 255, 0.18)",
    zIndex: 1, // Đảm bảo card nằm trên các hình tròn phát sáng
    color: TEXT_COLOR,
    textAlign: "center",
  };

  const inputStyle = {
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    background: "rgba(255, 255, 255, 0.2)", // Input trong suốt nhẹ
    color: TEXT_COLOR,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    "::placeholder": {
      color: "rgba(51, 51, 51, 0.7)",
    },
  };

  const buttonBaseStyle = {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    letterSpacing: "1px",
    transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const primaryButtonStyle = {
    ...buttonBaseStyle,
    background: `linear-gradient(45deg, ${ACCENT_COLOR}, #00b4d8)`,
    color: LIGHT_TEXT_COLOR,
  };

  const tabButtonStyle = (isActive) => ({
    ...buttonBaseStyle,
    flex: 1,
    margin: "0 5px",
    padding: "12px 0",
    borderRadius: "10px",
    background: isActive ? ACCENT_COLOR : "rgba(255, 255, 255, 0.1)",
    color: isActive ? LIGHT_TEXT_COLOR : ACCENT_COLOR,
    fontWeight: "600",
    border: isActive
      ? `1px solid ${ACCENT_COLOR}`
      : "1px solid rgba(0, 0, 0, 0.1)",
  });

  // --- Logic (Không thay đổi) ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập đầy đủ Username và Password!");
        setLoading(false);
        return;
      }
      const { data: dbUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (error) throw error;
      if (!dbUser) {
        alert("❌ Tài khoản không tồn tại!");
        setLoading(false);
        return;
      }
      if (dbUser.password !== password) {
        alert("❌ Mật khẩu không chính xác!");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(dbUser));
      setUser(dbUser);
      alert(`✅ Chào mừng ${dbUser.fullname || dbUser.username}!`);
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi đăng nhập. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập đầy đủ Username và Password!");
        setLoading(false);
        return;
      }
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (existingUser) {
        alert("❌ Username đã tồn tại! Vui lòng chọn tên khác.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("users").insert([
        {
          username: username.trim().toLowerCase(),
          password,
          fullname: fullname.trim(),
          email: email.trim(),
        },
      ]);

      if (error) throw error;
      alert("✅ Đăng ký thành công! Hãy đăng nhập.");
      setTab("login");
      setUsername("");
      setPassword("");
      setFullname("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("⚠️ Có lỗi xảy ra khi đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
    setPassword("");
    setFullname("");
    setEmail("");
    setTab("login");
    alert("👋 Bạn đã đăng xuất.");
  };

  // --- Render Giao diện Glassmorphism (Không có "PORTAL ACCESS") ---

  return (
    <div style={containerStyle}>
      {/* 🔮 Các hình tròn phát sáng */}
      <div style={sphereStyle("10%", "10%", VIBRANT_COLOR_1)}></div>
      <div style={sphereStyle("70%", "80%", VIBRANT_COLOR_2)}></div>
      <div style={sphereStyle("50%", "30%", "rgba(255, 255, 255, 0.4)")}></div>

      <div style={cardStyle}>
        {user ? (
          <div style={{ padding: "10px 0" }}>
            <h2
              style={{
                color: ACCENT_COLOR,
                marginBottom: "5px",
                fontSize: "1.8rem",
              }}
            >
              ✨ Đăng nhập thành công!
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "5px",
                color: TEXT_COLOR,
              }}
            >
              Chào mừng, {user.fullname || user.username}
            </p>
            <p
              style={{ color: TEXT_COLOR, opacity: 0.7, marginBottom: "30px" }}
            >
              Chúc bạn có một trải nghiệm tuyệt vời.
            </p>
            <button
              onClick={handleLogout}
              style={{
                ...primaryButtonStyle,
                background: "linear-gradient(45deg, #e74c3c, #c0392b)", // Màu đỏ cho Đăng xuất
              }}
            >
              <span role="img" aria-label="logout">
                👋
              </span>{" "}
              ĐĂNG XUẤT
            </button>
          </div>
        ) : (
          <>
            {/* Đã xóa <h1 style={{ marginBottom: "30px", fontSize: "2rem", color: ACCENT_COLOR, fontWeight: "800" }}> PORTAL ACCESS </h1> */}

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
                marginTop: "10px", // Điều chỉnh khoảng cách nếu cần
              }}
            >
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={tabButtonStyle(tab === t)}
                >
                  {t === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={tab === "login" ? handleLogin : handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <input
                type="text"
                placeholder="Tên người dùng (Username)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Mật khẩu (Password)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
              {tab === "register" && (
                <>
                  <input
                    type="text"
                    placeholder="Họ và tên (Tùy chọn)"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Email (Tùy chọn)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                style={primaryButtonStyle}
              >
                {loading
                  ? "⏳ ĐANG XỬ LÝ..."
                  : tab === "login"
                  ? "ĐĂNG NHẬP"
                  : "ĐĂNG KÝ TÀI KHOẢN"}
              </button>
            </form>
            <p
              style={{
                color: TEXT_COLOR,
                opacity: 0.6,
                fontSize: "0.8rem",
                marginTop: "20px",
              }}
            >
              Hãy đăng nhập để truy cập hệ thống.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
