import { defaultValues } from "@/configs"
import { AccountType } from "@/types"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: AccountType.LOCAL,
      name: AccountType.LOCAL,
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${defaultValues.backendURL}/api/v0/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            },
          )

          const data = await res.json()
          if (!res.ok) throw new Error(data.message || "Invalid credentials")

          const user = {
            id: data?.data.id,
            name: data?.data.name,
            username: data?.data.username,
            email: data?.data.email,
            profilePic: data?.data.profilePic,
            systemRole: data?.data.systemRole,
            organizationRoles: data?.data.organizationRoles,

            accessToken: data?.auth.accessToken,
            expiresAt: data?.auth.expiresAt,
            refreshToken: data?.auth.refreshToken,
          }
          return user
        } catch (error) {
          console.error("Login failed:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name!
        token.email = user.email!

        token.username = user.username
        token.profilePic = user.profilePic
        token.systemRole = user.systemRole
        token.organizationRoles = user.organizationRoles

        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiresAt = user.expiresAt
      }

      if (trigger === "update") {
        token.organizationRoles = session.organizationRoles
      }

      // Check if token expired, refresh if necessary
      const expiredAtDate = new Date(token.expiresAt as string)
      const currentTime = Date.now()
      const isExpired = expiredAtDate.getTime() <= currentTime

      if (isExpired) {
        const res = await fetch(
          `${defaultValues.backendURL}/api/v0/auth/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          },
        )
        const data = await res.json()

        token.accessToken = data.auth.accessToken
        token.expiresAt = data.auth.expiresAt
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      session.user.email = token.email

      session.user.username = token.username
      session.user.profilePic = token.profilePic
      session.user.systemRole = token.systemRole
      session.user.organizationRoles = token.organizationRoles

      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.expiresAt = token.expiresAt
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
