import request from "@/utils/request";

export function getFundData(data) {
  return request({
    url: "/data/get/" + data,
    method: "GET",
  });
}
