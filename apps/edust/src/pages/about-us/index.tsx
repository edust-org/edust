import { Navbar } from "@/components"
import { Footer } from "@/pages/components/footer"

export const AboutUs = () => {
  return (
    <>
      <Navbar.Guest />

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="mx-auto mt-4 max-w-[800px] text-muted-foreground">
                Edust was created with a mission to redefine the educational
                experience by connecting students, teachers, and institutions in
                a collaborative ecosystem. Since its inception in 2024, Edust
                has been at the forefront of innovation in education, providing
                tools and platforms that make learning accessible, engaging, and
                impactful for everyone.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Values</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <RocketIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Innovation in Education</h4>
                  <p className="text-muted-foreground">
                    We leverage cutting-edge technology to create tools that
                    empower educational communities and inspire lifelong
                    learning.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <UsersIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Collaboration</h4>
                  <p className="text-muted-foreground">
                    Education thrives in a connected world. We bring together
                    students, teachers, and institutions to foster growth and
                    collaboration.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <BoltIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Efficiency</h4>
                  <p className="text-muted-foreground">
                    We simplify the complexities of education by providing
                    efficient tools for managing and enhancing learning
                    experiences.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <SmileIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Student-Centered Design</h4>
                  <p className="text-muted-foreground">
                    Our platform prioritizes the needs of learners, ensuring
                    that every feature enhances their educational journey.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <LeafIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Sustainability</h4>
                  <p className="text-muted-foreground">
                    We are committed to building an eco-conscious platform that
                    supports sustainable education for future generations.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  <LightbulbIcon className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-bold">Continuous Learning</h4>
                  <p className="text-muted-foreground">
                    We believe in growth and innovation, both for our team and
                    our users, by staying at the forefront of educational trends
                    and technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function LightbulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
