import { Typography } from "@/components/ui";

export const InstituteDetails = () => {
  return (
    <>
      <header
        style={{
          backgroundImage: `linear-gradient(
      rgba(4, 9, 30, 0.7),
      rgba(4, 9, 30, 0.7)
    ), url("https://ritchennai.org/img/rit-about.jpg")`,
        }}
        className="flex h-96 items-center justify-center bg-cover bg-center py-8 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <Typography variant="h1">Shamsul Huda Khan College</Typography>
          <Typography variant="h2" className="mt-3">
            (শামছুল হুদা খান কলেজ)
          </Typography>
        </div>
      </header>

      <section className="container mx-auto my-10 rounded-md bg-slate-300 p-8">
        <Typography variant="h2" className="mb-3 text-center lg:text-left">
          Overview
        </Typography>
        <Typography variant="p" className="text-justify text-lg lg:text-xl">
          Shamsul Huda Khan College is an educational establishment that is
          located at Biddadharpur Moheshpur Jhenaidah. Its Educational Institute
          Identification Number or EIIN, is 134745. On 01 January, 2011, it was
          first put into operation. The alternative name for Shamsul Huda Khan
          College is শামছুল হুদা খান কলেজ.
        </Typography>
        <Typography variant="p" className="text-justify text-lg lg:text-xl">
          Shamsul Huda Khan College is under Jessore Education Board. Average
          age of the teachers at Shamsul Huda Khan College is 40 years.
        </Typography>
      </section>

      <section className="container mx-auto my-10 rounded-md bg-slate-300 p-8">
        <Typography variant="h2" className="mb-3 text-center lg:text-left">
          Institute Information
        </Typography>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ul className="flex list-inside list-none flex-col gap-2 text-lg lg:text-xl">
            <li>
              <strong>Alternative Name:</strong> শামছুল হুদা খান কলেজ
            </li>
            <li>
              <strong>EIIN:</strong> 134745
            </li>
            <li>
              <strong>Founded:</strong> 01-01-2011
            </li>
            <li>
              <strong>Board:</strong> Jessore
            </li>
          </ul>
          <div>
            <Typography variant="h3" className="mb-3">
              Location & Contact
            </Typography>

            <div className="flex list-inside list-none flex-col gap-2 text-lg lg:text-xl">
              <p className="text-lg lg:text-xl">
                <strong>Address:</strong> Biddadharpur, Moheshpur, Jhenaidah,
                7350, Bangladesh
              </p>
              <p className="text-lg lg:text-xl">
                <strong>Phone:</strong> +880123456789
              </p>
              <p className="text-lg lg:text-xl">
                <strong>Email: </strong>
                <a
                  href="mailto:info@shamsulhudacollege.edu.bd"
                  className="text-blue-600"
                >
                  info@shamsulhudacollege.edu.bd
                </a>
              </p>
              <p className="text-lg lg:text-xl">
                <strong>Website: </strong>
                <a
                  href="https://www.shamsulhudacollege.edu.bd"
                  className="text-blue-600"
                >
                  www.shamsulhudacollege.edu.bd
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto my-10 rounded-md bg-slate-300 p-8">
        <Typography variant="h2" className="mb-5 text-center lg:text-left">
          Gallery
        </Typography>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <img
            src="https://as2.ftcdn.net/v2/jpg/01/99/36/81/1000_F_199368197_CXhzovd2cgXhK3SR4xjUKNhTer8j5I87.jpg"
            alt="Gallery Image 1"
            className="h-64 w-full rounded-lg object-cover shadow-md"
          />
          <img
            src="https://as2.ftcdn.net/v2/jpg/01/99/36/81/1000_F_199368197_CXhzovd2cgXhK3SR4xjUKNhTer8j5I87.jpg"
            alt="Gallery Image 2"
            className="h-64 w-full rounded-lg object-cover shadow-md"
          />
          <img
            src="https://as2.ftcdn.net/v2/jpg/01/99/36/81/1000_F_199368197_CXhzovd2cgXhK3SR4xjUKNhTer8j5I87.jpg"
            alt="Gallery Image 3"
            className="h-64 w-full rounded-lg object-cover shadow-md"
          />
        </div>
      </section> */}

      <section className="container mx-auto my-10 rounded-md bg-slate-300 p-8">
        <Typography variant="h2" className="mb-5 text-center lg:text-left">
          Board Results (2024)
        </Typography>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
          <div className="rounded-lg bg-slate-400 p-8">
            <Typography variant="h3" className="text-slate-200">
              Pass Rate
            </Typography>
            <Typography variant="h1" className="text-slate-100">
              95%
            </Typography>
          </div>
          <div className="rounded-lg bg-slate-400 p-8">
            <Typography variant="h3" className="text-slate-200">
              Average GPA
            </Typography>
            <Typography variant="h1" className="text-slate-100">
              4.5
            </Typography>
          </div>
        </div>
      </section>

      <section className="container mx-auto my-10 rounded-md bg-slate-200 p-8">
        <Typography variant="h2" className="mb-5 text-center font-bold">
          Principal Information
        </Typography>
        <div className="text-center">
          <Typography variant="h3">Dr. Ahmed Hossain</Typography>
          <p className="text-lg lg:text-xl">Age: 50</p>
          <p className="text-lg lg:text-xl">Tenure Start: 2015-08-01</p>
        </div>
      </section>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto text-center">
          <p className="text-sm lg:text-base">
            © 2024 Shamsul Huda Khan College. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
