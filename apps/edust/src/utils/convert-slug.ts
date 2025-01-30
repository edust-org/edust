import slugify from "slugify"

export const convertSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    remove: /[*+~.,()'"!:@]/g,
  })
}
