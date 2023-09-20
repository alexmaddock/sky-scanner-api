import axios from 'axios';
import { mkdir, writeFile } from 'node:fs';

export const client = {
  get: async ({url, path, headers}) => {
    return await apiHandler('get', {url ,path, headers});
  }, 
  post: async({url, path, data, headers}) => {
    return await apiHandler('post', {url, path, headers, data});
  },
  put: async({url, path, data, headers}) => {
    return await apiHandler('put', {url, path, headers, data});
  },
  delete: async({url, path, headers}) => {
    return await apiHandler('delete', {url, path, headers});
  } 
};

// consider function curry to break up obj size & maybe DI to help compact it
const apiHandler = async (method, {url = process.env.URL , path = '', data = null, headers, writeToFile = false, filePath = null}) => {
  try {
    const response = await axios({
      headers,
      method,
      url: `${url}/${path}`,
      data
    });

    if(writeToFile) {
      mkdir('./httpOutput/', {recurvsive: true}, (err) => {
        if (err) throw err;

        writeFile('./httpOutput/httpResponse.json', JSON.stringify(response.data), (err) => {
          if (err) throw err;
        })
      });
      
    }

    return response;
  }
  catch(e) {
    console.log('REQUEST ERROR:', e.request /*e.request._header, e.request.path, e.request.responseUrl*/);
    console.log('RESPONSE ERROR:', e.response /*e.response.status, e.response.statusText, e.response.config.headers, e.response.config.data*/);
    throw e;
  }
};

export const token = async () =>  {
  try {
      let response = await axios({
          method: 'get',
          url: ''
      })
      let token = response.body['authorisation_header'];
      return { token, Bearer:`${token}` };
  }
  catch(e) {
      throw e
  }
}

const bodyConstructor = (body = null) => {
  return body === !null && !undefined ? body : null
}

