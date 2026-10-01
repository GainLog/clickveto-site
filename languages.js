(()=>{
 'use strict';
 const {shared,meta}=JSON.parse(document.getElementById('siteLanguageData').textContent),codes=['en','de','zh','es','ru'],htmlCodes={en:'en',de:'de',zh:'zh-CN',es:'es',ru:'ru'};
 const sections={features:{en:'features',de:'funktionen',zh:'features-zh',es:'features-es',ru:'features-ru'},pro:{en:'pro',de:'pro-de',zh:'pro-zh',es:'pro-es',ru:'pro-ru'},privacy:{en:'privacy',de:'datenschutz',zh:'privacy-zh',es:'privacy-es',ru:'privacy-ru'},support:{en:'support',de:'hilfe',zh:'support-zh',es:'support-es',ru:'support-ru'}};
 function detect(value){const code=String(value||'').toLowerCase();if(code.startsWith('zh')&&!/tw|hk|hant/.test(code))return'zh';for(const lang of ['en','de','es','ru'])if(code===lang||code.startsWith(lang+'-'))return lang;return null;}
 function setLang(lang,updateUrl=false){
  if(!codes.includes(lang))lang='en';for(const code of codes)document.getElementById(code).classList.toggle('hidden',code!==lang);
  for(const button of document.querySelectorAll('[data-language]')){const active=button.dataset.language===lang;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
  document.documentElement.lang=htmlCodes[lang];for(const el of document.querySelectorAll('[data-site-copy]'))el.textContent=shared[lang][el.dataset.siteCopy]||el.dataset.siteCopy;
  document.title=meta[lang].title;document.querySelector('meta[name="description"]').content=meta[lang].description;document.querySelector('meta[property="og:title"]').content=meta[lang].title;document.querySelector('meta[property="og:description"]').content=meta[lang].ogDescription;document.querySelector('nav').setAttribute('aria-label',meta[lang].navLabel);
  const navFeatures=document.querySelector('.nav-links a[data-en="Features"]');navFeatures.href='#'+sections.features[lang];document.querySelector('.nav-links a[href^="#pro"]').href='#'+sections.pro[lang];for(const id of ['privacyLink','navPrivacy'])document.getElementById(id).href='#'+sections.privacy[lang];
  try{localStorage.setItem('clickveto-lang',lang);}catch{}
  try{const url=new URL(location.href),hash=url.hash.slice(1);for(const values of Object.values(sections))if(Object.values(values).includes(hash))url.hash=values[lang];if(updateUrl)url.searchParams.set('lang',htmlCodes[lang]);if(url.href!==location.href)history.replaceState(null,'',url.href);if(updateUrl&&url.hash)document.getElementById(url.hash.slice(1))?.scrollIntoView();}catch{}
 }
 for(const button of document.querySelectorAll('[data-language]'))button.onclick=()=>setLang(button.dataset.language,true);
 let saved='';try{saved=localStorage.getItem('clickveto-lang')||'';}catch{}
 const returnUrl=new URL(location.href);for(const box of document.querySelectorAll('.checkout-return'))box.classList.toggle('hidden',returnUrl.searchParams.get('purchase')!=='success');if(returnUrl.searchParams.has('checkout_id')){returnUrl.searchParams.delete('checkout_id');history.replaceState(null,'',returnUrl.pathname+returnUrl.search+returnUrl.hash);}
 const requested=detect(returnUrl.searchParams.get('lang'));setLang(requested||detect(saved)||detect(navigator.language)||'en');
})();
