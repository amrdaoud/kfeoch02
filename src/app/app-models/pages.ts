export interface Page {
  Url: string;
  Title?: string;
  Subtitle?: string;
  ImageUrl?: string;
  Posts?: Post[]
}

export interface Post {
  Title: string;
  Subtitle?: string;
  ImageUrl?: string;
  Posts?: Post[];
}

export const pages: Page[] = [
  {Url: 'chairman-word', Title: 'Mr. Chairman Word'}
]
