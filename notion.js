const { Client } = require('@notionhq/client');

// https://stackoverflow.com/questions/68781041/notion-api-vanilla-js-fetch-does-not-work
const NOTION_TOKEN = 'secret_LLKcY8497oZiOds3p6ErxGtvZ9GN04kPzdrjB69aEkG';

const notion = new Client({ auth: NOTION_TOKEN });

// const blockId = '1225254b-35c3-483b-9813-d1280df638c8';
const blockId = '91bb71ef-8c45-4bb0-8b7dc-d2e895eb973';
// const blockId = 'c02fc1d3-db8b-45c5-a222-27595b15aea7';
notion.blocks.retrieve({
  block_id: blockId,
});
