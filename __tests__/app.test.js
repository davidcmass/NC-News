const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const db = require("../db/connection");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api/topics", () => {
  test("GET - 200: responds with array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.forEach((element) => {
          expect(element).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET - 200: responds with...", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET - 400: responds with 'Bad request'", () => {
    return request(app)
      .get("/api/articles/NaN")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET - 404: responds with 'Invalid id'", () => {
    return request(app)
      .get("/api/articles/600")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid id");
      });
  });

  describe("/api/articles", () => {
    test("GET - 200: responds with array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.article.forEach((element) => {
            expect(element).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
            });
          });
        });
    });
  });
});

describe("GET /api/users", () => {
  test("Responds with array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: accepts a article_id responds with comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
      });
  });
});

describe("PATCH /api/articles/:article_id/", () => {
  test("200: Update articles votes", () => {
    return request(app)
      .patch("/api/articles/8")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toEqual({
          article_id: 8,
          title: "Does Mitch predate civilisation?",
          topic: "mitch",
          author: "icellusedkars",
          body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
          created_at: "2020-04-17T01:08:00.000Z",
          votes: 10,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Returns comments", () => {
    return request(app)
      .post("/api/articles/8/comments")
      .send({ username: "butter_bridge", body: "Hey" })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment[0]).toEqual({
          author: "butter_bridge",
          body: "Hey",
          article_id: 8,
          comment_id: expect.any(Number),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("Deletes comment", () => {
    return request(app)
      .delete("/api/comments/5")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
          });
      });
  });
});
