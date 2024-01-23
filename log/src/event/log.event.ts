export type LogDto = {
  entity: string;
  userId: number;
  ip?: string;
  method: string;
  statusCode: number;
  body?: string;
  endPoint: string;
  time: string;
  error?: string;
};
