import request from "@/utils/request";

export function getFundData(code, type) {
  return request({
    url: "/data/get/" + code + "/" + type,
    method: "GET",
  });
}
export function getFundInfoList(type) {
  return request({
    url: "/data/getFundInfoList/" + type,
    method: "GET",
  });
}
export function getIndexFundData(code, type) {
  return request({
    url: "/data/getIndexData/" + code + "/" + type,
    method: "GET",
  });
}
