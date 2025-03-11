export default async function ProfileByUsername({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <div>Profile user: {username}</div>
}
