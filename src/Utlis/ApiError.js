class apiError {
  constructor(sucess = false, statusCode, data, message, error = true) {
    (this.sucess = sucess),
      (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.error = error);
  }
}
module.exports = { apiError };
