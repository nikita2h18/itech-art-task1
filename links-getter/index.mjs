import fetch from "node-fetch";
import pkg from "node-html-parser";

const {parse} = pkg;

const url = 'https://www.calhoun.io';
let domain = new URL(url);
domain = domain.hostname.replace('www.', '');
const links = new Map();
let visitedLinks = [];

async function seenLinks(link) {
    visitedLinks.push(link)
    const htmlText = await getHtmlText(link);
    const htmlElements = parse(htmlText).querySelectorAll("a[href]");
    const siteLinks = getSiteLinks(htmlElements);

    siteLinks.forEach(link => {
        if (!visitedLinks.includes(link) && link !== '/') {
            seenLinks(link);
        }
    });
}

async function getHtmlText(link) {
    let response;

    if (link[0] === '/') {
        response = await fetch(url + link);
    } else {
        response = await fetch(link);
    }

    return response.text();
}

function getSiteLinks(htmlElements) {
    const siteLinks = [];
    htmlElements.forEach(
        htmlElement => {
            if (htmlElement._attrs.href.includes(domain) &&
                !htmlElement._attrs.href.includes('mailto') ||
                htmlElement._attrs.href[0] === '/') {
                siteLinks.push(htmlElement._attrs.href);
            }
        }
    );

    return siteLinks;
}

seenLinks(url).then(() => console.log(visitedLinks));
