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

// Booking
export const createNewBooking = async (
  businessId,
  date,
  time,
  userEmail,
  userName,
) => {
  const mutation = gql`
    mutation MyMutation {
      createBooking(
        data: {
          bookingStatus: booked
          businessList: { connect: { id: "${businessId}" } }
          date: "${date}"
          time: "${time}"
          userEmail: "${userEmail}"
          userName: "${userName}"
        }
      ) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, mutation);
  return result;
};

export const BusinessBookedSlot = async (businessId, date) => {
  const query = gql`
    query MyQuery {
      bookings(where: { businessList_every: { id: "${businessId}" }, date: "${date}" }) {
        date
        time
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export const GetUserBookingHistory = async (userEmail) => {
  const query = gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "${userEmail}"}
    orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
      id
      bookingStatus
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const deleteBooking = async (bookingId) => {
  const mutationQuery = gql`
    mutation DeleteBooking {
      deleteBooking(where: {id: "${bookingId}"}) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};
