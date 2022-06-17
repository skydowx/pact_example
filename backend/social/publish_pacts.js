const { Publisher } = require("@pact-foundation/pact");
let path = require("path");

let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: "2.0.0",
};

console.log("PACT CREDS: ", opts);

new Publisher(opts)
  .publishPacts(opts)
  .then(() => console.log("Pacts successfully published"));
