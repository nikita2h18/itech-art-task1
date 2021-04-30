import fetch from "node-fetch";

let url = 'https://www.calhoun.io/';

async function breadthSearch(url) {
    const getAllHrefs = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    const getLinks = /(https?:\/\/[^\s]+)\//g;
    console.log('url ' + url);

    const response = await fetch(url);
    const html = await response.text();
    const href = await html.match(getAllHrefs);
    let sitePages = [];

    await href.forEach(e => {
        if (e.includes(url)) {
            sitePages.push(e);
        }
    })

    let links = []
    sitePages.forEach(
        link => links.push(link.match(getLinks))
    )

    console.log(links);

    if (links.length === 0) {
        return "Done";
    } else {
        links.forEach(link => breadthSearch(link));
    }
}

breadthSearch(url).then(done => console.log(done));
