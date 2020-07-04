const playwright = require('playwright');
console.log('start');
(async () => {
    var url='https://netcoreblockly.herokuapp.com';
    //url='http://localhost:5000';
    for (const browserType of ['chromium'/*, 'firefox', 'webkit'*/]) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      var page = await context.newPage();
      await page.goto(url);
      page = await context.newPage();
      page.on('dialog', async dialog => {
          console.log(dialog.message());
          await dialog.accept("123");
  
      });
      await page.goto(`${url}/blockly.html`);

      await page.keyboard.press('Escape');
      //await clickExecute('firstDemo',page,browserType);
      //const text = await page.evaluate(() => Array.from(document.querySelectorAll('#results > li'), element => element));//.textContent
      const allTests = await page.$$('#results > li');
      console.log(allTests.length);
      for(var i=0;i<allTests.length;i++){
            
        var nr= (i+1).toString().padStart(3,'0');
        console.log(`starting test ${nr}`)
        var li  = allTests[i];
        await li.scrollIntoViewIfNeeded();
        var text=await li.$("a");
        text=await text.getProperty("innerHTML");
        text = await text.jsonValue();
        text = "Test_" + nr +"_"+text;
        //console.log(text);
        await li.click();
        await sleep(1000);
        await clickExecute(text,page,browserType, (i !=11));
        //break;
      }
      
      
            //await text[3].click();
      //.await clickExecute('firstDemo',page,browserType);
      // const handle = await page.$('//ul[@id="results"]/li');
      // console.log(handle);
      // var prop=await handle.getProperty("value");
      // console.log(await prop.jsonValue());
      await browser.close();
    }
  })();

  async function clickExecute(name, page, browserType, shouldComplete){
    console.log(`start ${name} ${browserType}`);
    await page.click('text=E X E C U T E');

    await sleep(5000);
    const handle = await page.$('//textarea[@id="output"]');
    await handle.focus();
    //console.log(handle);
    var x=await handle.getProperty("value");
    var  text = (await x.jsonValue());
    var filename = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if(shouldComplete && (!text.includes("Program complete"))){
      console.log('possible error !! ');
      filename='error'+filename;
    }
    
    await page.screenshot({ path: `${filename }-${browserType}.png` });

  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }