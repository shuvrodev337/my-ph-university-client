import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPage: number;
};
export type TGetResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
};
export type TResonseRedux<T> = TGetResponse<T> & BaseQueryApi;

export type TCreateResponse<T> = {
  success: boolean;
  message: string;
  data?: {
    data: T;
    message: string;
    success: boolean;
  };
  error?: TError;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
