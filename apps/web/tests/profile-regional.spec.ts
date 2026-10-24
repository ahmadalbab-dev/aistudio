import {expect,test} from '@playwright/test';
test('browser region is automatic, manual preferences survive reload and GPS is opt-in',async({browser},info)=>{
 const context=await browser.newContext({locale:'ms-MY',timezoneId:'Asia/Kuala_Lumpur',viewport:{width:390,height:844}});const page=await context.newPage();
 await page.addInitScript(()=>{Object.defineProperty(navigator,'geolocation',{value:{getCurrentPosition:(_success:unknown,error:(value:{code:number})=>void)=>{(window as unknown as {gpsCalls:number}).gpsCalls=((window as unknown as {gpsCalls:number}).gpsCalls??0)+1;error({code:1});}}});});
 await page.goto('/preview?view=profile');const profile=page.locator('.profile-page');
 await expect(profile.getByLabel('Preferred language')).toHaveValue('ms-MY');await expect(profile.getByLabel('Timezone',{exact:true})).toHaveValue('Asia/Kuala_Lumpur');await expect(profile.getByLabel('Currency preference')).toHaveValue('MYR');await expect(profile.getByRole('checkbox',{name:/Follow device/})).toBeChecked();
 expect(await page.evaluate(()=>(window as unknown as {gpsCalls:number}).gpsCalls??0)).toBe(0);
 await profile.getByLabel('Preferred language').selectOption('en-GB');await profile.getByLabel('Currency preference').selectOption('GBP');await profile.getByLabel('City or area',{exact:true}).fill('London');await profile.getByLabel('Timezone',{exact:true}).fill('Europe/London');await profile.getByRole('button',{name:'Save device preferences'}).click();
 await page.reload();await expect(profile.getByLabel('Currency preference')).toHaveValue('GBP');await expect(profile.getByLabel('Timezone',{exact:true})).toHaveValue('Europe/London');await expect(profile.getByRole('checkbox',{name:/Follow device/})).not.toBeChecked();
 await profile.getByRole('button',{name:'Use device location'}).click();await expect(profile.getByRole('status')).toContainText('permission was declined');await expect(profile.getByLabel('Timezone',{exact:true})).toHaveValue('Europe/London');
 await profile.getByRole('button',{name:'Edit profile',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Edit your profile'});await expect(dialog).toBeVisible();const bounds=await dialog.boundingBox();expect(bounds).not.toBeNull();expect(Math.abs(bounds!.x+bounds!.width/2-195)).toBeLessThan(2);expect(Math.abs(bounds!.y+bounds!.height/2-422)).toBeLessThan(2);await expect(dialog.getByRole('combobox',{name:'Content language'})).toBeVisible();await dialog.getByRole('textbox',{name:'Brand or creator name'}).fill('My creative studio');await expect(dialog.locator('.profile-edit-preview')).toContainText('My creative studio');await expect(dialog.getByRole('button',{name:'Save profile'})).toBeDisabled();
 for(const key of ['Tab','Shift+Tab']){await page.keyboard.press(key);expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);}await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(profile.getByRole('button',{name:'Edit profile',exact:true})).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath('profile-mobile.png'),fullPage:true});await context.close();
});
test('saved brand card, hover preview and refreshed social statuses use workspace responses',async({page},info)=>{
 let connected=true,puts=0,failSave=true;let brand={id:'brand-one',name:'Orbit test brand',voice:'Warm and clear',audience:'Independent creators',guidelines:{language:'English',topics:['Design']}};
 await page.route('**/api/auth/session',route=>route.fulfill({json:{access_token:'synthetic-profile-access',expires_in:3600,refreshable:true,profile:{userId:'user-one',provided:true,details:{displayName:'Ada',accountType:'business',persona:'Business owner',country:'MY',locale:'ms-MY',timeZone:'Asia/Kuala_Lumpur'}}}}));
 await page.route('**/api/workspace/**',async route=>{const request=route.request(),path=new URL(request.url()).pathname;let value:unknown=[];
  if(path.endsWith('/workspaces'))value=[{id:'workspace-one',name:'Test workspace',role:'OWNER'}];
  else if(path.includes('/brands')){if(request.method()==='PUT'){puts++;if(failSave){await route.fulfill({status:503,json:{message:'Temporary failure'}});return;}const payload=request.postDataJSON();brand={...brand,...payload,guidelines:{language:payload.language,topics:payload.topics}};value=brand;}else value=[brand];}
  else if(path.endsWith('/integrations/status'))value={providers:{facebook:{connected,configured:true,oauthImplemented:true,accounts:connected?[{id:'fb-one',name:'My Facebook Page',connected:true,accountType:'PAGE'}]:[]},instagram:{connected:false,configured:true,oauthImplemented:true}}};
  await route.fulfill({json:value});
 });
 await page.setViewportSize({width:1440,height:1000});await page.goto('/?view=profile');const profile=page.locator('.profile-page');await expect(profile.getByRole('heading',{name:'Orbit test brand',exact:true})).toBeVisible();
 const personal=profile.locator('.personal-profile-card');await expect(personal.getByLabel('Your name')).toHaveValue('Ada');await expect(personal.getByLabel('Account type')).toHaveValue('business');await expect(personal.getByLabel('What do you do?')).toHaveValue('Business owner');
 const facebook=profile.getByRole('article',{name:'facebook connection'});await expect(facebook.locator('.profile-led')).toHaveText('Connected');await expect(facebook).toHaveClass(/is-connected/);await expect(profile.getByRole('article',{name:'instagram connection'})).toHaveClass(/is-offline/);
 await page.getByRole('button',{name:'Open profile',exact:true}).hover();const peek=page.getByRole('region',{name:'Saved profile preview'});await expect(peek).toContainText('Ada');await expect(peek).toContainText('Business owner · Business');await expect(peek).toContainText('1 social platforms connected');await page.keyboard.press('Escape');await expect(peek).toHaveCount(0);
 await profile.getByRole('button',{name:'Edit profile',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Edit your profile'});await dialog.getByRole('textbox',{name:'Brand or creator name'}).fill('New Orbit brand');await dialog.getByRole('button',{name:'Save profile',exact:true}).click();await expect(dialog.getByRole('status')).toContainText('Your changes are still here');await expect(dialog.getByRole('textbox',{name:'Brand or creator name'})).toHaveValue('New Orbit brand');failSave=false;await dialog.getByRole('button',{name:'Save profile',exact:true}).click();await expect(dialog).toHaveCount(0);await expect(profile.getByRole('heading',{name:'New Orbit brand',exact:true})).toBeVisible();expect(puts).toBe(2);
 connected=false;await profile.getByRole('button',{name:'Refresh accounts',exact:true}).click();await expect(facebook).toHaveClass(/is-offline/);await expect(facebook).toContainText('Offline · not connected');expect(puts).toBe(2);
 await page.screenshot({path:info.outputPath('profile-desktop.png'),fullPage:true});
 await facebook.getByRole('button',{name:'Connect account',exact:true}).click();await expect(page).toHaveURL(/view=connections/);await expect(page.getByRole('heading',{name:'One workspace. Your channels.'})).toBeVisible();
});

test('signed-out profile offers registration with country and timezone choices',async({page})=>{
 await page.route('**/api/auth/session',route=>route.fulfill({status:401,json:{message:'Sign in required'}}));
 await page.goto('/preview');
 await expect(page.getByRole('button',{name:'Open profile',exact:true})).toHaveCount(0);
 await page.getByRole('link',{name:'Get started',exact:true}).click();
 await expect(page).toHaveURL(/signup=1/);
 const fields=page.getByRole('group',{name:'About you and your region'});
 await expect(fields).toBeVisible();
 await fields.getByLabel('Account type').selectOption('business');
 await fields.getByLabel('What do you do?').selectOption('Business owner');
 await fields.getByLabel('Country',{exact:true}).selectOption('US');
 await expect(fields.getByLabel('Suggested timezone')).toHaveValue('America/New_York');
 await fields.getByLabel('Suggested timezone').selectOption('America/Los_Angeles');
 await fields.getByLabel('Profile language').selectOption('ms-MY');
 await expect(fields.getByLabel('Suggested timezone')).toHaveValue('America/Los_Angeles');
 await fields.getByLabel('Country',{exact:true}).selectOption('MY');
 await expect(fields.getByLabel('Suggested timezone')).toHaveValue('Asia/Kuala_Lumpur');
});
