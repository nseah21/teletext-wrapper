import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { sql } from "@vercel/postgres";

async function scrapeLotteryData() {
  const URL =
    "https://www.singaporepools.com.sg/en/product/Pages/4d_results.aspx";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const data = await page.evaluate(() => {
    const LATEST_DRAW_XPATH =
      "/html/body/form/div[5]/div[1]/div/section/div/div/div/span/section/div/div/div[2]/div/div/div[1]/div[1]/div/div[1]/div/div[3]/div[1]/ul/li[1]/div";
    const table = document.evaluate(
      LATEST_DRAW_XPATH,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    return table.textContent;
  });

  const processedData = data.split("\n").map(s => s.trim()).filter(s => s);

  const drawDate = processedData[0];
  const drawId = processedData[1].split("Draw No. ")[1];
  const firstPrize = processedData[3];
  const secondPrize = processedData[5];
  const thirdPrize = processedData[7];
  const starterPrizes = "{" + processedData.slice(9, 19).toString() + "}";
  const consolationPrizes = "{" + processedData.slice(20).toString() + "}";

  browser.close();

  return {
    drawDate: drawDate,
    drawId: drawId,
    firstPrize: firstPrize,
    secondPrize: secondPrize,
    thirdPrize: thirdPrize,
    starterPrizes: starterPrizes,
    consolationPrizes: consolationPrizes
  }
}

export async function POST(request) {
  const drawData = await scrapeLotteryData();
  console.log(drawData);

  const { drawDate, drawId, firstPrize, secondPrize, thirdPrize, starterPrizes, consolationPrizes } = drawData;

  const res = await sql`SELECT FROM Draws WHERE id = ${drawId}`;
  if (res.rows.length > 0) {
    return NextResponse.json({ "message": "Results have already been updated." })
  } else {
    const outcome = await sql`INSERT INTO 
      Draws (id, date, first, second, third, starter, consolation) 
      VALUES (${drawId}, ${drawDate}, ${firstPrize}, ${secondPrize}, ${thirdPrize}, ${starterPrizes}, ${consolationPrizes})`;
    
    if (outcome.rowCount == 1) {
      return NextResponse.json({ "message": `Results for draw ${drawId} have been posted successfully.` });
    } else {
      return NextResponse.json({ "message": "Unable to post draw results. Something went wrong."}, { status: 500 })
    }
  }
}
