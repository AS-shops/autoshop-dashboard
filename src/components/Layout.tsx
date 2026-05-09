import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.logoIcon}>⚙️</span>
                    <div className={styles.logoText}>
                        <h1>OTAS Tech</h1>
                        <p>Dashboard</p>
                    </div>
                </div>
                <nav className={styles.sidebarNav}>
                    <Link to="/dashboard" className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}>
                        <span className={styles.navIcon}>📊</span>
                        Dashboard
                    </Link>
                    <Link to="/contracts" className={`${styles.navItem} ${isActive('/contracts') ? styles.active : ''}`}>
                        <span className={styles.navIcon}>📄</span>
                        Contracts
                    </Link>
                </nav>
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