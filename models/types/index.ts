import { ReactElement, ReactNode } from "react";

export interface BoxType {
  title: ReactNode | string;
  icons: ReactElement[] | string[] | JSX.Element;
}

export interface FrontmatterType {
  cover_image: string;
  title: string;
  excerpt: string;
  date: string;
  alt?: string;
  tags1: string;
  tags2: string;
}

export interface IPost {
  map(
    arg0: (
      post: IPost,
      index: import("react").Key | null | undefined
    ) => JSX.Element
  ): ReactNode;
  frontmatter: FrontmatterType;
  slug: string;
  content: any;
}

export interface PostType {
  post: IPost;
}

export interface PostsType {
  posts: IPost[];
}

export type IconsType = {
  text: string;
  children: React.ReactNode;
};
