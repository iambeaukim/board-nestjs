export class BaseResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: Date;

  public static successBaseResponse<U>(data: U): BaseResponse<U> {
    const response = new BaseResponse<U>();
    response.code = 200;
    response.message = 'OK';
    response.data = data;
    response.timestamp = new Date();

    return response;
  }

  public static errorBaseResponse<U>(code: number, message: string, data: U): BaseResponse<U> {
    const response = new BaseResponse<U>();
    response.code = code;
    response.message = message;
    response.data = data;
    response.timestamp = new Date();

    return response;
  }
}
