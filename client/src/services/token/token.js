export const setAuthToken = (token) => {
  localStorage.setItem("weeklyToken", token)
};

export const getAuthToken = () => {
  const cookieValue = localStorage.getItem("weeklyToken")
  if(cookieValue) {
    return cookieValue;
  }
  return null
};

export const removeAuthToken = () => {
  localStorage.clear()
};