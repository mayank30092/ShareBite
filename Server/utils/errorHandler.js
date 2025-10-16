// utils/errorHandler.js
export const handleError = (res, error, statusCode = 500) => {
  console.error("❌ Error:", error.message);
  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};
