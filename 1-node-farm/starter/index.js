const url = require("url");
const http = require("http");
const fs = require("fs");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, el) => {
  let output = temp
    .replace(/{%ID%}/g, el.id)
    .replace(/{%PRODUCTNAME%}/g, el.productName)
    .replace(/{%IMAGE%}/g, el.image)
    .replace(/{%FROM%}/g, el.from)
    .replace(/{%PRODUNUTRIENTSCTNAME%}/g, el.nutrients)
    .replace(/{%QUANTITY%}/g, el.quantity)
    .replace(/{%PRICE%}/g, el.price)
    .replace(/{%DESCRITION%}/g, el.description); // NodeJs does't support replaceAll
  if (!el.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml));
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/HTML" });
    res.end(replaceTemplate(tempProduct, dataObj[query.id]));
  } else {
    res.writeHead(404, { "content-type": "text/HTML" });
    res.end("<h1>404 - NOT FOUND</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("server is running");
});
