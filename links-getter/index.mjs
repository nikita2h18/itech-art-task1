import fetch from "node-fetch";
import pkg from "node-html-parser";

const {parse} = pkg;

const url = 'https://www.calhoun.io';
let domain = new URL(url);
domain = domain.hostname;

async function getVisitedLinks(link, visitedLinks = new Map()) {
    visitedLinks.set(link, true);

    const response = await fetch(link);
    const htmlText = await getHtmlText(response);
    const htmlElements = parse(htmlText).querySelectorAll("a[href]");

    getSiteLinks(htmlElements, visitedLinks);
    if (allVisited(visitedLinks)) {
        return visitedLinks;
    }

    const links = [ ...visitedLinks.keys()];
    links.forEach(l => {
        if (!visitedLinks.get(l)) {
            getVisitedLinks(l, visitedLinks);
        }
    })
}

function allVisited(visitedLinks) {
    for (let link of visitedLinks) {
        if (link[1] === false) {
            return false;
        }
    }
    return true;
}

function isRelative(link) {
    return link[0] === '/';
}

async function getHtmlText(response) {
    return response.text();
}

function isLinkValid(htmlElement) {
    return htmlElement._attrs.href.includes(url) &&
        !htmlElement._attrs.href.includes('mailto') ||
        htmlElement._attrs.href[0] === '/'
        && htmlElement._attrs.href !== '/';
}

function getSiteLinks(htmlElements, visitedLinks) {
    htmlElements.forEach(
        htmlElement => {
            if (isLinkValid(htmlElement)) {
                if (isRelative(htmlElement._attrs.href)) {
                    htmlElement._attrs.href = url + htmlElement._attrs.href;
                }
                if (htmlElement._attrs.href[htmlElement._attrs.href.length - 1] === '/') {
                    visitedLinks.set(htmlElement._attrs.href.substring(0, htmlElement._attrs.href.length - 1), false);
                } else {
                    visitedLinks.set(htmlElement._attrs.href, false);
                }
            }
        }
    );

    return visitedLinks;
}

getVisitedLinks(url).then(result => console.log(result));
