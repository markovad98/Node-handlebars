const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

class Course {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = uuid();
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this);

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static async getById(id) {
    const courses = await Course.getAll();
    return courses.find(course => course.id === id)
  }

  static async update(course) {
    const courses = await Course.getAll();
    const idx = courses.findIndex(item => item.id === course.id);
    courses[idx] = course;

    return new Promise((res, rej) => {
      fs.writeFile(
          path.join(__dirname, "..", "data", "courses.json"),
          JSON.stringify(courses),
          err => {
            if (err) {
              rej(err);
            } else {
              res();
            }
          }
      );
    });
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "courses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Course;
