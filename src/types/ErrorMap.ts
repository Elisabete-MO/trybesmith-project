interface IErrorMap {
  [key: string]: number;
  OK: number,
  PRODUCT_NOT_FOUND: number,
  INVALID_VALUE: number,
  DATA_REQUIRED: number,
  SALE_NOT_FOUND: number,
}

const errorMap: IErrorMap = {
  OK: 200,
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  DATA_REQUIRED: 400,
  SALE_NOT_FOUND: 404,
};

export { IErrorMap, errorMap };
