import client from "../db/mysql_client.ts";
import {
  isUserExist,
  search,
  insert,
  update,
  remove,
} from "../repositories/user.repository.ts";
import { UserInterface } from "../models/user.interface.ts";

export async function getUser(
  { params, response }: { params: any; response: any },
) {
  const hasRecord = await isUserExist(params.id);
  let status = 200;

  if (hasRecord) {
    const result = await search(params);
    response.body = result.rows;
  } else {
    response.body = { "error": "User not found!" };
    status = 400;
  }

  response.status = status;
}
export async function getAllUsers({ response }: { response: any }) {
  const result = await search();
  response.body = result.rows;
}
export async function addUser(
  { request, response }: { request: any; response: any },
) {
  const body = await request.body({ type: 'json' });
  const userInfo: UserInterface = await body.value;
  let status = 200;

  if (userInfo.hasOwnProperty("name") && userInfo.hasOwnProperty("country")) {
    response.body = await insert(userInfo);
  } else {
    response.body = { "error": "Invalid request body!" };
    status = 400;
  }

  response.status = status;
}
export async function updateUser(
  { request, response, params }: { request: any; response: any; params: any },
) {
  const body = await request.body({ type: 'json'});
  const userInfo: UserInterface = await body.value;
  const hasRecord = await isUserExist(params.id);
  let responseMessage = {};
  let status = 200;

  if (hasRecord) {
    responseMessage = await update(userInfo.name, userInfo.country, params.id);
  } else {
    responseMessage = { "error": "User not found!" };
    status = 400;
  }

  response.body = responseMessage;
  response.status = status;
}
export async function deleteUser(
  { params, response }: { params: any; response: any },
) {
  const hasRecord = await isUserExist(params.id);
  let responseMessage = {};
  let status = 200;

  if (hasRecord) {
    responseMessage = await remove(params.id);
  } else {
    responseMessage = { "error": "User not found!" };
    status = 400;
  }

  response.body = responseMessage;
  response.status = status;
}
