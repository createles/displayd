import styles from "./ToastNotif.module.css"

function ToastNotif({ message, onClose }) {
  
  // don't show unless item added to cart
  if (!message) return null;

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastContent}>
        <span className={styles.checkmark}>✓</span>
        <p>{message}</p>
        <button className={styles.closeBtn} onClick={onClose}>x</button>
      </div>
      <div className={styles.progressBar}></div>
    </div>
  )
}

export default ToastNotif;