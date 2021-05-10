import fetch from "node-fetch";
import pkg from "node-html-parser";
import { deleteLastSlash, isRelative, isSlashLast } from "./helpers.mjs";

const { parse } = pkg;

const url = "https://www.calhoun.io";

async function collectPages(link, siteLinks = new Map()) {
  console.log("Collect: " + link);
  const htmlText = await getPage(link);
  const htmlElements = parse(htmlText).querySelectorAll("a[href]");
  siteLinks.set(link, true);

  siteLinks = collectPageLinks(htmlElements, siteLinks);
  if (isAllVisited(siteLinks)) {
    return siteLinks;
  }
  for (let [link, isSeen] of siteLinks) {
    if (!isSeen) {
      return collectPages(link, siteLinks);
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
  return (
    (link.includes(url) && !link.includes("mailto")) ||
    (isRelative(link) && link !== "/")
  );
}

function collectPageLinks(htmlElements, visitedLinks) {
  htmlElements.forEach((htmlElement) => {
    let link = htmlElement._attrs.href;
    if (isLinkValid(link)) {
      if (isRelative(link)) {
        link = url + link;
      }
      if (isSlashLast(link)) {
        link = deleteLastSlash(link);
      }
      if (!visitedLinks.has(link)) {
        visitedLinks.set(link, false);
      }
    }
  });

  return visitedLinks;
}

await collectPages(url);
