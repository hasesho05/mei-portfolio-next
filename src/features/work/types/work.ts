export type WorkImage = Readonly<{
  alt: string;
  height: number;
  src: string;
  width: number;
}>;

export type Work = Readonly<{
  category: string;
  client: string;
  images: readonly WorkImage[];
  publishedAt: string;
  slug: string;
  thumbnail: WorkImage;
  title: string;
}>;
