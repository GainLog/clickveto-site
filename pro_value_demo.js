(function(root){
 'use strict';
 const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
 function create(T){
  const section=node('section','','cv-value-demo');section.dataset.userContent='';section.setAttribute('aria-label',T.demo);
  const heading=node('h2',T.demo),note=node('p',T.demoNote,'cv-value-note'),actions=node('div','','cv-value-actions'),stage=node('div','','cv-value-stage');
  const article=node('article','','cv-value-article');article.append(node('h3',T.sample),node('p',T.article),node('div','▰ ▰ ▰ ▰','cv-value-lines'));
  const nuisances=node('div','','cv-value-nuisances');for(const label of [T.newsletter,T.survey,T.floating])nuisances.append(node('div',label,'cv-value-nuisance'));
  stage.append(article,nuisances);const status=node('p','','cv-value-result');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const before=node('button',T.before),after=node('button',T.after);before.type=after.type='button';before.dataset.demo='before';after.dataset.demo='after';
  const set=on=>{nuisances.hidden=on;before.setAttribute('aria-pressed',String(!on));after.setAttribute('aria-pressed',String(on));status.textContent=on?T.result:T.demoNote;};
  before.onclick=()=>set(false);after.onclick=()=>set(true);actions.append(before,after);set(false);section.append(heading,note,actions,stage,status);return section;
 }
 root.ClickVetoProValueDemo=Object.freeze({create});
})(globalThis);
