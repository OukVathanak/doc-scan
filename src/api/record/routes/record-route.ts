import { Route } from "../../../../types/model";

export default {
  routes: [
    {
      method: "POST",
      path: "/records/upload",
      handler: "record.scanFile",
      config: {
        auth: false,
      },
    },
  ] as Route[],
};
