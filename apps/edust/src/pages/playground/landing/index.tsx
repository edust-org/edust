import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import {
  BookCheck,
  Award,
  Laptop,
  Trophy,
  Globe2,
  Building2,
  BarChart3,
  Video,
  Library,
  Presentation,
  MessageSquare,
  UserCheck,
  Star,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Newspaper,
  Calendar,
} from "lucide-react"

export const Landing = () => {
  return (
    <>
      <header>
        <Alert
          variant="default"
          className="rounded-none border-x-0 border-t-0 bg-slate-900 px-4 py-2"
        >
          <AlertDescription className="flex items-center justify-center gap-2 text-sm text-slate-50">
            <AlertCircle className="h-6 w-6 sm:h-4 sm:w-4" />
            <span>
              XI Class 2024-2025 Academic Year Monthly Assessment Exam-2025
              Notification.
            </span>
          </AlertDescription>
        </Alert>
        <div className="bg-background">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="container relative mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-12">
                <div className="relative z-10 max-w-2xl">
                  <div className="mb-6 inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                    🇧🇩 Leading Education in Bangladesh
                    <span className="ml-2 text-muted-foreground">
                      Since 2008
                    </span>
                  </div>

                  <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                    Shape Your Future Through Quality Education
                  </h1>

                  <p className="mb-8 text-xl text-muted-foreground">
                    Join the most comprehensive educational platform in
                    Bangladesh, offering world-class learning experiences.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" className="gap-2">
                      Start Learning <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline">
                      Explore Programs
                    </Button>
                  </div>

                  <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">500+ Courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">50k+ Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">
                        Expert Mentors
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative lg:ml-4">
                  <div className="relative mx-auto max-w-[500px]">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920"
                      alt="Students in Bangladesh"
                      className="rounded-2xl shadow-2xl"
                    />
                    <div className="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-lg bg-background p-4 shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Join Today</p>
                        <p className="text-sm text-muted-foreground">
                          Start Learning Now
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Latest Updates */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Updates</h2>
            <Button variant="outline" className="gap-2">
              <Newspaper className="h-4 w-4" /> View All News
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>HSC Exam Schedule 2024</CardTitle>
                <CardDescription>
                  <Calendar className="mr-2 inline h-4 w-4" />
                  Updated 2 days ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete examination schedule for HSC candidates with
                  important guidelines and preparations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Digital Learning Platform</CardTitle>
                <CardDescription>
                  <Calendar className="mr-2 inline h-4 w-4" />
                  Updated 1 week ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Introducing our new digital learning platform with enhanced
                  features for better learning experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Program 2024</CardTitle>
                <CardDescription>
                  <Calendar className="mr-2 inline h-4 w-4" />
                  Updated 3 days ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Applications open for merit-based scholarships for
                  underprivileged students across Bangladesh.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Us</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Leading education platform in Bangladesh with proven results
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Top Results</h3>
              <p className="text-sm text-muted-foreground">
                Consistently producing top scorers in board exams
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Globe2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Bangla Medium</h3>
              <p className="text-sm text-muted-foreground">
                Content tailored for Bangladesh curriculum
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Modern Campus</h3>
              <p className="text-sm text-muted-foreground">
                State-of-the-art facilities across Bangladesh
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Regular assessments and performance tracking
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Academic Programs Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Academic Excellence</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Comprehensive programs following Bangladesh's education system,
              from primary to higher education
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookCheck className="h-5 w-5 text-primary" />
                  SSC Preparation
                </CardTitle>
                <CardDescription>
                  Complete guidance for Secondary School Certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    All subjects covered
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Model test papers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Live doubt clearing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  HSC Excellence
                </CardTitle>
                <CardDescription>
                  Specialized Higher Secondary Certificate programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Science, Commerce & Arts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Board exam preparation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Expert faculty support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Laptop className="h-5 w-5 text-primary" />
                  University Admission
                </CardTitle>
                <CardDescription>
                  Preparation for top universities in Bangladesh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Medical & Engineering
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Previous year papers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Mock tests
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Learning Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Learning Resources
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Video Lectures</h3>
              <p className="text-sm text-muted-foreground">
                HD quality recorded lectures by expert teachers
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Library className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Digital Library</h3>
              <p className="text-sm text-muted-foreground">
                Access to thousands of digital books and resources
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <Presentation className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Live Classes</h3>
              <p className="text-sm text-muted-foreground">
                Interactive sessions with experienced teachers
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock academic support and guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats Section */}
      <section className="bg-slate-900 py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">98%</div>
              <p className="text-sm opacity-90">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">50+</div>
              <p className="text-sm opacity-90">Branches Nationwide</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">1000+</div>
              <p className="text-sm opacity-90">Expert Teachers</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">15+</div>
              <p className="text-sm opacity-90">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Student Success Stories
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Rahima Akter</CardTitle>
                    <CardDescription>HSC 2023 Batch</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The structured approach and dedicated teachers helped me
                  achieve GPA 5.0 in HSC. Forever grateful!"
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Kamal Hassan</CardTitle>
                    <CardDescription>Medical Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Got admitted to Dhaka Medical College. The preparation here
                  was invaluable for my success."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Nusrat Jahan</CardTitle>
                    <CardDescription>BUET Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The engineering preparation program was excellent. Now
                  studying at BUET, my dream university!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
