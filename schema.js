// schema.js
import { Client, Databases } from 'node-appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint('APPWRITE_ENDPOINT')
    .setProject('PROJECT_ID')
    .setKey('staff_scheduler_api_key'); // Note: This requires an API key with appropriate permissions

const databases = new Databases(client);
const DATABASE_ID = 'YOUR_DATABASE_ID';

async function createParaEducatorCollection() {
    try {
        const collection = await databases.createCollection(
            DATABASE_ID,
            ID.unique(),
            'paraeducators'
        );

        // Add attributes to the collection
        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'name',
            255,
            true // required
        );

        await databases.createIntegerAttribute(
            DATABASE_ID,
            collection.$id,
            'timeBank',
            true, // required
            0,    // min
            400,  // max
            80    // default (40 hours * 2 blocks)
        );

        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'email',
            255,
            false // not required
        );

        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'status',
            100,
            false
        );

        console.log('Successfully created paraeducators collection with attributes');
    } catch (error) {
        console.error('Error creating paraeducators collection:', error);
    }
}

async function createAssignmentsCollection() {
    try {
        const collection = await databases.createCollection(
            DATABASE_ID,
            ID.unique(),
            'assignments'
        );

        // Add attributes to collection
        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'paraEducator',
            255,
            true
        );

        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'time',
            8,    // size to fit "09:30 AM"
            true
        );

        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'classroom',
            100,
            true
        );

        await databases.createStringAttribute(
            DATABASE_ID,
            collection.$id,
            'createdBy',
            255,
            true
        );

        await databases.createDatetimeAttribute(
            DATABASE_ID,
            collection.$id,
            'date',
            false
        );

        // Create indexes
        await databases.createIndex(
            DATABASE_ID,
            collection.$id,
            'para_time_classroom_index',
            'key',
            ['paraEducator', 'time', 'classroom'],
            true  // make it unique to prevent double-booking
        );

        console.log('Successfully created assignments collection with attributes');
    } catch (error) {
        console.error('Error creating assignments collection:', error);
    }
}

// Function to update an existing attribute
async function updateTimeBankAttribute(collectionId) {
    try {
        await databases.updateIntegerAttribute(
            DATABASE_ID,
            collectionId,
            'timeBank',
            true,  // required
            0,     // min
            400,   // max
            80     // default
        );
        console.log('Successfully updated timeBank attribute');
    } catch (error) {
        console.error('Error updating timeBank attribute:', error);
    }
}

// Function to delete and recreate an attribute
async function recreateAttribute(collectionId, attributeName) {
    try {
        // Delete existing attribute
        await databases.deleteAttribute(
            DATABASE_ID,
            collectionId,
            attributeName
        );

        // Wait a moment for deletion to complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create new attribute
        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            attributeName,
            8,    // new size
            true  // required
        );

        console.log(`Successfully recreated ${attributeName} attribute`);
    } catch (error) {
        console.error(`Error recreating ${attributeName} attribute:`, error);
    }
}

// Run the functions
async function setupDatabase() {
    await createParaEducatorCollection();
    await createAssignmentsCollection();
}

// Example usage for updating existing collections
async function updateExistingCollections() {
    const PARAEDUCATORS_COLLECTION_ID = 'your_collection_id';
    const ASSIGNMENTS_COLLECTION_ID = 'your_collection_id';
    
    // Update timeBank to support 30-minute intervals
    await updateTimeBankAttribute(PARAEDUCATORS_COLLECTION_ID);
    
    // Recreate time attribute with new size
    await recreateAttribute(ASSIGNMENTS_COLLECTION_ID, 'time');
}

// Choose which function to run based on your needs
setupDatabase().catch(console.error);
// or
// updateExistingCollections().catch(console.error);