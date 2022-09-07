export const getTypes = () => async (dispatch) => {
    const response = await fetch("https://kevindex.herokuapp.com/types");
    console.log(response);
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "GET_TYPE",
      payload: data,
    });
  };