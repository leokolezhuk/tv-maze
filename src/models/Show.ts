import ShowImage from "./ShowImage";

export default class Show {
  id!: string;
  url!: string;
  name!: string;
  type!: string;
  language!: string;
  genres!: Array<string>;
  status!: string;
  runtime!: number;
  averageRuntime!: number | undefined;
  premiered: string | undefined;
  ended: string | undefined;
  image: ShowImage | undefined;
}
