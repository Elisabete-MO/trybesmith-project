interface IErrorMap {
  [key: string]: number;
  OK: number,
  CREATED: number;
  PRODUCT_NOT_FOUND: number,
  USER_NOT_FOUND: number,
  INVALID_VALUE: number,
  DATA_REQUIRED: number,
  SALE_NOT_FOUND: number,
  UNAUTHORIZED: number,
}

const errorMap: IErrorMap = {
  OK: 200,
  CREATED: 201,
  PRODUCT_NOT_FOUND: 404,
  USER_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  DATA_REQUIRED: 400,
  SALE_NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

export { IErrorMap, errorMap };
