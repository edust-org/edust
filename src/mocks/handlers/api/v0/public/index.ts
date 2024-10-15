import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";

const getOrgSitesPages = http.get(
  `${apiUrlV0}/public/organizations/:orgIdOrUsername/site/?name=home`,
  () => {
    return HttpResponse.json({
      status: "success",
      message: "Request completed successfully",
      data: {
        items: [
          {
            id: "b3d0d516-4293-448c-a47e-daefa1c7f49b",
            org_id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
            site_id: "33f91a95-d6ed-4b3f-bed0-24b7296ee8b6",
            page_id: "PoFG30PNj7Uyoip4",
            page_name: "home",
            html: '<body><section id="ieti" class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img id="ihv64" src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg" class="mt-10 mx-auto w-[300px]"/><h1 id="ig4x" class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">Build your landing page\n    </h1></section></body>',
            css: "* { box-sizing: border-box; } body {margin: 0;}",
            createdAt: "2024-10-14T09:52:47.000Z",
            updatedAt: "2024-10-15T05:10:37.000Z",
          },
        ],
      },
    });
  },
);

export const publicApi = [getOrgSitesPages];
