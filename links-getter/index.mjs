import fetch from "node-fetch";

let url = 'https://www.calhoun.io/';
const getAllHrefs = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
const getLinks = /(https?:\/\/[^\s]+)/g;

let response = await fetch(url);
let html = await response.text();
let href = await html.match(getAllHrefs);
let sitePages = [];

await href.forEach(e => {
    if (e.includes(url)) {
        sitePages.push(e);
    }
})

let links = []
sitePages.forEach(
    link => {
        links.push(link.match(getLinks))
    }
)

console.log(links);

