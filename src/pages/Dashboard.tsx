import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contractService, Contract } from "../services/api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const data = await contractService.getAll();
      setContracts(data);
    } catch (error) {
      console.error("Failed to load contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalContracts = contracts.length;
  const recentContracts = contracts.slice(-5).reverse();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("my-MM", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Welcome to AutoShop Contract Management</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📄</div>
          <div className={styles.statContent}>
            <h3>{totalContracts}</h3>
            <p>Total Contracts</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <h3>{totalContracts}</h3>
            <p>Signed Agreements</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏢</div>
          <div className={styles.statContent}>
            <h3>{new Set(contracts.map((c) => c.businessName)).size}</h3>
            <p>Business Partners</p>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Contracts</h2>
          <Link to="/contracts" className={styles.viewAll}>
            View All
          </Link>
        </div>
        <div className={styles.recentList}>
          {recentContracts.length === 0 ? (
            <p className={styles.noData}>No contracts yet</p>
          ) : (
            recentContracts.map((contract) => (
              <Link
                key={contract.id}
                to={`/contracts/${contract.id}`}
                className={styles.recentItem}
              >
                <div className={styles.recentInfo}>
                  <h4>{contract.fullName}</h4>
                  <p>
                    {contract.businessName} - {contract.position}
                  </p>
                </div>
                <span className={styles.recentDate}>
                  {contract.createdAt ? formatDate(contract.createdAt) : "N/A"}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
