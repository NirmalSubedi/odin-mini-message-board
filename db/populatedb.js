import { Client } from "pg";
import {
  MESSAGE_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  connectionString,
} from "../config.js";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR( ${USERNAME_MAX_LENGTH} ),
  message VARCHAR( ${MESSAGE_MAX_LENGTH} ),
  post_time TIMESTAMPTZ
);

INSERT INTO messages (username, message, post_time)
VALUES 
  ('Nirmal', 'Hello World!', '${new Date().toISOString()}'),
  ('Amando', 'Hi there!', '${new Date().toISOString()}'),
  ('Charles', 'Hey guys, how has life been?', '${new Date().toISOString()}');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
