import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// Contentful delivery client - for fetching content
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Contentful management client - for creating/updating content
export const getContentfulManagementClient = () => {
  const managementClient = createManagementClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  return managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
};

// Helper function to create a contact entry
export const createContactEntry = async (contactData) => {
  try {
    const space = await getContentfulManagementClient();
    const environment = await space.getEnvironment("master");

    const intPhone = parseInt(contactData.phone);
    // Create entry in the 'contactDsn' content type
    const entry = await environment.createEntry("contactDsn", {
      fields: {
        name: { "en-US": contactData.name },
        email: { "en-US": contactData.email },
        phone: { "en-US": intPhone || "" },
        company: { "en-US": contactData.company || "" },
        message: { "en-US": contactData.message },
        productInterest: { "en-US": contactData.productInterest || "" },
      },
    });

    // Publish the entry immediately
    await entry.publish();

    return entry;
  } catch (error) {
    console.error("Error creating Contentful entry:", error);
    throw error;
  }
};
