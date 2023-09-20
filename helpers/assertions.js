export const assert200s = (response, responseStatus = 200, responseText = 'OK') => {
  expect(response.status).toEqual(responseStatus);
  expect(response.statusText).toEqual(responseText);
  expect(response.data).toBeTruthy();
};

export const assert400s = (response, responseStatus = 400, responseText = 'Bad Request') => {
  expect(response.status).toEqual(responseStatus);
  expect(response.statusText).toEqual(responseText);
  expect(response.data).toBeTruthy();
};

export const assert500s = (response, responseStatus = 500, responseText = 'Internal Server Error') => {
  expect(response.status).toEqual(responseStatus);
  expect(response.statusText).toEqual(responseText);
  expect(response.data).toBeTruthy();
};

export const assert300s = () => {

};