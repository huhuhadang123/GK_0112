import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const LoginPage = () => {
  const [tab, setTab] = useState("login"); // login hoặc register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // người dùng đã đăng nhập

  useEffect(() => {
    // Kiểm tra nếu đã lưu user trong localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 🔹 Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
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

  // 🔹 Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc!");
        setLoading(false);
        return;
      }

      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (existingUser) {
        alert("❌ Username đã tồn tại!");
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

  // 🔹 Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
    setPassword("");
    setFullname("");
    setEmail("");
    setTab("login");
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
        background: "#fff",
      }}
    >
      {user ? (
        <div style={{ textAlign: "center" }}>
          <h2>Chào, {user.fullname || user.username}!</h2>
          <p>Bạn đã đăng nhập thành công.</p>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  margin: "0 5px",
                  cursor: "pointer",
                  background: tab === t ? "#0984e3" : "#dfe6e9",
                  color: tab === t ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "600",
                }}
              >
                {t === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={tab === "login" ? handleLogin : handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            {tab === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                background: "#0984e3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {loading
                ? "⏳ Đang xử lý..."
                : tab === "login"
                ? "Đăng nhập"
                : "Đăng ký"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
