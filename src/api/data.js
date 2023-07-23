import request from "@/utils/request";

export function getFundData(code, type) {
  return request({
    url: "/data/get/" + code + "/" + type,
    method: "GET",
  });
}
export function getFundInfoList(code, type) {
  return request({
    url: "/data/getFundInfoList",
    method: "GET",
  });
}
