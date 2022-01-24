// import React, { useCallback, useEffect } from "react";

// const getCards = {};

// getCards.list = (token) => {
//   const urlData = "http://localhost:4000/api/saver-link/links";

//   // const [data, setData] = useState([]);
//   // const [validateData, setValidateData] = useState(null);
//   let data;
//   let validateData;

// 	const getConfig = useCallback(() => {
//     const config = {
//       "content-type": "application/json",
//       authorization: token,
//     };
//     return { config };
//   }, [token]);

//   useEffect(() => {
//     const config = getConfig();
//     // console.log(config);
//     helpHttp()
//       .get(urlData, config.config)
//       .then((res) => {
//         // console.log(res);
//         validateData = null;
//         data = res.data;
//       })
//       .catch((err) => {
//         validateData = err;
//         // console.log(err);
//       });
//   }, [urlData, getConfig]);
// };

// module.exports = getCards;
