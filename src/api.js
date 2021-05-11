const baseUrl = 'http://localhost:8080';

export const GET_BOOKS = (page, size) => {
  return {
    url: `${baseUrl}/book?size=${size}&page=${page}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const POST_BOOK = (body, token) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_BOOK = (body, token) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
};

export const DELETE_BOOK = (body, token) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'DELETE',
      body: JSON.stringify(body),
    },
  };
};

export const POST_BOOK_IMAGE = (body, token) => {
  return {
    url: `${baseUrl}/imageBook`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const GET_IMAGES_BOOK = (id) => {
  return {
    url: `${baseUrl}/imageBook/book/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_MAIN_IMAGE_BOOK = (id) => {
  return {
    url: `${baseUrl}/imageBook/book/main/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const DELETE_IMAGE_BOOK = (id, token) => {
  return {
    url: `${baseUrl}/imageBook/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'DELETE',
    },
  };
};

export const GET_AUTHORS = () => {
  return {
    url: `${baseUrl}/author`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_PUBLISH_COMPANIES = () => {
  return {
    url: `${baseUrl}/publishCompany `,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_AUTHOR_BOOK = (id) => {
  return {
    url: `${baseUrl}/author/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

// Login
export const LOGIN = (body) => {
  return {
    url: `${baseUrl}/authenticate`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

// Account
export const GET_ACCOUNTS = (page, size) => {
  return {
    url: `${baseUrl}/account?size=${size}&page=${page}&sort=id,desc`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        // mode: 'no-cors',
      },
      method: 'GET',
    },
  };
};

export const GET_ACCOUNT_BY_ID = (id) => {
  return {
    url: `${baseUrl}/account/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        // mode: 'no-cors',
      },
      method: 'GET',
    },
  };
};

export const POST_ACCOUNT = (body) => {
  return {
    url: `${baseUrl}/account`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_ACCOUNT = (body) => {
  return {
    url: `${baseUrl}/account`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
};

// User
export const POST_USER = (body) => {
  return {
    url: `${baseUrl}/user`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_USER = (body) => {
  return {
    url: `${baseUrl}/user`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_STATUS_USER = (id) => {
  return {
    url: `${baseUrl}/user/status/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    },
  };
};

export const GET_USER_BY_ACCOUNT = (id) => {
  return {
    url: `${baseUrl}/user/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_USER_BY_EMAIL = (email) => {
  console.log(email);
  return {
    url: `${baseUrl}/user/email/${email}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_USERS = (page, size) => {
  return {
    url: `${baseUrl}/user?size=${size}&page=${page}&sort=id,desc`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const POST_ADDRESS = (body) => {
  return {
    url: `${baseUrl}/address?typeAccount=2`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_ADDRESS = (body) => {
  return {
    url: `${baseUrl}/address`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
};

export const GET_ACTIVE_ADDRESS = (accountId) => {
  return {
    url: `${baseUrl}/address/active/${accountId}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_ADDRESS_BY_ACCOUNT = (accountId, type) => {
  return {
    url: `${baseUrl}/address/account/${accountId}?type=${type}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_ADDRESS_DELIVERY_BY_ACCOUNT = (accountId) => {
  return {
    url: `${baseUrl}/address/account/delivery/${accountId}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_ALL_ADDRESS_DELIVERY_BY_ACCOUNT = (accountId) => {
  return {
    url: `${baseUrl}/address/account/delivery/all/${accountId}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const GET_CEP = (cep) => {
  return {
    url: `https://viacep.com.br/ws/${cep}/json/`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
};

// Demand
export const POST_DEMAND = (token, body) => {
  return {
    url: `${baseUrl}/demand`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

// Demand Itens

export const POST_ITEM = (token, body) => {
  return {
    url: `${baseUrl}/item`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};
