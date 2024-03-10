import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { createConnection } from '../data-source';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  connection.query(
    `INSERT INTO USERS(id, name, password, email, registration_number, "isAdmin", created_at)
    values('${id}', 'admin', '${password}', 'adminmybooks@email.com', 'XXXXX', true, 'now()')`,
  );
}

create()
  .then(() => {
    console.log('User Admin created!');
  })
  .catch(err => {
    console.log(err);
  });
