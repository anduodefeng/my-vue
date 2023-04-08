import request from "@/utils/request";

export function getFundData(code, type) {
  return request({
    url: "/data/get/" + code + "/" + type,
    method: "GET",
  });
}
