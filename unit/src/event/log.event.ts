export type LogEvent = {
  entity: string;
  userId: number;
  ip?: string;
  method: string;
  statusCode: number;
  endPoint: string;
  body?: string;
  time: string;
  err?: string;
};
