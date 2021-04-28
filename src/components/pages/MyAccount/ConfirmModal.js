import React from 'react';
import styles from './ConfirmModal.module.css';
import useClickOutside from '../../ClickOutside/ClickOutside';

const ConfirmModal = ({ question, confirm, close }) => {
  const domNode = useClickOutside(() => {
    close();
  });
  return (
    <div className={styles.container}>
      <div ref={domNode} className={styles.modal}>
        <h1 className={styles.question}>{question}</h1>
        <article className={styles.btnArea}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => close()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.btnConfirm}
            onClick={() => {
              confirm();
              close();
            }}
          >
            Confirmar
          </button>
        </article>
      </div>
    </div>
  );
};

export default ConfirmModal;
