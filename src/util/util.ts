
export const httpError = (err) => ({
    message: err.message,
    errorStack: err.stack
})