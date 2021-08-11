import matter from "gray-matter"

export function importAll(webpackContext: __WebpackModuleApi.RequireContext) {
  return webpackContext.keys().map((fileUrl) => {
    const body = webpackContext(fileUrl);
    const slug: string = fileUrl.replace(/^.*[\\\/]/, '').slice(0, -3);
    const document = JSON.parse(JSON.stringify(matter(body.default)));
    return {
      slug,
      document,
    };
  });
}