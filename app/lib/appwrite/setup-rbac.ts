// app/lib/appwrite/setup-rbac.ts

import { Client, Teams } from 'node-appwrite';

type Role = 'paraeducator' | 'admin' | 'owner';

interface TeamMember {
  email: string;
  roles: Role[];
}

const members: TeamMember[] = [
  { email: 'paraeducator@sherwood.com', roles: ['paraeducator'] },
  { email: 'admin@sherwood.com', roles: ['admin'] },
  { email: 'owner@sherwood.com', roles: ['owner'] }
];

export async function setupRBAC() {
  if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
      !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      !process.env.APPWRITE_API_KEY) {
    throw new Error('Missing required environment variables');
  }

  const client = new Client();
  client
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setKey(process.env.APPWRITE_API_KEY);

  const teams = new Teams(client);

  try {
    const team = await teams.create(
      'education-team',
      'Education Access Team'
    );

    await Promise.all(
      members.map(member =>
        teams.createMembership(
          team.$id,
          member.roles,
          member.email
        )
      )
    );

    console.log('RBAC setup completed successfully!');
    console.log('Team ID:', team.$id);
    
    return team.$id;
  } catch (error) {
    console.error('Error setting up RBAC:', error);
    throw error;
  }
}

if (require.main === module) {
  setupRBAC();
}