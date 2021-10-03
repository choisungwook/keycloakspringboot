import instance from "./http";

export async function get_anyone() {
  return instance.get("/anyone", {}, {});
};
