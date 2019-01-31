import pool from './connection';

const sampleData = `
  INSERT INTO users(first_name, last_name, other_name, email, password, phone_number, is_admin, passport_url) VALUES ('Jude', 'Afam', 'Ogom', 'afamjude@gmail.com', '123456', '08024151665', true, 'https://www.bcbc.jpg');
  INSERT INTO parties(name, hq_address, logo_url, acronym) VALUES ('All Progressives Congress', '1 shonibare street, Abuja', 'https://www.mcmccmc.jpg', 'APC');
  INSERT INTO offices(name, type) VALUES ('Senate', 'legislative');
`;

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(sampleData);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

seed();
