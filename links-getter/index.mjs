import fetch from "node-fetch";

let url = 'https://www.calhoun.io/';
let visitedLinks = [];

async function breadthSearch(url) {
    const getHref = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    const getLink = /(https?:\/\/[^\s]+)\//g;

    visitedLinks.push(url);
    const response = await fetch(url);
    const html = await response.text();
    const href = await html.match(getHref);
    let sitePages = [];

    await href.forEach(e => {
        if (e.includes(url)) {
            sitePages.push(e);
        }
    })

    let links = []
    sitePages.forEach(
        link => links.push(link.match(getLink)[0])
    )


    if (links.length !== 0) {
        links.forEach(link => {
            if (!visitedLinks.includes(link)) {
                breadthSearch(link)
            }
        });
    }
}

breadthSearch(url).then(() => console.log(visitedLinks));
