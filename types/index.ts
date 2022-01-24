type Tweet = {
  text: string;
};
export type Tweets = Tweet[];

export interface MetaDataShape {
  title: string;
  url: string;
  date: Date;
  description: string;
  path: string;
}
