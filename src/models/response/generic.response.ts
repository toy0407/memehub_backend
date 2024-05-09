export interface GenericResponseModel<T> {
  isSuccess: boolean;
  data?: any;
  error?: T;
}
