import { IGallery } from "../models/image";

// Function to fetch data
const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const respond = await fetch(input, init);

  if (respond.ok) {
    return respond;
  } else {
    const errorBody = await respond.json();

    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

// Get images data from the backend database
export const getImages = async (): Promise<IGallery[]> => {
  const responded = await fetchData("/api/v1/images/", {
    method: "GET",
  });

  return responded.json();
};
