import fetch from "node-fetch";
import pkg from "node-html-parser";

const {parse} = pkg;

const url = 'https://www.calhoun.io';
const domain = 'calhoun.io'
const visitedLinks = [];

async function getLinks(link) {
    visitedLinks.push(link);

    const htmlText = await getHtmlText(link);
    const htmlElements = parse(htmlText).querySelectorAll("a[href]");
    let siteLinks = [];
    htmlElements.forEach(
        htmlElement => {
            if (htmlElement._attrs.href.includes(domain) &&
                !htmlElement._attrs.href.includes('mailto') ||
                htmlElement._attrs.href[0] === '/') {
                siteLinks.push(htmlElement._attrs.href)
            }
        }
    );

    siteLinks.forEach(link => {
        if (!visitedLinks.includes(link) && link !== '/') {
            getLinks(link)
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

getLinks(url).then(() => {console.log(visitedLinks)});