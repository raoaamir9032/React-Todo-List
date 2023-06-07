import { outLocal } from "../../utils/Users/HelperFunctions";
import { serverAddress } from "../User/userConsants";

// request header
const token = outLocal('token');
export const tokenHeader = {'authorization': `Bearer ${token}`}

//request routes
export const GET_EVENTS =  serverAddress+`/events/`;

export const ADD_NEW_EVENT = serverAddress + "/events/";


export const SINGLE_EVENT = (prop) => {
  return serverAddress+`/events/event/${prop}`;
};


