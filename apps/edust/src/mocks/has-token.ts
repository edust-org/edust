import { HttpResponse } from "msw";

export const hasToken = (authToken: string) => {
  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }
};
