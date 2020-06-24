const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const userInput = process.argv.slice(2);

pool
  .query(
    `
SELECT students.id as student_id, students.name as student_name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${userInput[0]}%'
LIMIT ${userInput[1] || 5};
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
