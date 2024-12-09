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
