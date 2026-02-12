import { ReactElement, ReactNode } from "react";

export interface BoxType {
  title: ReactNode;
  icons: ReactNode;
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
