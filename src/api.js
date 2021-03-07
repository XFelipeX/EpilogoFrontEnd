const baseUrl = 'http://localhost:8080';

export const GET_BOOKS = () => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
};

export const POST_BOOK = (body) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
  };
};

export const PUT_BOOK = (body) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
};

export const DELETE_BOOK = (id) => {
  return {
    url: `${baseUrl}/book/${id}`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    },
  };
};
