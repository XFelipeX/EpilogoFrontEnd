import React from 'react';
import stylesConfirmDemand from '../Cart/ConfirmDemandModal.module.css';
import stylesItens from '../Cart/Cart.module.css';
import { useSelector } from 'react-redux';
import useClickOutside from '../../ClickOutside/ClickOutside';
import {
  GET_ADDRESS_BY_ID,
  GET_BOOK_BY_ID,
  GET_ITENS_BY_DEMAND,
  GET_MAIN_IMAGE_BOOK,
} from '../../../api';

const ModalDetals = ({ setShowDetails, demand }) => {
  const { permissions } = useSelector((state) => state);
  const [products, setProducts] = React.useState([]);
  const subtotal = (demand.demand.total - demand.demand.shipping).toFixed(2);
  const [itens, setItens] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [address, setAddress] = React.useState('');
  const [totalItens, setTotalItens] = React.useState(0);

  const domNode = useClickOutside(() => {
    setShowDetails({ show: false, demand: {} });
  });

  React.useEffect(() => {
    async function getItensDemand() {
      try {
        const { url, options } = GET_ITENS_BY_DEMAND(
          permissions.token,
          demand.demand.id,
        );
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        if (json[0] && json[0].error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        return json.object;
      } catch (error) {
        console.log(error);
      }
    }

    getItensDemand().then((response) => {
      if (response && response.length) {
        setItens([...response]);
      }
    });
  }, [demand.demand.id, permissions.token]);

  React.useEffect(() => {
    async function getBookById(id) {
      try {
        const { url, options } = GET_BOOK_BY_ID(permissions.token, id);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        if (json[0] && json[0].error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        return json.object;
      } catch (error) {
        console.log(error);
      }
    }

    if (itens.length) {
      itens.forEach((item) => {
        setBooks([]);
        getBookById(item.bookId).then((response) => {
          if (response) {
            setBooks((oldArray) => [...oldArray, response]);
          }
        });
      });
    }
  }, [permissions.token, itens]);

  React.useEffect(() => {
    async function getMainImage(id) {
      try {
        const { url, options } = GET_MAIN_IMAGE_BOOK(id);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        if (json[0] && json[0].error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        return json.object;
      } catch (error) {
        console.log(error);
      }
    }

    if (books.length) {
      books.forEach((book) => {
        getMainImage(book.id).then((response) =>
          setImages((oldArray) => [...oldArray, response]),
        );
      });
    }
  }, [books]);

  React.useEffect(() => {
    //create object for view
    if (books.length && images.length && itens.length) {
      let object = {};
      let list = [];
      books.forEach((book) => {
        const imageObj = images.filter((image) => image.bookId === book.id);
        const itemObj = itens.filter((item) => item.bookId === book.id);
        if (imageObj.length && itemObj.length) {
          const img = imageObj[0].img;
          const item = itemObj[0];
          object = { ...book };
          object.quantity = item.amount;
          object.total = (object.price * item.amount).toFixed(2);
          object.price = item.price;
          object.img = img;
          list.push(object);
          object = {};
        }
      });
      const qtdTotal = list.reduce((previous, current) => {
        return previous + current.quantity;
      }, 0);
      setTotalItens(qtdTotal);
      setProducts([...list]);
    }
  }, [permissions.token, books, images, itens]);

  React.useEffect(() => {
    async function getAddressById(id) {
      try {
        const { url, options } = GET_ADDRESS_BY_ID(permissions.token, id);
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        if (json[0] && json[0].error) {
          console.log(json);
          alert('houve um erro verifique o console');
          return;
        }

        return json.object;
      } catch (error) {
        console.log(error);
      }
    }

    getAddressById(demand.demand.addressId).then((response) => {
      const str = `${response.publicArea}, ${response.number}, ${response.local}, ${response.uf}`;
      setAddress(str);
    });
  }, [demand.demand.addressId, permissions.token]);

  return (
    <div className={stylesConfirmDemand.container}>
      <div className={stylesConfirmDemand.modal} ref={domNode}>
        <article className={stylesConfirmDemand.modalItens}>
          <ul className={stylesItens.items}>
            <li>
              <span className={stylesItens.imgArea}></span>
              <span className={stylesItens.infoArea}>
                <span>Produto</span>
                <span>Preço</span>
              </span>
              <span className={stylesItens.quantity}>Quantidade</span>
              <span className={stylesItens.btnArea}>
                <span> Total</span>
              </span>
            </li>
            {products.map((product) => (
              <li key={product.id}>
                <span className={stylesItens.imgArea}>
                  <img src={`data:image/jpg;base64,${product.img}`} alt="" />
                </span>
                <span className={stylesItens.infoArea}>
                  <span>{product.nameBook}</span>
                  <span>R$ {product.price}</span>
                </span>
                <span className={stylesItens.quantity}>
                  <input
                    type="number"
                    min={1}
                    id={product.id}
                    value={product.quantity}
                    readOnly
                  />
                </span>
                <span className={stylesItens.btnArea}>
                  <span> R$ {product.total}</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className={stylesConfirmDemand.modalInfo}>
          <div className={stylesConfirmDemand.modalInfoArea}>
            <div className={stylesConfirmDemand.modalInfoLeft}>
              <span className={stylesConfirmDemand.address}>
                <p>Endereço de Entrega</p>
                <p>{address}</p>
              </span>
              <span className={stylesConfirmDemand.payment}>
                <p>Forma de Pagamento</p>
                <p>{demand.demand.payment}</p>
              </span>
              <span className={stylesConfirmDemand.shipping}>
                <p>Frete</p> <span>R$ {demand.demand.shipping}</span>
              </span>
            </div>
            <div className={stylesConfirmDemand.modalInfoRight}>
              <span>Quantidade de itens {totalItens}</span>
              <p>
                <span>Subtotal</span> <span>R$ {subtotal}</span>
              </p>
              <p>
                <span>Total</span> <span>R$ {demand.demand.total}</span>
              </p>
            </div>
          </div>
        </article>

        <article className={stylesConfirmDemand.modalInfoAction}>
          <span></span>
          <button
            style={{ backgroundColor: 'var(--green)' }}
            type="button"
            className={stylesConfirmDemand.btnMain}
            onClick={() => {
              setShowDetails({ show: false, demand: {} });
            }}
          >
            Voltar
          </button>
        </article>
      </div>
    </div>
  );
};

export default ModalDetals;
