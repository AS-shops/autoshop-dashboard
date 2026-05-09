import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import autoshopLogo from "../assets/autoshop.jpg";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img
            src={autoshopLogo}
            alt="AutoShop Logo"
            className={styles.logoImage}
          />
          <div className={styles.logoText}>
            <h1>AutoShop</h1>
            <p>Dashboard</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <Link
            to="/dashboard"
            className={`${styles.navItem} ${isActive("/dashboard") ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>📊</span>
            Dashboard
          </Link>
          <Link
            to="/contracts"
            className={`${styles.navItem} ${isActive("/contracts") ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>📄</span>
            Contracts
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <h2>Auto Shop Management</h2>
          <div className={styles.userInfo}>
            <span>Admin</span>
          </div>
        </header>
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
