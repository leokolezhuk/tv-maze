import axios, { AxiosInstance, Method } from "axios";

export default class APIEndpoint {
  protected baseURL: string;
  protected client: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
    });
  }

  public async execute<T>(
    method: Method,
    urlPath: string,
    data: object | null
  ) {
    return await this.client.request<T>({
      method,
      url: urlPath,
      data,
    });
  }

  public async get<T>(resource: string) {
    return await this.execute<T>("get", resource, null)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
  }

  public async post<T>(resource: string, data: object) {
    return await this.execute<T>("post", resource, data)
      .then(() => true)
      .catch(() => false);
  }

  public async put<T>(resource: string, data: object) {
    return await this.execute<T>("put", resource, data)
      .then(() => true)
      .catch(() => false);
  }

  public async delete<T>(resource: string, data: object) {
    return await this.execute<T>("delete", resource, data)
      .then(() => true)
      .catch(() => false);
  }
}
