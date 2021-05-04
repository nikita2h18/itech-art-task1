import fetch from "node-fetch";
import pkg from "node-html-parser";
import {Link} from './Link.mjs'

const {parse} = pkg;

const url = 'https://www.calhoun.io';
let domain = new URL(url);
domain = domain.hostname.replace('www.', '');
let visitedLinks = [];
visitedLinks.push(new Link(url, false));

async function seenLinks(link) {
    visitedLinks.forEach(l => {
        if (l.url === link) {
            l.visited = true;
        }
    })
    const htmlText = await getHtmlText(link);
    const htmlElements = parse(htmlText).querySelectorAll("a[href]");
    getSiteLinks(htmlElements).forEach(l => {
        if (!visitedLinks.includes(l.url)) {
            visitedLinks.push(l);
        }
    });

    visitedLinks.forEach(link => {
        if (link.url !== '/' && !link.visited) {
            seenLinks(link.url);
        } else {
            return visitedLinks;
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
                htmlElement._attrs.href[0] === '/'
                && htmlElement._attrs.href[0] !== '/') {
                siteLinks.push(new Link(htmlElement._attrs.href, false));
            }
        }
    );

    return siteLinks;
}

seenLinks(url).then(() => console.log(visitedLinks));
