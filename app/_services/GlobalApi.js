import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://us-west-2.cdn.hygraph.com/content/" +
  process.env.NEXT_PUBLIC_MASTER_URL_KEY +
  "/master";

// Category
export const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

// BusinessList
export const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getBusinessByCategory = async (category) => {
  const query =
    gql`
    query BusinessList {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export const getBusinessById = async (id) => {
  const query =
    gql`
    query BusinessList {
      businessList(where: { id: "` +
    id +
    `" }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
