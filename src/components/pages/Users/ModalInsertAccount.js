import React from 'react';
import styles from './ModalInsertAccount.module.css';
import stylesModalInsert from '../Books/ModalInsert.module.css';
import FormModalInsertAccount from './FormModalInsertAccount';
import useClickOutside from '../../ClickOutside/ClickOutside';

const ModalInsertAccount = ({ setShowInsertModal }) => {
  const domNode = useClickOutside(() => {
    setShowInsertModal(false);
  });

  function handleSubmit() {}
  return (
    <div className={stylesModalInsert.modalArea}>
      <div className={stylesModalInsert.modal} ref={domNode}>
        <section className={styles.formArea}>
          <FormModalInsertAccount handleSubmit={handleSubmit} />
        </section>
      </div>
    </div>
  );
};

export default ModalInsertAccount;
