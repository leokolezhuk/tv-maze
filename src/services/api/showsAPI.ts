import Show from "@/models/Show";
import APIEndpoint from "./APIEndpoint";

class ShowsAPI extends APIEndpoint {
  constructor() {
    super("https://api.tvmaze.com/");
  }

  public async search(query: string): Promise<Array<Show> | null> {
    const response = await this.get<Array<{ show: Show }> | null>(
      `search/shows?q=${query}`
    );
    if (!response) {
      return [];
    }
    return response.map((s) => s.show);
  }

  public async getAll(page = 0): Promise<Array<Show> | null> {
    return await this.get<Array<Show>>(`shows?page=${page}`);
  }

  public async getShow(showId: string): Promise<Show | null> {
    return await this.get<Show>(`shows/${showId}?embed[]=cast`);
  }
}

export default new ShowsAPI();
