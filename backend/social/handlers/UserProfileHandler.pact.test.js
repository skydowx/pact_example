const {
  Matchers,
  MessageConsumerPact,
  asynchronousBodyHandler,
} = require("@pact-foundation/pact");
const faker = require("faker");
const { dbConnection, destroyDB } = require("../database/dbconfig");
const userEventHandler = require("./UserProfileHandler");
const { like } = Matchers;

const path = require("path");

describe("Kafka handler", () => {
  const messagePact = new MessageConsumerPact({
    consumer: "pactflow-example-consumer-js-kafka",
    dir: path.resolve(process.cwd(), "pacts"),
    pactfileWriteMode: "update",
    provider: "pactflow-example-provider-js-kafka",
    logLevel: "info",
  });

  beforeAll(() => {
    dbConnection();
  });

  afterAll(async (done) => {
    destroyDB();
    done();
  });

  describe("receive a new user", () => {
    it("accepts a user_created event", () => {
      return messagePact
        .expectsToReceive("a user created event")
        .withContent({
          user_id: faker.datatype.number({ min: 100000, max: 999999 }),
          first_name: like("John"),
          last_name: like("Doe"),
          department: like("Artificial Intelligence"),
          designation: like("ML Lead"),
          tenant_id: 123456,
          image_url: like("http://placeimg.com/640/480/fashion"),
          city: like("Zoeville"),
          country: like("Brazil"),
          bio: like("Debitis assumenda aut aut et."),
          social_links: like({ facebook: "https://facebook.com/" }),
          employee_id: like(2175),
        })
        .withMetadata({
          kafka_topic: "event_stream",
        })
        .verify(asynchronousBodyHandler(userEventHandler.userCreatedHandler));
    });
  });
});
