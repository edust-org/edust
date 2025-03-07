export default {
  assets: {
    assets: [],
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
                    id: "if12",
                  },
                  components: [
                    {
                      type: "image",
                      resizable: {
                        ratioDefault: 1,
                      },
                      classes: ["mt-10", "mx-auto", "w-[300px]"],
                      attributes: {
                        src: "https://res.cloudinary.com/dmiewayfu/image/upload/v1724572263/edust-org/logo/logo_zcaqtt.svg",
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
                      components: [
                        {
                          type: "textnode",
                          content: "Welcome to Grapesjs Edust!",
                        },
                      ],
                    },
                    {
                      type: "comment",
                      content: " delete this ",
                    },
                    {
                      type: "comment",
                      content: " deleted end ",
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
            id: "IeYoyPXcJ55TmNnf",
          },
        ],
        id: "maXcVAek0sNf7g6u",
      },
    ],
    symbols: [],
    dataSources: [],
  },
  page: {
    pageName: "home",
    html: '<body><section id="if12" class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572263/edust-org/logo/logo_zcaqtt.svg" class="mt-10 mx-auto w-[300px]"/><h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">Welcome to Grapesjs Edust!</h1><!-- delete this --><!-- deleted end --></section></body>',
    css: "* { box-sizing: border-box; } body {margin: 0;}",
  },
}
