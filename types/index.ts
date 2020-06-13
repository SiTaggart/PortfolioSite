type Tweet = {
  text: string;
};
export type Tweets = Tweet[];

export interface FrontMatterShape {
  title: string;
  url: string;
  date: Date;
  description: string;
  path: string;
}
