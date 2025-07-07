export const sortByDate = (
  a: { slug: string; frontmatter: { date: string | number | Date } },
  b: { slug: string; frontmatter: { date: string | number | Date } }
): number => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
};
