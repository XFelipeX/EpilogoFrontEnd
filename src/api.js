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

export const GET_ACCOUNTS = (token, page, size) => {
  return {
    url: `${baseUrl}/account?size=${size}&page=${page}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        // mode: 'no-cors',
      },
      method: 'GET',
    },
  };
};

export const POST_ACCOUNT = (token, body) => {
  return {
    url: `${baseUrl}/account`,
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
