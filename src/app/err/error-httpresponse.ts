import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface SafiError {
  error?: string;
  errors?: any[];
  message?: string;
  path?: string;
  status?: number;
  timestamp?: Date;
  trace?: string;
}

export class SafiErrorHttpResponse extends HttpErrorResponse {
  constructor() {}
}
