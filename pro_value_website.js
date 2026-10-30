(()=>{
 'use strict';for(const box of document.querySelectorAll('[data-demo-language]'))box.append(ClickVetoProValueDemo.create(ClickVetoProValueCopy.get(box.dataset.demoLanguage)));
 const reveal=()=>{const hash=location.hash.slice(1);if(!hash)return;const target=document.getElementById(hash);if(target?.closest('.cv-private-preview'))target.closest('.cv-private-preview').open=true;};window.addEventListener('hashchange',reveal);reveal();
})();
