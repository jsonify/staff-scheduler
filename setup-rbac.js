import { Client, Teams } from 'node-appwrite';
import 'dotenv/config';

const setupRBAC = async () => {
  // Initialize Appwrite
  const client = new Client();
  client
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setKey(process.env.APPWRITE_API_KEY);

  const teams = new Teams(client);

  try {
    // 1. Create the team
    const team = await teams.create(
      'education-team',
      'Education Access Team'
    );

    console.log('Team created:', team);

    // 2. Add team members
    const verificationUrl = 'https://your-app.com/invite'; // Replace with your app's invite URL

    await teams.createMembership(
      team.$id,
      ['paraeducator'], // Custom role logic
      'paraeducator@sherwood.com');

    await teams.createMembership(
      team.$id,
      ['admin'],
      'admin@sherwood.com');

    await teams.createMembership(
      team.$id,
      ['owner'],
      'owner@sherwood.com');

    console.log('RBAC setup completed successfully!');
    console.log('Team ID:', team.$id);
  } catch (error) {
    console.error('Error setting up RBAC:', error);
  }
};

// Run the setup
setupRBAC();
