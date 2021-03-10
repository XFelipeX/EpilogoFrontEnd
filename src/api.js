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

export const DELETE_BOOK = (body) => {
  return {
    url: `${baseUrl}/book`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(body),
    },
  };
};

export const POST_BOOK_IMAGE = (body) => {
  return {
    url: `${baseUrl}/image`,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
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
}

export const GET_PUBLISH_COMPANIES = () => {
  return {
    url: `${baseUrl}/ `,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  };
}