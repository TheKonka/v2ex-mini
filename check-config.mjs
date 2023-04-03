import { open } from 'node:fs/promises';

const file = await open('./config/index.js');

const content = await file.readFile({
	encoding: 'utf-8'
});
const token = content.match(/__PERSONAL_ACCESS_TOKEN__:\sJSON.stringify[()]'(.*)'[)]/)[1];

if (token.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
	throw new Error('token is valid');
}
