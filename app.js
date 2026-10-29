'use strict';
const $ = selector => document.querySelector(selector);
const content = window.archisferaContent;
const categories = {all:'Wszystkie', 'od-podstaw':'Od podstaw', rozbudowy:'Rozbudowy i przebudowy', wnetrza:'Wnętrza', zdrowie:'Służba zdrowia', przedszkola:'Przedszkola i żłobki', inwentaryzacje:'Inwentaryzacje'};
const sentence = text => {
  const result = text.replace(/\u200b/g,'').trim().toLocaleLowerCase('pl');
  return (result.charAt(0).toLocaleUpperCase('pl')+result.slice(1)).replace(/łodzi/g,'Łodzi').replace(/łódzkim/g,'Łódzkim').replace(/łódź/g,'Łódź').replace(/warszawie/g,'Warszawie').replace(/sokolnikach/g,'Sokolnikach').replace(/ksawerowie/g,'Ksawerowie').replace(/strykowie/g,'Strykowie').replace(/sulejówku/g,'Sulejówku').replace(/zgierzu/g,'Zgierzu').replace(/rzgowie/g,'Rzgowie').replace(/radomiu/g,'Radomiu').replace(/końskich/g,'Końskich').replace(/konstantynowie/g,'Konstantynowie').replace(/skierniewicach/g,'Skierniewicach').replace(/łasku/g,'Łasku').replace(/sieradzu/g,'Sieradzu');
};
const projects = [];
if (content) {
  for (const key of Object.keys(categories).filter(k => k !== 'all')) {
    const page = content[key];
    if (!page) continue;
    for (const image of page.images) {
      if (!image.preceding || image.preceding.startsWith('©')) continue;
      let project = projects.find(p => p.key === key && p.original === image.preceding);
      if (!project) {
        const lines = image.preceding.replace(/\u200b/g,'').split('\n').filter(Boolean);
        const title = key === 'zdrowie' ? 'Placówki służby zdrowia' : sentence(lines[0]).replace(/\.$/,'');
        project = {id:projects.length,key,original:image.preceding,title,description:lines.slice(1).map(sentence).join('\n'),images:[],source:page.url,categories:[key]};
        if (/przedszkol|żłob|malucha/i.test(image.preceding)) project.categories.push('przedszkola');
        if (/ambulator|chorych/i.test(image.preceding)) project.categories.push('zdrowie');
        projects.push(project);
      }
      if (!project.images.includes(image.local)) project.images.push(image.local);
    }
  }
  const portrait = content['o-mnie'].images.find(i => i.alt === 'KCH');
  if (portrait) for (const selector of ['#portrait','#bio-portrait']) $(selector)?.setAttribute('src',portrait.local);
  const biography = content['o-mnie'].texts[1].replace(/\u200b/g,'').split('\n').filter(line => line.trim());
  for (const text of biography) {const p=document.createElement('p');p.textContent=text;$('#bio-text')?.append(p);}
}
function makeCard(project, title, image,asPageLink=false) {
  const button=document.createElement(asPageLink?'a':'button');button.className='project-card';button.setAttribute('aria-label',`Zobacz projekt: ${title || project.title}`);
  const frame=document.createElement('div');frame.className='project-image';
  const img=document.createElement('img');img.src=image || project.images[0];img.alt=title || project.title;img.loading='lazy';img.width=800;img.height=600;frame.append(img);
  const caption=document.createElement('div');caption.className='project-caption';const heading=document.createElement('h3');heading.textContent=title || project.title;const category=document.createElement('p');category.textContent=categories[project.key];caption.append(heading,category);button.append(frame,caption);if(asPageLink)button.href='projekty/';else button.addEventListener('click',()=>openProject(project));return button;
}
if (content && projects.length) {
  const house=projects.find(p => /Sokolnikach/.test(p.title));
  const interior=projects.find(p => /biurowego w Zgierzu/.test(p.title));
  const duplex=projects.find(p => /Ksawerowie/.test(p.title));
  const living=projects.find(p => /pokoju dziennego/.test(p.title));
  const selections=[{p:house,t:'Dom w Sokolnikach',sub:'Sokolniki · Dom jednorodzinny',image:house?.images[2]},{p:interior,t:'Pokój biurowy',sub:'Zgierz · Wnętrza'},{p:duplex,t:'Zabudowa bliźniacza',sub:'Ksawerów · Od podstaw'},{p:living,t:'Wnętrze mieszkalne',sub:'Koncepcja · Aranżacja wnętrz',image:living?.images[2]}];
  selections.forEach(({p,t,image,sub},index) => {if(p && $('#featured-projects')){const card=makeCard(p,t,image,true);card.querySelector('.project-caption p').textContent=sub;const number=document.createElement('span');number.className='project-number';number.textContent=String(index+1).padStart(2,'0');const type=document.createElement('span');type.className='project-type';type.textContent=categories[p.key].toLocaleUpperCase('pl');const arrow=document.createElement('span');arrow.className='project-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');card.append(number,type,arrow);$('#featured-projects').append(card);}});
  for (const [key,label] of Object.entries(categories)) {
    const button=document.createElement('button');button.textContent=label;button.dataset.filter=key;button.setAttribute('aria-pressed',String(key==='all'));button.addEventListener('click',()=>filterProjects(key));$('.filters')?.append(button);
  }
  for(const [key,label] of Object.entries(categories).filter(([key])=>key!=='all')){
    const section=document.createElement('section'),heading=document.createElement('h4');heading.textContent=label;section.append(heading);
    for(const text of content[key].texts.filter(text=>!text.startsWith('©'))){const p=document.createElement('p');p.textContent=sentence(text);section.append(p);}
    const link=document.createElement('a');link.href=content[key].url;link.target='_blank';link.rel='noopener';link.textContent='ZOBACZ NA STRONIE PRACOWNI ↗';section.append(link);$('#register-content')?.append(section);
  }
} else {
  if($('#featured-projects'))$('#featured-projects').innerHTML='<p class="loading-note">Portfolio: <a href="https://www.archisfera.net/projekty">zobacz projekty pracowni ↗</a></p>';
}
let activeCategory='all';
function filterProjects(key) {
  activeCategory=Object.hasOwn(categories,key)?key:'all';key=activeCategory;
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===key)));
  const query=($('#project-search')?.value || '').trim();
  const normalize=text=>text.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
  const filtered=projects.filter(p=>(key==='all' || p.categories.includes(key)) && normalize(p.original+' '+categories[p.key]).includes(normalize(query)));
  $('#portfolio-grid').replaceChildren(...filtered.map(p=>makeCard(p)));
  let description='';
  if(key==='zdrowie' || key==='przedszkola') description=content[key].texts[1];
  else if(key!=='all') description=content[key].texts[0];
  $('#category-description').textContent=description;
  const word=filtered.length===1?'projekt':(filtered.length%10>=2&&filtered.length%10<=4&&(filtered.length%100<12||filtered.length%100>14)?'projekty':'projektów');
  $('#portfolio-count').textContent=`${filtered.length} ${word} · materiały pracowni ArchiSfera`;
  if($('#portfolio-empty'))$('#portfolio-empty').hidden=filtered.length>0;
}
$('#show-projects')?.addEventListener('click',()=>{
  const open=$('#portfolio').hidden;$('#portfolio').hidden=!open;$('#show-projects').setAttribute('aria-expanded',String(open));$('#show-projects').innerHTML=open?'Zwiń archiwum <span>−</span>':'Wszystkie projekty <span>↗</span>';
  if(open){filterProjects('all');$('#portfolio').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
});
function openDialog(dialog){dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');}
$('#open-bio')?.addEventListener('click',()=>openDialog($('#bio-dialog')));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog && (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom))dialog.close();});
});
let currentProject, imageIndex=0;
function openProject(project){
  currentProject=project;imageIndex=0;$('#project-title').textContent=project.title;$('#project-category').textContent=categories[project.key].toLocaleUpperCase('pl');$('#project-description').textContent=project.description;$('#project-source').href=project.source;
  const thumbnails=project.images.map((image,index)=>{const button=document.createElement('button');button.setAttribute('aria-label',`Zdjęcie ${index+1}`);const img=document.createElement('img');img.src=image;img.alt='';img.loading='lazy';button.append(img);button.addEventListener('click',()=>{imageIndex=index;renderGallery();});return button;});
  $('#gallery-thumbnails').replaceChildren(...thumbnails);renderGallery();openDialog($('#project-dialog'));
}
function renderGallery(){
  const project=currentProject;$('#gallery-image').src=project.images[imageIndex];$('#gallery-image').alt=`${project.title} — widok ${imageIndex+1}`;$('#gallery-counter').textContent=`${String(imageIndex+1).padStart(2,'0')} / ${String(project.images.length).padStart(2,'0')}`;
  $('#gallery-prev').hidden=project.images.length<2;$('#gallery-next').hidden=project.images.length<2;
  [...$('#gallery-thumbnails').children].forEach((button,index)=>button.setAttribute('aria-pressed',String(index===imageIndex)));
}
function nextImage(delta){imageIndex=(imageIndex+delta+currentProject.images.length)%currentProject.images.length;renderGallery();}
$('#gallery-prev').addEventListener('click',()=>nextImage(-1));$('#gallery-next').addEventListener('click',()=>nextImage(1));
$('#project-dialog').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();nextImage(-1);}if(event.key==='ArrowRight'){event.preventDefault();nextImage(1);}});
const menuButton=$('.menu-toggle'),nav=$('#navigation');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='+';}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('span').textContent=open?'−':'+';});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}},{threshold:.08});
  document.querySelectorAll('.section-space').forEach(section=>{section.classList.add('reveal');observer.observe(section);});
}
const contactForm=$('#contact-form');
if(contactForm){
  const serviceNames={koncepcja:'projekt koncepcyjny',budowlany:'projekt budowlany wielobranżowy',technologia:'projekt technologiczny',wizualizacja:'wizualizacja'};
  const service=new URLSearchParams(location.search).get('usluga');
  if(Object.hasOwn(serviceNames,service) && !contactForm.elements.message.value)contactForm.elements.message.value=`Interesuje mnie ${serviceNames[service]}.\n\n`;
  const status=$('#form-status'),copyButton=$('#copy-message');
  const mailLink=document.createElement('a');mailLink.className='prepared-mail';mailLink.hidden=true;mailLink.textContent='Otwórz wiadomość w poczcie ↗';status.before(mailLink);
  const prepareMessage=()=>{const values=Object.fromEntries(new FormData(contactForm));return {subject:`Zapytanie o projekt — ${values.type}`,body:`Dzień dobry,\n\n${values.message.trim()}\n\nRodzaj projektu: ${values.type}\nLokalizacja: ${values.location.trim() || 'Do ustalenia'}\n\nKontakt:\n${values.name.trim()}\nE-mail: ${values.email.trim()}\nTelefon: ${values.phone.trim() || 'Nie podano'}`};};
  contactForm.addEventListener('submit',event=>{event.preventDefault();if(!contactForm.reportValidity())return;const message=prepareMessage();mailLink.href=`mailto:biuro@archisfera.net?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`;mailLink.hidden=false;status.textContent='Wiadomość jest przygotowana. Otwórz ją w poczcie, aby wysłać, lub skopiuj treść.';mailLink.focus();});
  contactForm.addEventListener('input',()=>{mailLink.hidden=true;status.textContent='';});
  copyButton.addEventListener('click',async()=>{if(!contactForm.reportValidity())return;const message=prepareMessage();const text=`Do: biuro@archisfera.net\nTemat: ${message.subject}\n\n${message.body}`;try{await navigator.clipboard.writeText(text);status.textContent='Treść została skopiowana. Wklej ją do wiadomości i wyślij na biuro@archisfera.net.';}catch{status.textContent='Nie udało się skopiować automatycznie. Użyj przycisku „Przygotuj wiadomość”, aby otworzyć ją w swojej poczcie.';}});
}
if(document.body.dataset.page==='projects' && $('#portfolio-grid')){
  filterProjects('all');
  $('#project-search').addEventListener('input',()=>filterProjects(activeCategory));
  $('#clear-project-search').addEventListener('click',()=>{$('#project-search').value='';filterProjects('all');$('#project-search').focus();});
}

// Keep a single navigation bar consistent across every page.
const topbar = $('.topbar');
function updateTopbar(){topbar.classList.toggle('is-scrolled', window.scrollY > 48);}
window.addEventListener('scroll', updateTopbar, {passive:true});
window.addEventListener('pageshow', updateTopbar);
updateTopbar();
