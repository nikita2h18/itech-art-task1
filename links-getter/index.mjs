import fetch from "node-fetch";
import pkg from "node-html-parser";
import {isRelative, isSlashLast} from "./helpers.mjs"

const {parse} = pkg;

const url = 'https://www.calhoun.io';

async function collectPages(page, pages = new Map()) {
    console.log("Collect: " + page);
    const htmlText = await getPage(page);
    const htmlElements = parse(htmlText).querySelectorAll("a[href]");
    pages.set(page, true);

    pages = collectPageLinks(htmlElements, pages);
    if (isAllVisited(pages)) {
        return pages;
    }
    for (let [link, isSeen] of pages) {
        if (!isSeen) {
            return collectPages(link, pages);
        }
    }
}

async function getPage(href) {
    const res = await fetch(href);
    return res.text();
}

function isAllVisited(visitedLinks) {
    for (let [_, isSeen] of visitedLinks) {
        if (isSeen) {
            return false;
        }
    }
    return true;
}

function isLinkValid(link) {
    return link.includes(url) &&
        !link.includes('mailto') ||
        link[0] === '/' &&
        link !== '/';
}

function collectPageLinks(htmlElements, visitedLinks) {
    htmlElements.forEach(
        htmlElement => {
            let link = htmlElement._attrs.href;
            if (isLinkValid(link)) {
                if (isRelative(link)) {
                    link = url + link;
                }
                if (isSlashLast) {
                    link = link.substring(0, link.length - 1);
                }
                if (!visitedLinks.has(link)) {
                    visitedLinks.set(link, false);
                }
            }
        }
    );

    return visitedLinks;
}

collectPages(url).then(result => result);
