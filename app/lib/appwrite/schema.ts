// app/lib/appwrite/schema.ts

import { Client, Databases, ID } from 'node-appwrite';
import { CollectionName } from '@/app/types/schema';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Only set API key in non-browser environment
if (typeof window === 'undefined' && process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
}

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

async function createParaEducatorCollection() {
    try {
        const collection = await databases.createCollection(
            DATABASE_ID,
            ID.unique(),
            'paraeducators'
        );

        await Promise.all([
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'name',
                255,
                true
            ),
            databases.createIntegerAttribute(
                DATABASE_ID,
                collection.$id,
                'timeBank',
                true,
                0,
                400,
                80
            ),
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'email',
                255,
                false
            ),
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'status',
                100,
                false
            )
        ]);

        console.log('Successfully created paraeducators collection');
        return collection.$id;
    } catch (error) {
        console.error('Error creating paraeducators collection:', error);
        throw error;
    }
}

async function createAssignmentsCollection() {
    try {
        const collection = await databases.createCollection(
            DATABASE_ID,
            ID.unique(),
            'assignments'
        );

        await Promise.all([
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'paraEducator',
                255,
                true
            ),
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'time',
                8,
                true
            ),
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'classroom',
                100,
                true
            ),
            databases.createStringAttribute(
                DATABASE_ID,
                collection.$id,
                'createdBy',
                255,
                true
            ),
            databases.createDatetimeAttribute(
                DATABASE_ID,
                collection.$id,
                'date',
                false
            )
        ]);

        await databases.createIndex(
            DATABASE_ID,
            collection.$id,
            'para_time_classroom_index',
            'key',
            ['paraEducator', 'time', 'classroom'],
            true
        );

        console.log('Successfully created assignments collection');
        return collection.$id;
    } catch (error) {
        console.error('Error creating assignments collection:', error);
        throw error;
    }
}

async function updateAttribute(
    collectionId: string,
    attributeName: string,
    updateFn: () => Promise<void>
) {
    try {
        await updateFn();
        console.log(`Successfully updated ${attributeName} attribute`);
    } catch (error) {
        console.error(`Error updating ${attributeName} attribute:`, error);
        throw error;
    }
}

export async function setupDatabase() {
    const paraEducatorId = await createParaEducatorCollection();
    const assignmentsId = await createAssignmentsCollection();
    return { paraEducatorId, assignmentsId };
}

export async function updateExistingCollections(
    paraEducatorsId: string,
    assignmentsId: string
) {
    await updateAttribute(paraEducatorsId, 'timeBank', () =>
        databases.updateIntegerAttribute(
            DATABASE_ID,
            paraEducatorsId,
            'timeBank',
            true,
            0,
            400,
            80
        )
    );
}

export { databases, DATABASE_ID };