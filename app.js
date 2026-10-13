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
  if (portrait) for (const selector of ['#portrait','#bio-portrait']) $(selector).src = portrait.local;
  const biography = content['o-mnie'].texts[1].replace(/\u200b/g,'').split('\n').filter(line => line.trim());
  for (const text of biography) {const p=document.createElement('p');p.textContent=text;$('#bio-text').append(p);}
}
function makeCard(project, title, image) {
  const button=document.createElement('button');button.className='project-card';button.setAttribute('aria-label',`Zobacz projekt: ${title || project.title}`);
  const frame=document.createElement('div');frame.className='project-image';
  const img=document.createElement('img');img.src=image || project.images[0];img.alt=title || project.title;img.loading='lazy';img.width=800;img.height=600;frame.append(img);
  const caption=document.createElement('div');caption.className='project-caption';const heading=document.createElement('h3');heading.textContent=title || project.title;const category=document.createElement('p');category.textContent=categories[project.key];caption.append(heading,category);button.append(frame,caption);button.addEventListener('click',()=>openProject(project));return button;
}
if (content && projects.length) {
  const house=projects.find(p => /Sokolnikach/.test(p.title));
  const interior=projects.find(p => /biurowego w Zgierzu/.test(p.title));
  const duplex=projects.find(p => /Ksawerowie/.test(p.title));
  const selections=[{p:house,t:'Dom jednorodzinny · Sokolniki',image:house?.images[2]},{p:interior,t:'Pokój biurowy · Zgierz'},{p:duplex,t:'Zabudowa bliźniacza · Ksawerów'}];
  selections.forEach(({p,t,image}) => {if(p)$('#featured-projects').append(makeCard(p,t,image));});
  for (const [key,label] of Object.entries(categories)) {
    const button=document.createElement('button');button.textContent=label;button.dataset.filter=key;button.setAttribute('aria-pressed',String(key==='all'));button.addEventListener('click',()=>filterProjects(key));$('.filters').append(button);
  }
  for(const [key,label] of Object.entries(categories).filter(([key])=>key!=='all')){
    const section=document.createElement('section'),heading=document.createElement('h4');heading.textContent=label;section.append(heading);
    for(const text of content[key].texts.filter(text=>!text.startsWith('©'))){const p=document.createElement('p');p.textContent=sentence(text);section.append(p);}
    const link=document.createElement('a');link.href=content[key].url;link.target='_blank';link.rel='noopener';link.textContent='ZOBACZ NA STRONIE PRACOWNI ↗';section.append(link);$('#register-content').append(section);
  }
} else {
  $('#featured-projects').innerHTML='<p class="loading-note">Portfolio: <a href="https://www.archisfera.net/projekty">zobacz projekty pracowni ↗</a></p>';
}
function filterProjects(key) {
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===key)));
  const filtered=projects.filter(p=>key==='all' || p.categories.includes(key));
  $('#portfolio-grid').replaceChildren(...filtered.map(p=>makeCard(p)));
  let description='';
  if(key==='zdrowie' || key==='przedszkola') description=content[key].texts[1];
  else if(key!=='all') description=content[key].texts[0];
  $('#category-description').textContent=description;
  $('#portfolio-count').textContent=`${filtered.length} ${filtered.length===1?'projekt':'projektów'} · materiały pracowni ArchiSfera`;
}
$('#show-projects').addEventListener('click',()=>{
  const open=$('#portfolio').hidden;$('#portfolio').hidden=!open;$('#show-projects').setAttribute('aria-expanded',String(open));$('#show-projects').innerHTML=open?'Zwiń archiwum <span>−</span>':'Zobacz wszystkie projekty <span>↗</span>';
  if(open){filterProjects('all');$('#portfolio').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
});
function openDialog(dialog){dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');}
$('#open-bio').addEventListener('click',()=>openDialog($('#bio-dialog')));
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
