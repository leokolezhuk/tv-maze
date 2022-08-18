import APIEndpoint from "./APIEndpoint";

class ShowsAPI extends APIEndpoint {
  constructor() {
    super("https://api.tvmaze.com/");
  }

  public async search(query: string): Promise<Array<object> | null> {
    const response = await this.get<Array<{ show: object }> | null>(
      `search/shows?q=${query}`
    );
    if (!response) {
      return [];
    }
    return response.map((s) => s.show);
  }

  public async getAll(page = 0): Promise<Array<object> | null> {
    return await this.get(`shows?page=${page}`);
  }
}

export default new ShowsAPI();
