import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { contractService, Contract } from "../services/api";
import styles from "./ContractDetail.module.css";

const ContractDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadContract(id);
  }, [id]);

  const loadContract = async (contractId: string) => {
    try {
      const data = await contractService.getById(contractId);
      setContract(data);
    } catch (error) {
      console.error("Failed to load contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("my-MM", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!contract) {
    return <div className={styles.notFound}>Contract not found</div>;
  }

  return (
    <div className={styles.contractDetail}>
      <div className={styles.pageHeader}>
        <Link to="/contracts" className={styles.backLink}>
          ← Back to List
        </Link>
        <h1>Contract Details</h1>
      </div>

      <div className={styles.detailCard}>
        <div className={styles.cardHeader}>
          <span className={styles.contractId}>Contract #{contract.id}</span>
          <span className={styles.contractDate}>
            {formatDate(contract.timestamp)}
          </span>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>Full Name</label>
            <span>{contract.fullName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Phone Number</label>
            <span>{contract.phoneNumber}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Position</label>
            <span>{contract.position}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Business Name</label>
            <span>{contract.businessName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Subscription Plan</label>
            <span>
              {contract.plan
                ? contract.plan.charAt(0).toUpperCase() + contract.plan.slice(1)
                : "Not specified"}
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>Start Date</label>
            <span>
              {contract.startDate
                ? new Date(contract.startDate).toLocaleDateString()
                : "Not specified"}
            </span>
          </div>
        </div>

        <div className={styles.signatureSection}>
          <h3>Digital Signature</h3>
          <div className={styles.signaturePreview}>
            <img src={contract.signature} alt="Signature" />
          </div>
        </div>

        <div className={styles.termsSection}>
          <h3>Agreement Status</h3>
          <div className={styles.statusBadge}>
            <span className={styles.checkIcon}>✓</span>
            Terms Accepted
          </div>
          <p className={styles.agreementText}>
            {contract.agreed
              ? "Customer has agreed to all terms and conditions."
              : "Terms not agreed."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
