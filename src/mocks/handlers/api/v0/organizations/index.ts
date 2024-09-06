import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, ({ cookies }) => {
  const authToken = cookies.authToken;

  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }

  return HttpResponse.json({
    status: "success",
    message: "Get All Organizations Lists!",
    data: {
      items: [
        {
          id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
          org_username: "maximize-cross-platform-e-business",
          name: "maximize cross-platform e-business",
          is_profile_verified: false,
          createdAt: "2024-09-05T16:37:34.000Z",
          updatedAt: "2024-09-05T16:37:34.000Z",
        },
        {
          id: "38e2216c-2f82-43e2-a7f6-072ad0ad516a",
          org_username: "enhance-turn-key-interfaces",
          name: "enhance turn-key interfaces",
          is_profile_verified: false,
          createdAt: "2024-09-05T16:37:34.000Z",
          updatedAt: "2024-09-05T16:37:34.000Z",
        },
      ],
    },
  });
});

const getSite = http.get(`${apiUrlV0}/organizations/site`, ({ cookies }) => {
  const authToken = cookies.authToken;
  console.log("chechking org", authToken !== "organizer");
  if (!authToken || authToken !== "organizer") {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }

  return HttpResponse.json({
    status: "success",
    message: "site get successfully",
    data: {
      assets: {
        assets: [
          {
            type: "image",
            src: "https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg",
            unitDim: "px",
            height: 0,
            width: 0,
          },
        ],
        styles: [],
        pages: [
          {
            name: "home",
            frames: [
              {
                component: {
                  type: "wrapper",
                  stylable: [
                    "background",
                    "background-color",
                    "background-image",
                    "background-repeat",
                    "background-attachment",
                    "background-position",
                    "background-size",
                  ],
                  components: [
                    {
                      tagName: "section",
                      classes: [
                        "px-4",
                        "min-h-10",
                        "h-screen",
                        "flex",
                        "items-center",
                        "flex-col",
                        "justify-center",
                      ],
                      attributes: {
                        id: "ieti",
                      },
                      components: [
                        {
                          type: "image",
                          resizable: {
                            ratioDefault: 1,
                          },
                          classes: ["mt-10", "mx-auto", "w-[300px]"],
                          attributes: {
                            id: "ihv64",
                            src: "https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg",
                          },
                        },
                        {
                          tagName: "h1",
                          type: "text",
                          classes: [
                            "scroll-m-20",
                            "text-4xl",
                            "font-extrabold",
                            "tracking-tight",
                            "lg:text-5xl",
                            "text-center",
                            "mt-4",
                          ],
                          attributes: {
                            id: "ig4x",
                          },
                          components: [
                            {
                              type: "textnode",
                              content: "Build your landing page\n    ",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  head: {
                    type: "head",
                  },
                  docEl: {
                    tagName: "html",
                  },
                },
                id: "CPqtgjgTK16ie4Hh",
              },
            ],
            id: "PoFG30PNj7Uyoip4",
          },
        ],
        symbols: [],
      },
      pages: [
        {
          id: "PoFG30PNj7Uyoip4",
          name: "home",
          html: '<body><section id="ieti" class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img id="ihv64" src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg" class="mt-10 mx-auto w-[300px]"/><h1 id="ig4x" class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">Build your landing page\n    </h1></section></body>',
          css: "* { box-sizing: border-box; } body {margin: 0;}",
        },
      ],
    },
  });
});

export const organizations = [getListOfOrg, getSite];
