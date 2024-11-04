export const getOrgSitesPagesDB = {
  status: "success",
  message: "Request completed successfully!",
  data: {
    items: [
      {
        id: "b3d0d516-4293-448c-a47e-daefa1c7f49b",
        org_id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
        site_id: "33f91a95-d6ed-4b3f-bed0-24b7296ee8b6",
        page_name: "home",
        html: '<body><section id="ieti" class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img id="ihv64" src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg" class="mt-10 mx-auto w-[300px]"/><h1 id="ig4x" class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">Build your landing page\n: HOME</h1></section></body>',
        css: "* { box-sizing: border-box; } body {margin: 0;}",
        createdAt: "2024-10-14T09:52:47.000Z",
        updatedAt: "2024-10-15T05:10:37.000Z",
      },
      {
        id: "b3d0d516-4293-448c-a47e-daefa1c7f49b",
        org_id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
        site_id: "33f91a95-d6ed-4b3f-bed0-24b7296ee8b6",
        page_name: "about",
        html: '<body><section id="ieti" class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img id="ihv64" src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg" class="mt-10 mx-auto w-[300px]"/><h1 id="ig4x" class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">Build your landing page\n: ABOUT</h1></section></body>',
        css: "* { box-sizing: border-box; } body {margin: 0;}",
        createdAt: "2024-10-14T09:52:47.000Z",
        updatedAt: "2024-10-15T05:10:37.000Z",
      },
    ],
  },
  _links: {
    self: {
      href: "/api/v0/public/organizations/{orgIdOrUsername}/site",
      method: "GET",
    },
    get_pages: {
      href: "/api/v0/public/organizations/{orgIdOrUsername}/site?name=home",
      method: "GET",
    },
  },
};

export const getInstitutesDB = {
  status: "success",
  data: {
    items: [
      {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        institute_category_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        institute_category: "university",
        name: "Tech University",
        slug: "tech-university",
        photo:
          "https://res.cloudinary.com/dbaa3pxau/image/upload/v1728625005/edust-cover_l3xkow.svg",
        contact_email: "institute@example.com",
        phone_number: "01345678901",
        website: "www.institute.com",
        country: "Bangladesh",
        latitude: 23.761116975637687,
        longitude: 88.94401531246783,
        createdAt: "2024-09-06T01:35:20Z",
        updatedAt: "2024-09-06T01:35:20Z",
        author: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          profile_pic:
            "https://res.cloudinary.com/dbaa3pxau/image/upload/v1725846914/logo-box_ac2erk.jpg",
          name: "Edust Org",
        },
      },
      {
        id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        institute_category_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        institute_category: "university",
        name: "Tech University",
        slug: "tech-university",
        photo:
          "https://res.cloudinary.com/dbaa3pxau/image/upload/v1728625005/edust-cover_l3xkow.svg",
        contact_email: "institute@example.com",
        phone_number: "01345678901",
        website: "www.institute.com",
        country: "Bangladesh",
        latitude: 23.761116975637687,
        longitude: 88.94401531246783,
        createdAt: "2024-09-06T01:35:20Z",
        updatedAt: "2024-09-06T01:35:20Z",
        author: {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          profile_pic:
            "https://res.cloudinary.com/dbaa3pxau/image/upload/v1725846914/logo-box_ac2erk.jpg",
          name: "Edust Org",
        },
      },
    ],
  },
  _links: {
    self: {
      href: "/api/v0/public/institutes",
      method: "GET",
    },
    first: {
      href: "/api/v0/public/institutes?limit=10&page=1",
      method: "GET",
    },
    previous: {
      href: "/api/v0/public/institutes?limit=10&page=1",
      method: "GET",
    },
    next: {
      href: "/api/v0/public/institutes?limit=10&page=2",
      method: "GET",
    },
    last: {
      href: "/api/v0/public/institutes?limit=10&page=5",
      method: "GET",
    },
    get_by_id: {
      href: "/api/v0/public/institutes/:id",
      method: "GET",
    },
  },
};

export const getInstituteByIdDB = {
  status: "success",
  data: {
    institute_category_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    institute_category: "university",
    name: "Tech University",
    slug: "tech-university",
    code: "333333",
    code_type: "eiin",
    overview: "<!DOCTYPE html><html></html>",
    photo:
      "https://res.cloudinary.com/dbaa3pxau/image/upload/v1728625005/edust-cover_l3xkow.svg",
    contact_email: "institute@example.com",
    phone_number: "01345678901",
    website: "www.institute.com",
    founded_date: "2024-09-06T12:45:20Z",
    principal_name: "MD Rubel",
    language: "Bengali",
    country: "Bangladesh",
    state_or_division: "Khulna",
    county_or_district: "Chuadanga",
    city_or_town: "Alamdanga",
    street_or_house_number: "High Road",
    postal_code: "7210",
    latitude: 23.761116975637687,
    longitude: 88.94401531246783,
    createdAt: "2024-09-06T01:35:20Z",
    updatedAt: "2024-09-06T01:35:20Z",
    author: {
      id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      profile_pic:
        "https://res.cloudinary.com/dbaa3pxau/image/upload/v1725846914/logo-box_ac2erk.jpg",
      name: "Edust Org",
    },
  },
  _links: {
    self: {
      href: "/api/v0/public/institutes/:id",
      method: "GET",
    },
    get_institutes: {
      href: "/api/v0/public/institutes",
      method: "GET",
    },
  },
};
