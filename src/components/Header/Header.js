import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOff } from '../../redux';
import { FiLogIn } from 'react-icons/fi';
import { CgLogOff } from 'react-icons/cg';
import { MdAssignmentInd } from 'react-icons/md';

const Header = () => {
  const { permissions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.leftContent}>
          {permissions.id === -1 && (
            <>
              <Link to="/" className={styles.login}>
                Login
                <FiLogIn size={20} />
              </Link>
              <Link to="/cadastro" className={styles.create}>
                Criar conta
                <MdAssignmentInd size={20} />
              </Link>
            </>
          )}
        </div>
        <div className={styles.mainNavigation}>
          {permissions.typeAccount !== 0 && permissions.typeAccount !== 1 && (
            <Link to="/principal">Home</Link>
          )}
          {permissions.typeAccount !== 2 && (
            <>
              <Link to="/produtos">Produtos</Link>
              <Link to="/usuarios">Usuários</Link>
            </>
          )}
        </div>
        <div className={styles.rightContent}>
          {permissions.id !== -1 && (
            <Link
              to="/"
              onClick={() => {
                dispatch(logOff());
                localStorage.removeItem('token');
              }}
              className={styles.logoff}
            >
              Sair
              <CgLogOff size={20} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
