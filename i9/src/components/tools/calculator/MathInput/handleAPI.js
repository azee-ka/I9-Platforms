import axios from 'axios';
import API_BASE_URL from '../../../../config';
const sendLatex = (latex, handleApiResponse, mode, authState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${authState.token}`,
    }
  };

  let data;
  data = {
    expression: latex,
    oper: 'tex',
    mode: mode,
  };

  // Make a POST request to the backend API
  axios.post(`${API_BASE_URL}calculator/submit-expression/`, data, config)
    .then((response) => {
      handleApiResponse(response.data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      const err_data = {
        result: {
          'output': null,
          'userExpr': data.latex,
          'decimal': null,
          'isInteger': false,
          'isExact': false,
        }
      }
      handleApiResponse(err_data);
    });
};

export default sendLatex;
