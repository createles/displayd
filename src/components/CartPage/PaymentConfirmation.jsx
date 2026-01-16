import styles from "./PaymentConfirmation.module.css"


function PaymentConfirmation({hideConfirm}) {
    return (
      <div className={styles.confirmModal}>
        <div className={styles.confirmCont}>
          <p> This is a non-commercial website and no payments have been made. Thanks for checking it out! </p>
          <button type="button" onClick={hideConfirm}> close </button>
        </div>
      </div>
    )
}

export default PaymentConfirmation;