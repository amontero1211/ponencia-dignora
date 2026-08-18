exports.handler = async function (event) {
  const host = event.headers.host;
  const origin = event.headers.origin || event.headers.referer || "";

  if (!host || !origin.includes(host)) {
    return { statusCode: 403, body: "Forbidden" };
  }

  const user = "dignoraavarullo";
  const domain = "gmail.com";

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: `${user}@${domain}` }),
  };
};
