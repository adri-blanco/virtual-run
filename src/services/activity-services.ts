import { ActivityResponse } from "../types/Activity.types";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function get() {
  const since = new Date("1-1-2023").getTime();
  return fetch(`${SERVER_URL}/activity?since=${since}`).then(async (res) => {
    const jsonRes: ActivityResponse = await res.json();

    return {
      distance: jsonRes.distance,
      activities: jsonRes.length,
    };
  });
}

const ActivityServices = {
  get,
};

export default ActivityServices;
