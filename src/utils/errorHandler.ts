import { StatusCode } from 'hono/utils/http-status';

export function handleControllerError(error: unknown, defaultMessage: string): { error: string, statusCode: StatusCode } {
  const errorMessage = (error instanceof Error) ? error.message : defaultMessage;
  console.error(errorMessage);
  return { error: errorMessage, statusCode: 400 as StatusCode };
}
