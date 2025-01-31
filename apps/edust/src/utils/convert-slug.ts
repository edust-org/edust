import * as urlSlug from "url-slug"

export const convertSlug = (title: string) => {
  return urlSlug.convert(title)
}
