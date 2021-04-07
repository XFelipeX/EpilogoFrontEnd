import React from 'react';
import useClickOutside from '../../ClickOutside/ClickOutside';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ question, confirm, setShowConfirmModal }) => {
  const domNode = useClickOutside(() => {
    setShowConfirmModal(false);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={domNode}>
        <h2 className={styles.question}>{question}</h2>
        <article className={styles.buttons}>
          <button type="button" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </button>
          <button type="button" onClick={() => confirm()}>
            Confirmar
          </button>
        </article>
      </div>
    </div>
  );
};

export default ConfirmModal;
