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
    visitedLinks = getSiteLinks(htmlElements, visitedLinks);
    if (isAllVisited(visitedLinks)) {
        return visitedLinks;
    } else {
        for (let visitedLink of visitedLinks) {
            if (!visitedLink[1]) {
                getVisitedLinks(visitedLink[0], visitedLinks);
            }
        }
    }
}

function isAllVisited(visitedLinks) {
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

function isNotVisited(link, visitedLinks) {
    return !visitedLinks.has(link);
}

function getSiteLinks(htmlElements, visitedLinks) {
    htmlElements.forEach(
        htmlElement => {
            let link = htmlElement._attrs.href;
            if (isLinkValid(htmlElement)) {
                if (isRelative(link)) {
                    link = url + link;
                }
                if (link[link.length - 1] === '/') {
                    link = link.substring(0, link.length - 1);
                }
                if (isNotVisited(link, visitedLinks)) {
                    visitedLinks.set(link, false);
                }
            }
        }
    );

    return visitedLinks;
}

getVisitedLinks(url).then(result => console.log(result));
