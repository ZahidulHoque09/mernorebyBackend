class apiResponse {
  constructor(sucess = true, data, message, error) {
    (this.sucess = true),
      (this.data = data),
      (this.message = message),
      (this.error = error);
  }
}
module.exports = { apiResponse };
