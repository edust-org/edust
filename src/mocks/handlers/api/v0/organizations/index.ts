import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import { access_token } from "@/utils";
import organizationDb from "./organization-db";

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, () => {
  const authToken = access_token.getToken();

  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }
  return HttpResponse.json(organizationDb.orgLists);
});

const getSite = http.get(`${apiUrlV0}/organizations/site`, () => {
  const authToken = access_token.getToken();

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
