export default async function OrganizationByUsername({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <div>Organization username: {username}</div>
}
