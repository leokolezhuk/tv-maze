import Show from "@/models/Show";
import APIEndpoint from "./APIEndpoint";

class ShowsAPI extends APIEndpoint {
  constructor() {
    super("https://api.tvmaze.com/");
  }

  public async search(query: string): Promise<Array<Show>> {
    const response = await this.get<Array<{ show: Show }> | null>(
      `search/shows?q=${query}`
    );
    if (!response) {
      return [];
    }
    return response.map((s) => s.show);
  }

  public async getAll(page = 0): Promise<Array<Show>> {
    const shows = await this.get<Array<Show> | null>(`shows?page=${page}`);
    return shows ?? [];
  }

  public async getShow(showId: string): Promise<Show | null> {
    return await this.get<Show>(`shows/${showId}?embed[]=cast`);
  }
}

export default new ShowsAPI();
