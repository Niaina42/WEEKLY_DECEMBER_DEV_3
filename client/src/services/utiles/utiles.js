const toFormData = (data) => {
  let formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

export {
    toFormData
}