import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contractService, Contract } from "../services/api";
import styles from "./ContractList.module.css";

const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const data = await contractService.getAll();
      setContracts(data.reverse());
    } catch (error) {
      console.error("Failed to load contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPlanBadgeClass = (plan: string) => {
    const p = plan?.toLowerCase();
    if (p === "basic") return `${styles.planBadge} ${styles.planBasic}`;
    if (p === "premium") return `${styles.planBadge} ${styles.planPremium}`;
    if (p === "investment")
      return `${styles.planBadge} ${styles.planInvestment}`;
    return styles.planBadge;
  };

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.phoneNumber.includes(searchTerm) ||
      (contract.plan &&
        contract.plan.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return <div className={styles.loading}>Loading contracts...</div>;
  }

  return (
    <div className={styles.contractList}>
      <div className={styles.pageHeader}>
        <h1>Contract List</h1>
        <p>Manage all signed service agreements</p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, business, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.totalCount}>
        Total: <span>{filteredContracts.length}</span> contracts
      </div>

      <div className={styles.contractsTable}>
        <div className={styles.tableHeader}>
          <span className={styles.colName}>Full Name</span>
          <span className={styles.colBusiness}>Business</span>
          <span className={styles.colPosition}>Position</span>
          <span className={styles.colPhone}>Phone</span>
          <span className={styles.colPlan}>Plan</span>
          <span className={styles.colStartDate}>Start Date</span>
          <span className={styles.colDate}>Signed</span>
          <span className={styles.colAction}>Action</span>
        </div>
        <div className={styles.tableBody}>
          {filteredContracts.length === 0 ? (
            <div className={styles.noContracts}>No contracts found</div>
          ) : (
            filteredContracts.map((contract) => (
              <div
                key={contract._id || contract.id}
                className={styles.tableRow}
              >
                <span className={styles.colName}>{contract.fullName}</span>
                <span className={styles.colBusiness}>
                  {contract.businessName}
                </span>
                <span className={styles.colPosition}>{contract.position}</span>
                <span className={styles.colPhone}>{contract.phoneNumber}</span>
                <span className={styles.colPlan}>
                  <span className={getPlanBadgeClass(contract.plan)}>
                    {contract.plan || "N/A"}
                  </span>
                </span>
                <span className={styles.colStartDate}>
                  {contract.startDate
                    ? new Date(contract.startDate).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className={styles.colDate}>
                  {contract.createdAt ? formatDate(contract.createdAt) : "N/A"}
                </span>
                <span className={styles.colAction}>
                  <Link
                    to={`/contracts/${contract._id || contract.id}`}
                    className={styles.viewBtn}
                  >
                    View
                  </Link>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractList;
