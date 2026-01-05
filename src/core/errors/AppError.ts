// ============================================================================
// core/errors/AppError.ts - Base Application Error Class
// ============================================================================
export class AppError extends Error {
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    public override readonly message: string,
    public readonly statusCode: number,
    code?: string
  ) {
    super(message);
    this.code = code || "APP_ERROR";
    this.isOperational = true;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly for proper instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
