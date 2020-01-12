import React from "react";
import Arweave from "arweave/web";

export const arweave = Arweave.init({
  host: "localhost",
  port: 4000,
  protocol: "http"
});

export const API_HOST = "";

export const APP_NAME = `arweave-blog-0.0.1`;
export const SOCIAL_GRAPH_APP_NAME = `social-graph`;
export const SOCIAL_GRAPH_APP_VERSION = `0.0.1`;

export const createTransaction = async (post, tags, wallet) => {
  const tx = await arweave.createTransaction({ data: post }, wallet);

  tx["last_tx"] = await arweave.api.get("/tx_anchor").then(x => x.data);

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }

  await arweave.transactions.sign(tx, wallet);
  return tx;
};

export const publishTransaction = async tx => {
  await arweave.transactions.post(tx);
  return tx;
};

export const publishPost = async (post, user) => {
  const { address, wallet } = user;
  const tx = await arweave.createTransaction({ data: post }, wallet);

  tx["last_tx"] = await arweave.api.get("/tx_anchor").then(x => x.data);

  const tags = {
    "App-Name": APP_NAME
  };

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }

  await arweave.transactions.sign(tx, wallet);
  await arweave.transactions.post(tx);

  tx["owner"] = address;
  tx["tags"] = tags;

  return tx;
};

export const publishSocialGraphAction = async (data, user) => {
  const { followAddress, action } = data;
  const { address, wallet } = user;
  const tx = await arweave.createTransaction({ data: followAddress }, wallet);

  tx["last_tx"] = await arweave.api.get("/tx_anchor").then(x => x.data);

  const tags = {
    "App-Name": SOCIAL_GRAPH_APP_NAME,
    "App-Version": SOCIAL_GRAPH_APP_VERSION,
    Action: action,
    "App-Filter": APP_NAME
  };

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }

  await arweave.transactions.sign(tx, wallet);
  await arweave.transactions.post(tx);

  tx["owner"] = address;
  tx["tags"] = tags;

  return tx;
};

export const getUserInfo = async address => {
  const info = await fetch(`${API_HOST}/arweave-social/user/${address}`);
  return info;
};

export const UserContext = React.createContext({
  user: null,
  handleUser: () => {}
});
