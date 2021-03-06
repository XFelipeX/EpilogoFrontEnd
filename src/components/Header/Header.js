import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOff } from '../../redux';
import { FiLogIn } from 'react-icons/fi';
import { CgLogOff } from 'react-icons/cg';
import { FaCartArrowDown } from 'react-icons/fa';
import { RiAccountPinBoxFill } from 'react-icons/ri';
import { MdAssignmentInd } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  const { permissions } = useSelector((state) => state);
  const { stateCart } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    history.push(path);
  }

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
          {permissions.typeAccount === 2 && permissions.id !== -1 && (
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <RiAccountPinBoxFill size={50} />
                <span>Olá, {permissions.user.userName}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/minhaconta" onClick={handleClick}>
                  Minha Conta
                </Dropdown.Item>
                <Dropdown.Item href="/pedidos" onClick={handleClick}>
                  Pedidos
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    dispatch(logOff());
                    history.push('/');
                    localStorage.removeItem('token');
                  }}
                >
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className={styles.mainNavigation}>
          {permissions.typeAccount !== 0 && permissions.typeAccount !== 1 && (
            <Link to="/principal">Página Principal</Link>
          )}
          {permissions.typeAccount !== 2 && (
            <>
              <Link to="/produtos">Produtos</Link>
              <Link to="/usuarios">Usuários</Link>
              <Link to="/pedidos">Pedidos</Link>
            </>
          )}
        </div>
        <div className={styles.rightContent}>
          {permissions.id !== -1 && permissions.typeAccount !== 2 && (
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

          {permissions.typeAccount === 2 && (
            <div className={styles.cartArea}>
              {stateCart.subtotal > 0 && (
                <span className={styles.details}>
                  <ul>
                    {stateCart.products.map((product, index) => (
                      <li
                        key={product.id}
                        style={
                          index % 2 === 0 ? { backgroundColor: '#dfdfe5' } : {}
                        }
                      >
                        <span className={styles.imgCart}>
                          <img
                            src={`data:image/jpg;base64,${product.img}`}
                            alt=""
                          />
                        </span>
                        <span className={styles.titleCart}>
                          {product.nameBook}
                        </span>
                        <span className={styles.quantityCart}>
                          Qtd {product.quantity}
                        </span>
                        <span className={styles.priceCart}>
                          R$ {product.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.bottomArea}>
                    <span className={styles.subtotal}>
                      Subtotal: R$ {stateCart.subtotal}
                    </span>
                    <button
                      type="button"
                      onClick={() => history.push('/carrinho')}
                    >
                      Ir - Carrinho
                    </button>
                  </div>
                </span>
              )}
              <Link to="/carrinho" className={styles.cart}>
                <FaCartArrowDown size={35} />
              </Link>
              <span
                className={styles.amount}
                style={
                  stateCart.amount === 0
                    ? { backgroundColor: 'transparent', color: 'transparent' }
                    : {}
                }
              >
                {stateCart.amount}
              </span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
