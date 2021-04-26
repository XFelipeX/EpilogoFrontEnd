import React from 'react';
import styles from './Users.module.css';

const SimpleTable = ({ accounts }) => {
  console.log(accounts);
  return (
    <table className={`${styles.usersCardTable}`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuário</th>
          {/* <th>E-mail</th> */}
          <th>Tipo</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {accounts &&
          accounts.content &&
          accounts.content.map(
            (user) =>
              user.typeAccount !== 2 && (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  {/* <td>{user.email}</td> */}
                  <td>
                    {user.typeAccount === 0 ? 'Administrador' : 'Estoquista'}
                  </td>
                  <td>{user.status === 1 ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ),
          )}
      </tbody>
    </table>
  );
};

export default SimpleTable;
