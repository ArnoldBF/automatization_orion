const puppeteer = require("puppeteer");
const extraerIdAngetes = async (login, password, pbx) => {
    const idAgentes = [];
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`${pbx}`);

    await page
        .locator('input[id="ctl00_phContent_txtUsuario"]')
        .fill(`${login}`);

    await page
        .locator('input[id="ctl00_phContent_txtPassword"]')
        .fill(`${password}`);

    await page.click('input[id="ctl00_phContent_btnAceptar"]');

    await page.goto(`${pbx}inicio.aspx`);

    await page.hover('td[id="stUI3_cnt"]');

    await page.click('a[id="stUI5_lnk"]');

    await page.goto(`${pbx}MonitorDeAgentes_Main.aspx?rnd=0.3937113725373216`);

    setTimeout(async () => {
        await page.screenshot({ path: "ejemplo.png", fullPage: true });
    }, 1000);

    const listDeItems = await page.$$(
        "tr.FilaEstandar,tr.FilaEstandarAlt,tr.FilaEstandarWarn-ROJO"
    );

    for (let item of listDeItems) {
        const agente = await item.$("td");
        const getAgente = await page.evaluate(
            (agente) => agente.innerText,
            agente
        );

        idAgentes.push(getAgente);
    }

    return idAgentes;
};

const extraerCampañas = async (login, password, pbx) => {
    const campañas = [];
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(`${pbx}`);

    await page
        .locator('input[id="ctl00_phContent_txtUsuario"]')
        .fill(`${login}`);

    await page
        .locator('input[id="ctl00_phContent_txtPassword"]')
        .fill(`${password}`);

    await page.click('input[id="ctl00_phContent_btnAceptar"]');

    await page.goto(`${pbx}inicio.aspx`);

    await page.hover('td[id="stUI10_cnt"]');

    await page.hover('a[id="stUI13_lnk"]');
    await page.waitForSelector('a[id="stUI15_lnk"]');
    await page.click('a[id="stUI15_lnk"]');

    await page.waitForSelector('input[id="ctl00_phContent_btnExcel"]');

    await page.click('input[id="ctl00_phContent_btnExcel"]');
};

module.exports = { extraerIdAngetes, extraerCampañas };
