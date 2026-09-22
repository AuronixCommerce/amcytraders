const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const ADMIN_UID = 'sAYmgRLwq4g1MIYQPRrT5CeiqJB3';
const SESSION_EXPIRES_KEY = 'amcy_admin_session_expires_at';
const SESSION_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB8AYL6JYpKJYxtS_1EsEMpMFdrjYIM06k',
  authDomain: 'amcy-traders.firebaseapp.com',
  databaseURL: 'https://amcy-traders-default-rtdb.firebaseio.com',
  projectId: 'amcy-traders',
  storageBucket: 'amcy-traders.firebasestorage.app',
  messagingSenderId: '70776800554',
  appId: '1:70776800554:web:7750826c31f81830410a53'
};
const INVOICE_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBS_prlnawp0sQsXp-nAenkd0-Pd1Vj93o',
  authDomain: 'amcy-traders-invoices.firebaseapp.com',
  databaseURL: 'https://amcy-traders-invoices-default-rtdb.firebaseio.com',
  projectId: 'amcy-traders-invoices',
  storageBucket: 'amcy-traders-invoices.firebasestorage.app',
  messagingSenderId: '970228135991',
  appId: '1:970228135991:web:eede9f42c5c8398a9de7b2'
};

const icons = {
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7 8 4v10l-8-4V7Zm16 0-8 4v10l8-4V7Z"/></svg>',
  boxes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 8 5-3 5 3-5 3-5-3Zm0 0v6l5 3 5-3V8M11 17l5 3 5-3v-6l-5-3-3 1.8"/></svg>',
  swap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 7h13m0 0-3-3m3 3-3 3M17 17H4m0 0 3 3m-3-3 3-3"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2 11h11l2-7H6M9 20h.01M17 20h.01"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6m-6 4h6m-6 4h3"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10m6 10V4m6 16v-7m5 7H2"/></svg>',
  history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5m4-1v6l4 2"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
  alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5m0 3h.01"/></svg>',
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h11v12H3V5Zm11 4h4l3 4v4h-7V9Z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>'
};
$$('[data-icon]').forEach(el => el.innerHTML = icons[el.dataset.icon] || '');

const today = new Date();
const blankState = () => ({
  profile:{businessName:'AMCY Trader',currency:'PKR',location:'Main Warehouse',adminName:'Admin User',dataVersion:3,invoicePrefix:'INV',nextInvoiceNumber:1001,taxRate:0,defaultWarehouse:'Main Warehouse'},
  products:[],suppliers:[],customers:[],movements:[],purchases:[],sales:[],returns:[],expenses:[],registers:[],team:[],notifications:[],securityEvents:[],audit:[]
});
const toList = value => Array.isArray(value) ? value.filter(Boolean) : value && typeof value==='object' ? Object.values(value) : [];
const normalizeState = raw => ({
  profile:{...blankState().profile,...(raw?.profile||{})},products:toList(raw?.products),suppliers:toList(raw?.suppliers),customers:toList(raw?.customers),movements:toList(raw?.movements),purchases:toList(raw?.purchases),sales:toList(raw?.sales),returns:toList(raw?.returns),expenses:toList(raw?.expenses),registers:toList(raw?.registers),team:toList(raw?.team),notifications:toList(raw?.notifications),securityEvents:toList(raw?.securityEvents),audit:toList(raw?.audit)
});
const isOriginalMockData = raw => {const products=toList(raw?.products),demoSkus=['AMCY-TX-101','AMCY-SF-205','AMCY-PK-310','AMCY-CL-412','AMCY-PK-322','AMCY-SF-218','AMCY-TX-118'];return !raw?.profile?.dataVersion&&products.length===7&&demoSkus.every(sku=>products.some(p=>p?.sku===sku))};

let state = blankState();
let mode = 'firebase';
let firebase = null;
let invoiceFirebase = null;
let currentUser = null;
let invoiceUser = null;
let cloudOnline = false;
let invoiceCloudOnline = false;
let syncWarningShown = false;
let stopRealtime = null;
let cart = [];

const money = n => `${state.profile.currency || 'PKR'} ${Number(n||0).toLocaleString('en-PK',{maximumFractionDigits:0})}`;
const uid = p => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
const esc = v => String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const initials = s => s.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const product = id => state.products.find(x=>x.id===id);
const availableStock = p => Math.max(0,Number(p?.stock||0)-Number(p?.reserved||0)-Number(p?.damaged||0));
const supplier = id => state.suppliers.find(x=>x.id===id);
const customer = id => state.customers.find(x=>x.id===id);
const customerInvoices = id => state.sales.filter(s=>s.customerId===id);
const customerPayments = c => toList(c?.payments);
const customerBalance = c => Math.max(0,Number(c?.openingBalance||0)+customerInvoices(c?.id).filter(s=>s.payment==='Credit').reduce((sum,s)=>sum+Number(s.total||0)-Number(s.refundedTotal||0),0)-customerPayments(c).reduce((sum,p)=>sum+Number(p.amount||0),0));
const formatDate = v => new Intl.DateTimeFormat('en-PK',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(v));
const formatTime = v => new Intl.DateTimeFormat('en-PK',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(v));
const sessionExpiry = () => Number(localStorage.getItem(SESSION_EXPIRES_KEY)||0);
const beginTrustedSession = () => localStorage.setItem(SESSION_EXPIRES_KEY,String(Date.now()+SESSION_DURATION_MS));
const clearTrustedSession = () => localStorage.removeItem(SESSION_EXPIRES_KEY);
const trustedSessionExpired = () => sessionExpiry()>0&&Date.now()>=sessionExpiry();
async function enforceTrustedSessionDeadline(){if(!currentUser||!trustedSessionExpired())return;clearTrustedSession();if(invoiceFirebase&&invoiceUser)await invoiceFirebase.signOut(invoiceFirebase.auth);await firebase.signOut(firebase.auth);}
setInterval(enforceTrustedSessionDeadline,5*60*1000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')enforceTrustedSessionDeadline()});

const spinnerMarkup = () => `<span class="ios-spinner" aria-hidden="true">${Array.from({length:12},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</span>`;
function setButtonBusy(button,busy,label='Working'){
  if(!button)return;
  if(busy){button.dataset.originalHtml=button.innerHTML;button.disabled=true;button.innerHTML=`${spinnerMarkup()}<span>${label}</span>`;}
  else{button.disabled=false;if(button.dataset.originalHtml){button.innerHTML=button.dataset.originalHtml;delete button.dataset.originalHtml;}}
}
function fieldError(id,message=''){
  const input=$(`#${id}`);let error=$(`[data-error-for="${id}"]`);
  if(input&&!error){error=document.createElement('small');error.className='field-error';error.dataset.errorFor=id;input.closest('label')?.append(error);}
  if(input)input.setAttribute('aria-invalid',message?'true':'false');
  if(error)error.textContent=message;
  return !message;
}
function clearFormErrors(form){$$('.field-error',form).forEach(el=>el.textContent='');$$('[aria-invalid]',form).forEach(el=>el.setAttribute('aria-invalid','false'));}
function focusInvalid(id){const el=$(`#${id}`),target=el?._customButton||el;target?.focus();target?.scrollIntoView({block:'center',behavior:'smooth'});}

function enhanceSelect(select){
  if(select.dataset.customized)return;
  select.dataset.customized='true';select.classList.add('native-select');
  const shell=document.createElement('div');shell.className='custom-select';
  const button=document.createElement('button');button.type='button';button.className='custom-select-button';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  const menu=document.createElement('div');menu.className='custom-select-menu hidden';menu.setAttribute('role','listbox');
  shell.append(button,menu);select.insertAdjacentElement('afterend',shell);
  const render=()=>{
    const selected=select.options[select.selectedIndex]||select.options[0];button.innerHTML=`<span>${esc(selected?.textContent||'Select')}</span><b aria-hidden="true">⌄</b>`;
    menu.replaceChildren(...[...select.options].map(option=>{const item=document.createElement('button');item.type='button';item.className='custom-select-option';item.dataset.value=option.value;item.setAttribute('role','option');item.setAttribute('aria-selected',String(option.selected));item.innerHTML=`<span>${esc(option.textContent)}</span>${option.selected?'<b>Selected</b>':''}`;return item;}));
  };
  select._refreshCustom=render;select._customButton=button;render();
  button.addEventListener('click',()=>{const opening=menu.classList.contains('hidden');$$('.custom-select-menu').forEach(x=>x.classList.add('hidden'));$$('.custom-select-button').forEach(x=>x.setAttribute('aria-expanded','false'));menu.classList.toggle('hidden',!opening);button.setAttribute('aria-expanded',String(opening));});
  menu.addEventListener('click',event=>{const option=event.target.closest('[data-value]');if(!option)return;select.value=option.dataset.value;select.dispatchEvent(new Event('change',{bubbles:true}));render();menu.classList.add('hidden');button.setAttribute('aria-expanded','false');button.focus();});
  select.addEventListener('change',render);
}
function refreshCustomSelects(){$$('select').forEach(select=>{enhanceSelect(select);select._refreshCustom?.();});}
document.addEventListener('click',event=>{if(event.target.closest('.custom-select'))return;$$('.custom-select-menu').forEach(x=>x.classList.add('hidden'));$$('.custom-select-button').forEach(x=>x.setAttribute('aria-expanded','false'));});

async function persist(){
  if(mode==='firebase' && firebase && currentUser?.uid===ADMIN_UID){
    try{await firebase.set(firebase.ref(firebase.db,`businesses/${ADMIN_UID}`),state);cloudOnline=true;return;}
    catch(error){console.error(error);cloudOnline=false;if(!syncWarningShown){syncWarningShown=true;toast('Live sync failed. No changes were saved. Please retry.','error');}updateSync();throw error;}
  }
  throw new Error('Live database connection required');
}
async function addAudit(action,detail){state.audit.unshift({id:uid('a'),action,detail,createdAt:new Date().toISOString(),user:state.profile.adminName||'Admin User'});await persist();}

async function bootFirebase(config){
  try{
    const appMod=await import('https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js');
    const authMod=await import('https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js');
    const dbMod=await import('https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js');
    const app=appMod.initializeApp(config,`amcy-${Date.now()}`);
    const auth=authMod.getAuth(app), db=dbMod.getDatabase(app);
    firebase={...authMod,...dbMod,auth,db}; mode='firebase';
    const invoiceApp=appMod.initializeApp(INVOICE_FIREBASE_CONFIG,'amcy-invoice-vault');
    const invoiceAuth=authMod.getAuth(invoiceApp),invoiceDb=dbMod.getDatabase(invoiceApp);
    invoiceFirebase={...authMod,...dbMod,auth:invoiceAuth,db:invoiceDb};
    return true;
  }catch(e){ console.error(e); mode='offline'; cloudOnline=false; return false; }
}

async function init(){
  $('#dateLine').textContent=new Intl.DateTimeFormat('en-PK',{weekday:'long',day:'numeric',month:'long'}).format(today);
  $('#expenseDate').value=new Date().toISOString().slice(0,10);
  const ok=await bootFirebase(DEFAULT_FIREBASE_CONFIG);
  if(ok){
    invoiceFirebase.onAuthStateChanged(invoiceFirebase.auth,user=>{invoiceUser=user||null;invoiceCloudOnline=!!user;if($('#salesTable'))renderSales();});
    firebase.onAuthStateChanged(firebase.auth,async user=>{
      if(user?.uid===ADMIN_UID){
        if(trustedSessionExpired()){clearTrustedSession();currentUser=null;if(invoiceFirebase&&invoiceUser)await invoiceFirebase.signOut(invoiceFirebase.auth);await firebase.signOut(firebase.auth);showAuth();$('#loginError').textContent='Your trusted-device session expired after 6 months. Please sign in again.';return;}
        if(!sessionExpiry())beginTrustedSession();
        currentUser=user;try{await user.getIdToken();await loadFirebaseData();showApp();}catch{showAuth();$('#loginError').textContent='Signed in, but live data access was denied. Publish the database rules and reload.';}
      }
      else if(user){currentUser=null;await firebase.signOut(firebase.auth);showAuth();$('#loginError').textContent='This account is not authorized for AMCY Trader admin access.';}
      else showAuth();
    });
    updateSync(); return;
  }
  showAuth();$('#loginError').textContent='AMCY Cloud is unavailable. Check your connection and reload.';updateSync();
}
async function loadFirebaseData(){
  const businessRef=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`);
  try{
    const snap=await firebase.get(businessRef);let raw=snap.exists()?snap.val():null;
    if(!raw||isOriginalMockData(raw)){state=blankState();await firebase.set(businessRef,state);}
    else{state=normalizeState(raw);if(state.profile.dataVersion!==3){state.profile.dataVersion=3;await firebase.set(businessRef,state);}}
    cloudOnline=true;syncWarningShown=false;
    if(stopRealtime)stopRealtime();
    stopRealtime=firebase.onValue(businessRef,next=>{state=normalizeState(next.val());cloudOnline=true;syncWarningShown=false;renderAll();},error=>{console.error(error);cloudOnline=false;updateSync();toast('Realtime connection lost. Reconnecting…','error');});
  }catch(error){console.error(error);cloudOnline=false;throw error;}
}
function showAuth(){$('#authScreen').classList.remove('hidden');$('#app').classList.add('hidden')}
function showApp(){
  $('#authScreen').classList.add('hidden');$('#app').classList.remove('hidden');
  if(currentUser){$('#adminEmail').textContent=currentUser.email;}
  renderAll();
}
function updateSync(){
  const signedIn=mode==='firebase'&&currentUser?.uid===ADMIN_UID,live=signedIn&&cloudOnline;
  $('#syncLabel').textContent=live?'AMCY Cloud':signedIn?'Reconnecting…':'Secure workspace';$('#syncSub').textContent=live?'Realtime sync active':signedIn?'Live data unavailable':'Sign in required';
  $('#firebaseStatus').textContent=live?'Connected':signedIn?'Reconnecting':'Ready';$('#firebaseStatus').className=`status-pill ${live?'healthy':'warning'}`;
}

$('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault();$('#loginError').textContent='';
  if(mode!=='firebase'){ $('#loginError').textContent='AMCY Cloud is unavailable right now. Check your connection and reload.'; return; }
  const email=$('#loginEmail').value.trim(),password=$('#loginPassword').value;
  if(!email){$('#loginError').textContent='Enter the administrator email address.';$('#loginEmail').focus();return}
  if(!/^\S+@\S+\.\S+$/.test(email)){ $('#loginError').textContent='Enter a valid email address.';$('#loginEmail').focus();return }
  if(!password){$('#loginError').textContent='Enter the administrator password.';$('#loginPassword').focus();return}
  const submit=$('#loginForm button[type="submit"]');setButtonBusy(submit,true,'Signing in');
  try{
    await Promise.all([firebase.setPersistence(firebase.auth,firebase.browserLocalPersistence),invoiceFirebase.setPersistence(invoiceFirebase.auth,invoiceFirebase.browserLocalPersistence)]);
    const credential=await firebase.signInWithEmailAndPassword(firebase.auth,email,password);
    if(credential.user.uid!==ADMIN_UID){await firebase.signOut(firebase.auth);$('#loginError').textContent='This account is not authorized for AMCY Trader admin access.';return;}
    beginTrustedSession();
    try{await invoiceFirebase.signInWithEmailAndPassword(invoiceFirebase.auth,email,password);invoiceCloudOnline=true;}
    catch(invoiceError){console.error('Invoice vault sign-in failed',invoiceError);invoiceCloudOnline=false;setTimeout(()=>toast('Main workspace connected. Invoice vault needs the same admin login in its Firebase Authentication.','error'),600);}
  }
  catch(err){console.error(err);const messages={'auth/invalid-credential':'Email or password is incorrect.','auth/user-disabled':'This administrator account is disabled.','auth/too-many-requests':'Too many attempts. Please wait and try again.','auth/network-request-failed':'Network error. Check your connection and try again.'};$('#loginError').textContent=messages[err.code]||`Sign-in failed (${String(err.code||'unknown').replace('auth/','')}).`;}
  finally{setButtonBusy(submit,false);}
});
$('#togglePassword').addEventListener('click',e=>{const i=$('#loginPassword');i.type=i.type==='password'?'text':'password';e.target.textContent=i.type==='password'?'Show':'Hide'});
$('#logoutBtn').addEventListener('click',async()=>{clearTrustedSession();if(stopRealtime){stopRealtime();stopRealtime=null;}if(invoiceFirebase&&invoiceUser)await invoiceFirebase.signOut(invoiceFirebase.auth);if(mode==='firebase'&&firebase)await firebase.signOut(firebase.auth);else showAuth()});

const titles={dashboard:'Operations overview',inventory:'Inventory control',movements:'Stock movement ledger',sales:'Point of sale',customers:'Customer management',purchases:'Purchase orders',suppliers:'Supplier directory',reports:'Reports & insights',audit:'Audit log',settings:'System settings','security-dz':'Security DZ','customer-editor':'Customer details','customer-detail':'Customer account','product-editor':'Product details','movement-editor':'Record stock movement','supplier-editor':'Supplier details','purchase-editor':'New purchase order','invoice-detail':'Invoice details'};
function go(view){
  if(view!=='security-dz'&&dangerScope)cancelDangerFlow(true);
  $$('.view').forEach(x=>x.classList.toggle('active',x.id===`view-${view}`));
  $$('#mainNav button').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  $('#pageTitle').textContent=titles[view]||'AMCY Trader';$('#sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
$('#mainNav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)go(b.dataset.view)});
$$('[data-view-jump]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.viewJump)));
$('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.add('open'));
$('#closeSidebar').addEventListener('click',()=>$('#sidebar').classList.remove('open'));

function renderAll(){
  renderKpis();renderDashboard();renderBusinessSuite();renderInventory();renderMovements();renderPOS();renderSales();renderCustomers();renderPurchases();renderSuppliers();renderReports();renderAudit();renderSecurityDZ();populateSelects();renderProfile();refreshCustomSelects();updateSync();
}
function renderKpis(){
  const value=state.products.reduce((s,p)=>s+p.stock*p.cost,0), units=state.products.reduce((s,p)=>s+availableStock(p),0), low=state.products.filter(p=>availableStock(p)<=p.reorder), open=state.purchases.filter(p=>p.status!=='received');
  $('#kpiValue').textContent=money(value);$('#kpiProducts').textContent=state.products.length;$('#kpiUnits').textContent=`${units.toLocaleString()} units on hand`;$('#kpiLow').textContent=low.length;$('#kpiOrders').textContent=open.length;$('#kpiIncoming').textContent=`${open.reduce((s,p)=>s+p.qty,0)} incoming units`;$('#lowStockBadge').textContent=low.length;$('#attentionCount').textContent=low.length;$('#attentionStrip').style.display=low.length?'flex':'none';
}
function renderDashboard(){
  const low=[...state.products].filter(p=>availableStock(p)<=p.reorder).sort((a,b)=>availableStock(a)-availableStock(b)).slice(0,5);
  $('#lowStockList').innerHTML=low.length?low.map(p=>`<div class="stock-row"><div class="product-icon">${initials(p.name)}</div><div><b>${esc(p.name)}</b><small>${esc(p.sku)} · Reorder at ${p.reorder}</small></div><strong>${availableStock(p)} left</strong></div>`).join(''):'<div class="empty-state"><p>All stock levels are healthy.</p></div>';
  $('#recentMovements').innerHTML=[...state.movements].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5).map(m=>`<tr><td><strong>${esc(product(m.productId)?.name||'Deleted product')}</strong></td><td><span class="type-badge ${m.type}">${m.type==='in'?'Stock in':m.type==='out'?'Stock out':'Adjustment'}</span></td><td>${m.type==='out'?'-':'+'}${m.qty}</td><td>${esc(m.reference||'—')}</td><td>${formatTime(m.createdAt)}</td></tr>`).join('');
  const days=[6,5,4,3,2,1,0].map(n=>{const d=new Date(today);d.setDate(d.getDate()-n);const items=state.movements.filter(m=>new Date(m.createdAt).toDateString()===d.toDateString());return{label:d.toLocaleDateString('en',{weekday:'short'}),ins:items.filter(x=>x.type==='in').reduce((s,x)=>s+x.qty,0),outs:items.filter(x=>x.type==='out').reduce((s,x)=>s+x.qty,0)}});const max=Math.max(1,...days.flatMap(d=>[d.ins,d.outs]));
  $('#movementChart').innerHTML=days.map(d=>`<div class="chart-day"><div class="bars"><i class="bar in" title="${d.ins} in" style="height:${Math.max(3,d.ins/max*100)}%"></i><i class="bar out" title="${d.outs} out" style="height:${Math.max(3,d.outs/max*100)}%"></i></div><small>${d.label}</small></div>`).join('');
}
function renderBusinessSuite(){
  const todayKey=new Date().toDateString(),sales=state.sales.filter(s=>new Date(s.createdAt).toDateString()===todayKey),expenses=state.expenses.filter(e=>new Date(e.date||e.createdAt).toDateString()===todayKey),revenue=sales.reduce((n,s)=>n+Number(s.total||0)-Number(s.refundedTotal||0),0),cogs=sales.reduce((n,s)=>n+toList(s.items).reduce((a,i)=>a+Number(i.cost||product(i.productId)?.cost||0)*Number(i.qty||0),0),0),expenseTotal=expenses.reduce((n,e)=>n+Number(e.amount||0),0);
  $('#businessTodayMetrics').innerHTML=`<div><span>Sales</span><strong>${money(revenue)}</strong></div><div><span>Gross profit</span><strong>${money(revenue-cogs)}</strong></div><div><span>Expenses</span><strong>${money(expenseTotal)}</strong></div><div><span>Net profit</span><strong>${money(revenue-cogs-expenseTotal)}</strong></div>`;
  const open=[...state.registers].reverse().find(r=>r.status==='open');
  $('#registerControl').innerHTML=open?`<div class="register-state"><span class="status-pill healthy">Open</span><b>${esc(open.id)}</b><p>Opened ${formatTime(open.openedAt)} with ${money(open.openingCash)}</p><label>Counted cash<input id="registerCountedCash" type="number" min="0" placeholder="Closing cash"></label><button class="danger-btn" data-close-register="${open.id}">Close register</button></div>`:`<div class="register-state"><span class="status-pill draft">Closed</span><p>Open a shift before taking cash payments.</p><label>Opening cash<input id="registerOpeningCash" type="number" min="0" placeholder="0"></label><button class="primary-btn" id="openRegister">Open register</button></div>`;
  const notes=[];state.products.filter(p=>availableStock(p)<=p.reorder).slice(0,3).forEach(p=>notes.push({label:`${p.name} is low`,view:'inventory'}));state.sales.filter(s=>s.invoiceArchiveStatus!=='synced').slice(0,2).forEach(s=>notes.push({label:`${s.id} needs invoice sync`,view:'sales'}));state.customers.filter(c=>customerBalance(c)>0).slice(0,2).forEach(c=>notes.push({label:`${c.name} owes ${money(customerBalance(c))}`,view:'customers'}));state.purchases.filter(p=>p.status!=='received'&&p.expected&&new Date(p.expected)<new Date()).slice(0,2).forEach(p=>notes.push({label:`${p.id} delivery is overdue`,view:'purchases'}));
  $('#businessNotifications').innerHTML=notes.length?notes.map(n=>`<button data-view-jump="${n.view}">${esc(n.label)}<span>Open</span></button>`).join(''):'<p class="quiet-state">No urgent business notifications.</p>';
}
function stockStatus(p){const available=availableStock(p);return available===0?['out','Out of stock']:available<=p.reorder?['warning','Low stock']:['healthy','Healthy']}
function filteredProducts(){const q=$('#inventorySearch').value.toLowerCase(),cat=$('#categoryFilter').value,st=$('#stockFilter').value;return state.products.filter(p=>(`${p.name} ${p.sku} ${p.barcode||''} ${p.variant||''} ${p.category} ${p.warehouse||''}`).toLowerCase().includes(q)&&(cat==='all'||p.category===cat)&&(st==='all'||stockStatus(p)[0]===st||(st==='low'&&stockStatus(p)[0]==='warning')))}
function renderInventory(){
  const rows=filteredProducts();$('#inventoryCount').textContent=`${rows.length} product${rows.length===1?'':'s'}`;$('#inventoryValue').textContent=money(state.products.reduce((s,p)=>s+p.stock*p.cost,0));
  $('#inventoryTable').innerHTML=rows.map(p=>{const st=stockStatus(p),available=availableStock(p);return `<tr><td><div class="product-cell"><span>${initials(p.name)}</span><div><strong>${esc(p.name)}</strong><small>${esc([p.variant,supplier(p.supplierId)?.name].filter(Boolean).join(' · ')||'No supplier')}</small></div></div></td><td>${esc(p.sku)}${p.barcode?`<br><small>${esc(p.barcode)}</small>`:''}</td><td>${esc(p.category)}<br><small>${esc(p.warehouse||state.profile.defaultWarehouse||'')}</small></td><td><span class="stock-number ${st[0]}">${available}</span>${available!==Number(p.stock||0)?`<br><small>${p.stock} physical</small>`:''}</td><td>${p.reorder}</td><td>${money(p.cost)}</td><td><strong>${money(p.stock*p.cost)}</strong></td><td><span class="status-pill ${st[0]}">${st[1]}</span></td><td><button class="row-menu" data-product-menu="${p.id}">•••</button></td></tr>`}).join('');
  $('#inventoryEmpty').classList.toggle('hidden',rows.length>0);$('#inventoryTable').closest('.table-wrap').classList.toggle('hidden',rows.length===0);
  const categories=[...new Set(state.products.map(p=>p.category))].sort();const current=$('#categoryFilter').value;$('#categoryFilter').innerHTML='<option value="all">All categories</option>'+categories.map(c=>`<option>${esc(c)}</option>`).join('');$('#categoryFilter').value=categories.includes(current)?current:'all';
}
function renderMovements(){
  const q=$('#movementSearch').value.toLowerCase(),type=$('#movementTypeFilter').value;const items=[...state.movements].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).filter(m=>{const p=product(m.productId);return(`${p?.name||''} ${m.reference||''}`).toLowerCase().includes(q)&&(type==='all'||m.type===type)});
  $('#movementsTable').innerHTML=items.map(m=>`<tr><td>${formatTime(m.createdAt)}</td><td><strong>${esc(product(m.productId)?.name||'Deleted product')}</strong><br><small>${esc(product(m.productId)?.sku||'')}</small></td><td><span class="type-badge ${m.type}">${m.type==='in'?'Stock in':m.type==='out'?'Stock out':'Adjustment'}</span></td><td><strong>${m.type==='out'?'-':'+'}${m.qty}</strong></td><td>${m.before}</td><td>${m.after}</td><td>${esc(m.reference||'—')}</td><td>${esc(m.user||'Admin')}</td></tr>`).join('')||'<tr><td colspan="8">No movements match these filters.</td></tr>';
}
function renderPOS(){
  const q=($('#posSearch')?.value||'').toLowerCase();
  const available=state.products.filter(p=>(`${p.name} ${p.sku} ${p.barcode||''} ${p.category}`).toLowerCase().includes(q));
  $('#posProducts').innerHTML=available.map(p=>`<button class="pos-product" data-pos-product="${p.id}" ${availableStock(p)<=0?'disabled':''}><b>${esc(p.name)}</b><small>${esc(p.sku)} · ${availableStock(p)} available</small><strong>${money(p.price)}</strong></button>`).join('')||'<div class="empty-state"><h3>No products available</h3><p>Add products to inventory before creating a sale.</p></div>';
  cart=cart.filter(item=>product(item.productId));renderCart();
}
function cartTotals(){const subtotal=cart.reduce((sum,item)=>{const p=product(item.productId);return sum+(p?.price||0)*item.qty},0),discount=Math.min(Math.max(0,Number($('#saleDiscount')?.value||0)),subtotal),taxable=Math.max(0,subtotal-discount),tax=taxable*Math.max(0,Number(state.profile.taxRate||0))/100;return{subtotal,discount,tax,total:taxable+tax,units:cart.reduce((s,i)=>s+i.qty,0)}}
function renderCart(){
  $('#cartItems').innerHTML=cart.length?cart.map(item=>{const p=product(item.productId);return `<div class="cart-row"><div><b>${esc(p.name)}</b><small>${money(p.price)} each · ${money(p.price*item.qty)}</small></div><div class="qty-control"><button data-cart-change="-1" data-cart-id="${p.id}">−</button><span>${item.qty}</span><button data-cart-change="1" data-cart-id="${p.id}" ${item.qty>=availableStock(p)?'disabled':''}>＋</button></div><button class="cart-remove" data-cart-remove="${p.id}" title="Remove">×</button></div>`}).join(''):'<div class="cart-empty">Select a product to begin this invoice.</div>';
  const t=cartTotals(),received=Number($('#saleReceived')?.value||t.total),change=$('#salePayment')?.value==='Cash'?Math.max(0,received-t.total):0;$('#cartUnits').textContent=t.units;$('#cartSubtotal').textContent=money(t.subtotal);$('#cartTax').textContent=money(t.tax);$('#cartTotal').textContent=money(t.total);$('#saleChange').textContent=money(change);$('#completeSale').disabled=!cart.length||!cloudOnline;
}
function invoiceArchiveRecord(sale){
  const refunded=Number(sale.refundedTotal||0);return {schemaVersion:3,invoice:{number:sale.id,status:refunded>=Number(sale.total||0)?'refunded':refunded>0?'partially_refunded':sale.payment==='Credit'?'credit':'paid',issuedAt:sale.createdAt,archivedAt:new Date().toISOString()},business:{name:state.profile.businessName||'AMCY Trader',location:state.profile.location||'',currency:state.profile.currency||'PKR'},customer:{id:sale.customerId||'',name:sale.customer||'Walk-in customer',phone:sale.phone||'',email:sale.email||''},payment:{method:sale.payment,received:Number(sale.received||sale.total),change:Number(sale.change||0)},totals:{subtotal:Number(sale.subtotal||0),discount:Number(sale.discount||0),tax:Number(sale.tax||0),grandTotal:Number(sale.total||0),refundedTotal:refunded,netTotal:Number(sale.total||0)-refunded,unitCount:toList(sale.items).reduce((n,item)=>n+Number(item.qty||0),0)},items:toList(sale.items).map((item,index)=>({line:index+1,productId:item.productId||'',sku:item.sku||'',name:item.name,quantity:Number(item.qty),returnedQuantity:Number(item.returnedQty||0),unitCost:Number(item.cost||0),unitPrice:Number(item.price),lineTotal:Number(item.qty)*Number(item.price)})),note:sale.note||'',audit:{createdByName:sale.user||'Admin User',createdByEmail:currentUser?.email||'',source:'AMCY Trader POS',mainDatabaseUid:currentUser?.uid||ADMIN_UID}};
}
async function archiveInvoice(sale){
  if(!invoiceFirebase||!invoiceUser)throw new Error('Invoice vault is not authenticated');
  const key=String(sale.id).replace(/[.#$\[\]/]/g,'_'),record=invoiceArchiveRecord(sale),root=`invoiceVault/${invoiceUser.uid}`;
  await invoiceFirebase.update(invoiceFirebase.ref(invoiceFirebase.db),{[`${root}/records/${key}`]:record,[`${root}/index/${key}`]:{number:sale.id,customer:sale.customer||'Walk-in customer',total:Number(sale.total||0),refundedTotal:Number(sale.refundedTotal||0),netTotal:Number(sale.total||0)-Number(sale.refundedTotal||0),status:record.invoice.status,payment:sale.payment,issuedAt:sale.createdAt,archivedAt:record.invoice.archivedAt}});
  invoiceCloudOnline=true;return record.invoice.archivedAt;
}
async function markInvoiceArchive(invoiceId,status,archivedAt=''){
  const root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`);
  await firebase.runTransaction(root,current=>{const live=normalizeState(current),sale=live.sales.find(item=>item.id===invoiceId);if(sale){sale.invoiceArchiveStatus=status;if(archivedAt)sale.invoiceArchivedAt=archivedAt;}return live;},{applyLocally:false});
}
function renderSales(){
  const q=($('#salesSearch')?.value||'').toLowerCase(),payment=$('#salesPaymentFilter')?.value||'all';
  const sales=[...state.sales].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).filter(s=>{const haystack=[s.id,s.customer,s.phone,s.email,...toList(s.items).flatMap(i=>[i.name,i.sku])].join(' ').toLowerCase();return haystack.includes(q)&&(payment==='all'||s.payment===payment)});
  $('#salesCount').textContent=sales.length;$('#salesRevenue').textContent=money(sales.reduce((sum,s)=>sum+Number(s.total||0)-Number(s.refundedTotal||0),0));
  $('#salesTable').innerHTML=sales.map(s=>{const synced=s.invoiceArchiveStatus==='synced',archiveLabel=synced?'Invoice vault synced':invoiceCloudOnline?'Archive pending':'Vault offline',refunded=Number(s.refundedTotal||0);return `<tr><td><strong>${esc(s.id)}</strong><span class="sync-mark ${synced?'':'pending'}"><i></i>${archiveLabel}</span></td><td>${esc(s.customer||'Walk-in customer')}<br><small>${esc(s.phone||s.email||'')}</small></td><td>${toList(s.items).reduce((n,i)=>n+i.qty,0)} units${refunded?`<br><small>${money(refunded)} refunded</small>`:''}</td><td>${esc(s.payment)}</td><td><strong>${money(Number(s.total||0)-refunded)}</strong></td><td>${formatTime(s.createdAt)}</td><td><div class="invoice-actions"><button class="receipt-btn view" data-view-sale="${s.id}">View</button><button class="receipt-btn" data-print-sale="${s.id}">Print</button>${synced?'':`<button class="receipt-btn" data-sync-sale="${s.id}">Sync</button>`}</div></td></tr>`}).join('')||'<tr><td colspan="7">No invoices match these filters.</td></tr>';
}
function receiptHtml(sale){
  const business=esc(state.profile.businessName||'AMCY Trader'),location=esc(state.profile.location||'');return `<!doctype html><html><head><title>${esc(sale.id)}</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#f3f5f4;color:#101613;font:13px Arial,sans-serif}.receipt{max-width:410px;margin:auto;background:#fff;border:1px solid #dfe6e2;border-radius:18px;overflow:hidden;box-shadow:0 20px 60px #12251d18}.head{padding:25px 24px 21px;background:#091411;color:#fff}.brand{display:flex;align-items:center;gap:11px}.mark{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:#65e6b4;color:#07110f;font-size:18px;font-weight:900}.brand h1{font-size:18px;margin:0;letter-spacing:.07em}.brand small{display:block;margin-top:3px;color:#8fa69d;font-size:10px;letter-spacing:.04em}.head-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px}.head-row span{display:block;color:#8fa69d;font-size:9px;text-transform:uppercase;letter-spacing:.1em}.head-row b{display:block;margin-top:4px;font-size:14px}.paid{padding:6px 9px;border:1px solid #65e6b455;border-radius:20px;color:#65e6b4;font-size:9px;font-weight:800;letter-spacing:.08em}.body{padding:20px 24px}.customer{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding-bottom:16px;border-bottom:1px solid #e5ebe8}.label{display:block;color:#718079;font-size:9px;text-transform:uppercase;letter-spacing:.08em}.value{display:block;margin-top:4px;font-size:12px;font-weight:700}.items{width:100%;border-collapse:collapse;margin-top:14px}.items th{text-align:left;padding:7px 0;color:#718079;font-size:9px;text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid #e5ebe8}.items th:nth-child(n+2),.items td:nth-child(n+2){text-align:right}.items td{padding:11px 0;border-bottom:1px solid #eef2f0;vertical-align:top}.items td:first-child{font-weight:700}.items small{display:block;margin-top:3px;color:#7d8c85;font-size:9px}.summary{margin:13px 0 0 auto;width:68%}.summary div{display:flex;justify-content:space-between;padding:4px 0;color:#64736c}.summary b{color:#111}.summary .grand{margin-top:7px;padding-top:10px;border-top:2px solid #13251e;color:#111;font-size:16px;font-weight:800}.payment{margin-top:18px;padding:12px;border-radius:10px;background:#f3f7f5;display:grid;grid-template-columns:1fr 1fr;gap:10px}.note{margin-top:14px;padding:10px 12px;border-left:3px solid #65e6b4;background:#f7faf8;color:#586861;font-size:10px}.foot{text-align:center;padding:17px 24px 22px;border-top:1px dashed #cbd5d0}.foot b{font-size:12px}.foot p{margin:6px 0 0;color:#74827c;font-size:9px}.cashier{margin-top:10px;color:#a0aaa5;font-size:8px}.no-print{margin:14px auto 0;display:block;border:0;border-radius:9px;background:#65e6b4;padding:10px 18px;font-weight:800;cursor:pointer}@media print{body{padding:0;background:#fff}.receipt{max-width:none;border:0;border-radius:0;box-shadow:none}.no-print{display:none}} </style></head><body><div class="receipt"><header class="head"><div class="brand"><div class="mark">A</div><div><h1>${business}</h1><small>${location}</small></div></div><div class="head-row"><div><span>Invoice number</span><b>${esc(sale.id)}</b></div><div class="paid">${sale.payment==='Credit'?'CREDIT':'PAID'}</div></div></header><main class="body"><section class="customer"><div><span class="label">Billed to</span><span class="value">${esc(sale.customer||'Walk-in customer')}</span>${sale.phone?`<small>${esc(sale.phone)}</small>`:''}</div><div><span class="label">Date & time</span><span class="value">${formatTime(sale.createdAt)}</span>${sale.email?`<small>${esc(sale.email)}</small>`:''}</div></section><table class="items"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${toList(sale.items).map(i=>`<tr><td>${esc(i.name)}<small>${esc(i.sku||'')}</small></td><td>${i.qty}</td><td>${money(i.price)}</td><td><b>${money(i.qty*i.price)}</b></td></tr>`).join('')}</tbody></table><section class="summary"><div><span>Subtotal</span><b>${money(sale.subtotal)}</b></div>${sale.discount?`<div><span>Discount</span><b>−${money(sale.discount)}</b></div>`:''}${sale.tax?`<div><span>Tax</span><b>${money(sale.tax)}</b></div>`:''}<div class="grand"><span>Total</span><b>${money(sale.total)}</b></div></section><section class="payment"><div><span class="label">Payment method</span><span class="value">${esc(sale.payment)}</span></div><div><span class="label">${sale.payment==='Cash'?'Change returned':sale.payment==='Credit'?'Balance due':'Amount settled'}</span><span class="value">${money(sale.payment==='Cash'?(sale.change||0):sale.total)}</span></div></section>${sale.note?`<div class="note"><b>Note:</b> ${esc(sale.note)}</div>`:''}</main><footer class="foot"><b>Thank you for choosing ${business}</b><p>Please keep this receipt for your records.</p><div class="cashier">Served by ${esc(sale.user||'Admin')} · ${esc(sale.id)}</div></footer></div><button class="no-print" onclick="window.print()">Print receipt</button><script>window.onload=()=>{window.print()}<\/script></body></html>`;
}
function printReceipt(sale,targetWindow){const w=targetWindow||window.open('','_blank','width=440,height=760');if(!w){toast('Allow pop-ups to print the receipt.','error');return}w.document.open();w.document.write(receiptHtml(sale));w.document.close();}
function openInvoiceDetail(sale){
  $('#view-invoice-detail').dataset.saleId=sale.id;
  const returned=Number(sale.refundedTotal||0),returnable=toList(sale.items).some(item=>Number(item.returnedQty||0)<Number(item.qty||0));
  $('#invoiceDetailBody').innerHTML=`<section class="invoice-detail-hero"><div><span class="eyebrow">${esc(returned>=Number(sale.total||0)?'REFUNDED':returned>0?'PARTIALLY REFUNDED':sale.payment==='Credit'?'CREDIT INVOICE':'PAID INVOICE')}</span><h3>${esc(sale.id)}</h3><p>${formatTime(sale.createdAt)} · ${toList(sale.items).reduce((n,item)=>n+Number(item.qty||0),0)} units</p></div><div class="invoice-amount"><small>Net invoice value</small><strong>${money(Number(sale.total||0)-returned)}</strong>${returned?`<small>${money(returned)} refunded</small>`:''}</div></section><section class="invoice-detail-grid"><div class="invoice-detail-card"><span>Customer</span><b>${esc(sale.customer||'Walk-in customer')}</b><small>${esc([sale.phone,sale.email].filter(Boolean).join(' · ')||'No contact details')}</small></div><div class="invoice-detail-card"><span>Payment</span><b>${esc(sale.payment)}</b><small>${sale.payment==='Cash'?`${money(sale.received||sale.total)} received · ${money(sale.change||0)} change`:sale.payment==='Credit'?'Tracked on customer credit account':'Payment recorded in full'}</small></div></section><section class="invoice-line-items">${toList(sale.items).map((item,index)=>{const returnedQty=Number(item.returnedQty||0),remaining=Math.max(0,Number(item.qty||0)-returnedQty);return `<div class="invoice-line return-line"><div><b>${esc(item.name)}</b><small>${esc(item.sku||'')}${returnedQty?` · ${returnedQty} returned`:''}</small></div><span>${item.qty} × ${money(item.price)}</span><span><b>${money(item.qty*item.price)}</b></span><label>Return<input type="number" min="0" max="${remaining}" value="0" data-return-line="${index}" ${remaining===0?'disabled':''}></label></div>`}).join('')}</section><section class="invoice-detail-totals"><div><span>Subtotal</span><b>${money(sale.subtotal)}</b></div><div><span>Discount</span><b>−${money(sale.discount||0)}</b></div>${sale.tax?`<div><span>Tax</span><b>${money(sale.tax)}</b></div>`:''}${returned?`<div><span>Refunded</span><b>−${money(returned)}</b></div>`:''}<div class="grand"><span>Net total</span><b>${money(Number(sale.total||0)-returned)}</b></div></section><div id="invoiceReturnError" class="form-error"></div>${sale.note?`<div class="invoice-note-card"><b>Invoice note:</b> ${esc(sale.note)}</div>`:''}`;
  $('#invoiceDetailReturn').disabled=!returnable;
  go('invoice-detail');
}
function customerStats(c){
  const invoices=customerInvoices(c.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  return {invoices,total:invoices.reduce((sum,s)=>sum+Number(s.total||0)-Number(s.refundedTotal||0),0),balance:customerBalance(c),last:invoices[0]||null};
}
function renderCustomers(){
  const search=($('#customerSearch')?.value||'').trim().toLowerCase(),filter=$('#customerBalanceFilter')?.value||'all';
  const rows=state.customers.filter(c=>{
    const balance=customerBalance(c),matches=[c.name,c.code,c.phone,c.email,c.taxId,...toList(c.tags)].join(' ').toLowerCase().includes(search);
    return matches&&(filter==='all'||(filter==='credit'&&balance>0)||(filter==='clear'&&balance<=0));
  }).sort((a,b)=>String(a.name).localeCompare(String(b.name)));
  const totalCredit=state.customers.reduce((sum,c)=>sum+customerBalance(c),0),active=state.customers.filter(c=>c.status!=='inactive').length,lifetime=state.sales.filter(s=>s.customerId).reduce((sum,s)=>sum+Number(s.total||0)-Number(s.refundedTotal||0),0);
  $('#customerMetrics').innerHTML=`<div><span>Total customers</span><strong>${state.customers.length}</strong><small>${active} active accounts</small></div><div><span>Receivables</span><strong>${money(totalCredit)}</strong><small>Outstanding customer credit</small></div><div><span>Lifetime purchases</span><strong>${money(lifetime)}</strong><small>Linked invoice revenue</small></div>`;
  $('#customerCount').textContent=`${rows.length} customer${rows.length===1?'':'s'}`;
  $('#customerTable').innerHTML=rows.map(c=>{const stats=customerStats(c);return `<tr><td><div class="product-cell"><span>${initials(c.name)}</span><div><strong>${esc(c.name)}</strong><small>${esc(c.code||'No code')} · ${esc(c.status||'active')}</small></div></div></td><td>${esc(c.phone||'—')}<br><small>${esc(c.email||'')}</small></td><td>${stats.invoices.length}</td><td><strong>${money(stats.total)}</strong></td><td><span class="status-pill ${stats.balance>0?'warning':'healthy'}">${money(stats.balance)}</span></td><td>${stats.last?formatDate(stats.last.createdAt):'—'}</td><td><div class="invoice-actions"><button class="receipt-btn view" data-customer-view="${c.id}">View</button><button class="receipt-btn" data-customer-edit="${c.id}">Edit</button></div></td></tr>`}).join('')||'<tr><td colspan="7">No customers match these filters.</td></tr>';
}
function exportCustomerStatement(c){
  const rows=[['Date','Type','Reference','Debit','Credit','Balance']],entries=[];let balance=Number(c.openingBalance||0);
  if(balance)entries.push({date:c.createdAt||new Date().toISOString(),type:'Opening balance',reference:c.code||c.id,debit:balance,credit:0});
  customerInvoices(c.id).forEach(s=>entries.push({date:s.createdAt,type:'Invoice',reference:s.id,debit:Number(s.total||0)-Number(s.refundedTotal||0),credit:0}));
  customerPayments(c).forEach(p=>entries.push({date:p.createdAt,type:'Payment',reference:p.note||p.id,credit:Number(p.amount||0),debit:0}));
  entries.sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(x=>{balance+=x.type==='Opening balance'?0:x.debit-x.credit;rows.push([formatDate(x.date),x.type,x.reference,x.debit||'',x.credit||'',balance]);});
  const csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n'),link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download=`AMCY-${(c.code||c.name).replace(/[^a-z0-9]+/gi,'-')}-Statement.csv`;link.click();URL.revokeObjectURL(link.href);
}
function openCustomerEditor(c=null){
  $('#customerForm').reset();clearFormErrors($('#customerForm'));$('#customerId').value=c?.id||'';$('#customerEditorTitle').textContent=c?'Edit customer':'Add customer';
  if(c){$('#customerName').value=c.name||'';$('#customerCode').value=c.code||'';$('#customerStatus').value=c.status||'active';$('#customerPhone').value=c.phone||'';$('#customerEmail').value=c.email||'';$('#customerAddress').value=c.address||'';$('#customerTaxId').value=c.taxId||'';$('#customerCreditLimit').value=Number(c.creditLimit||0)||'';$('#customerOpeningBalance').value=Number(c.openingBalance||0)||'';$('#customerTags').value=toList(c.tags).join(', ');$('#customerNotes').value=c.notes||'';}
  refreshCustomSelects();go('customer-editor');
}
function openCustomerDetail(c){
  const stats=customerStats(c),payments=[...customerPayments(c)].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));$('#view-customer-detail').dataset.customerId=c.id;$('#customerDetailTitle').textContent=c.name;$('#customerDetailSubtitle').textContent=`${c.code||'Customer account'} · ${c.status||'active'}`;
  $('#customerDetailContent').innerHTML=`<div class="customer-detail-actions"><button class="ghost-btn" data-detail-edit="${c.id}">Edit profile</button><button class="ghost-btn" data-customer-statement="${c.id}">Export statement</button></div><div class="customer-account-grid"><article class="panel account-summary"><span class="eyebrow">ACCOUNT POSITION</span><strong class="account-balance">${money(stats.balance)}</strong><p>Outstanding balance</p><div><span>Credit limit<b>${money(c.creditLimit||0)}</b></span><span>Lifetime purchases<b>${money(stats.total)}</b></span><span>Invoices<b>${stats.invoices.length}</b></span></div></article><article class="panel account-contact"><span class="eyebrow">CONTACT & BUSINESS</span><dl><div><dt>Phone</dt><dd>${esc(c.phone||'—')}</dd></div><div><dt>Email</dt><dd>${esc(c.email||'—')}</dd></div><div><dt>Address</dt><dd>${esc(c.address||'—')}</dd></div><div><dt>Tax ID</dt><dd>${esc(c.taxId||'—')}</dd></div></dl></article></div><div class="customer-ledger-grid"><article class="panel"><div class="panel-head"><div><span class="eyebrow">PAYMENTS</span><h3>Record credit payment</h3></div></div><form id="customerPaymentForm" class="payment-entry" novalidate><input id="customerPaymentAmount" type="number" min="0.01" step="0.01" placeholder="Amount"><input id="customerPaymentNote" placeholder="Reference or note (optional)"><button class="primary-btn" type="submit">Record payment</button><small id="customerPaymentError" class="field-error"></small></form><div class="mini-ledger">${payments.map(p=>`<div><span>${formatDate(p.createdAt)}<small>${esc(p.note||'Customer payment')}</small></span><b>+ ${money(p.amount)}</b></div>`).join('')||'<p>No payments recorded.</p>'}</div></article><article class="panel"><div class="panel-head"><div><span class="eyebrow">INVOICE HISTORY</span><h3>${stats.invoices.length} invoices</h3></div></div><div class="mini-ledger">${stats.invoices.map(s=>`<div><span>${esc(s.id)}<small>${formatDate(s.createdAt)} · ${esc(s.payment)}</small></span><b>${money(s.total)}</b><button class="receipt-btn" data-customer-invoice="${s.id}">View</button></div>`).join('')||'<p>No linked invoices yet.</p>'}</div></article></div>${c.notes?`<article class="panel customer-notes"><span class="eyebrow">NOTES</span><p>${esc(c.notes)}</p></article>`:''}`;
  go('customer-detail');
}
let poFilter='all';
function renderPurchases(){
  const orders=[...state.purchases].filter(p=>poFilter==='all'||p.status===poFilter).sort((a,b)=>b.id.localeCompare(a.id));
  $('#purchaseCards').innerHTML=orders.map(po=>{const total=Number(po.qty||0)*Number(po.cost||0),received=Math.min(Number(po.receivedQty||0),Number(po.qty||0)),remaining=Math.max(0,Number(po.qty||0)-received),paid=Math.min(Number(po.paid||0),total),outstanding=Math.max(0,total-paid);return `<article class="po-card"><div class="po-top"><div><span class="eyebrow">${esc(po.id)}</span><h3>${esc(supplier(po.supplierId)?.name||'Unknown supplier')}</h3><p>Expected ${formatDate(po.expected)}${po.supplierInvoice?` · Invoice ${esc(po.supplierInvoice)}`:''}</p></div><span class="status-pill ${po.status}">${esc(po.status==='partial'?'Part received':po.status[0].toUpperCase()+po.status.slice(1))}</span></div><div class="po-details"><span>Product<b>${esc(product(po.productId)?.name||'Deleted')}</b></span><span>Ordered / received<b>${po.qty} / ${received} units</b></span><span>Total<b>${money(total)}</b></span><span>Outstanding<b>${money(outstanding)}</b></span></div><div class="po-progress"><i style="width:${Math.min(100,received/Math.max(1,Number(po.qty))*100)}%"></i></div><div class="po-operations">${po.status==='draft'?`<button class="small-btn" data-mark-ordered="${po.id}">Mark ordered</button>`:remaining?`<label>Receive now<input type="number" min="1" max="${remaining}" value="${remaining}" data-receive-qty="${po.id}"></label><button class="small-btn" data-receive-po="${po.id}">Receive stock</button>`:'<small>All stock received</small>'}${outstanding?`<label>Pay supplier<input type="number" min="0.01" max="${outstanding}" step="0.01" placeholder="${outstanding}" data-pay-amount="${po.id}"></label><button class="small-btn" data-pay-po="${po.id}">Record payment</button>`:'<small>Paid in full</small>'}</div></article>`}).join('')||'<div class="empty-state"><h3>No purchase orders</h3><p>Create an order to begin.</p></div>';
}
function renderSuppliers(){
  $('#supplierGrid').innerHTML=state.suppliers.map(s=>{const supplied=state.products.filter(p=>p.supplierId===s.id).length;return `<article class="supplier-card"><div class="supplier-top"><div class="supplier-avatar">${initials(s.name)}</div><span class="status-pill healthy">Active</span></div><h3>${esc(s.name)}</h3><p>${esc(s.contact)} · ${esc(s.phone)}</p><dl><div><dt>PRODUCTS</dt><dd>${supplied} supplied</dd></div><div><dt>LEAD TIME</dt><dd>${s.lead} days</dd></div><div><dt>TERMS</dt><dd>${esc(s.terms)}</dd></div><div><dt>EMAIL</dt><dd>${esc(s.email||'—')}</dd></div></dl></article>`}).join('')||'<div class="empty-state"><h3>No suppliers yet</h3></div>';
}
function reportWindow(){const from=$('#reportFrom')?.value?new Date(`${$('#reportFrom').value}T00:00:00`):new Date(0),to=$('#reportTo')?.value?new Date(`${$('#reportTo').value}T23:59:59`):new Date(8640000000000000);return{from,to};}
function renderReports(){
  const range=reportWindow(),sales=state.sales.filter(s=>{const d=new Date(s.createdAt);return d>=range.from&&d<=range.to;}),expenses=state.expenses.filter(e=>{const d=new Date(e.date||e.createdAt);return d>=range.from&&d<=range.to;}),revenue=sales.reduce((sum,s)=>sum+Number(s.total||0)-Number(s.refundedTotal||0),0),cogs=sales.reduce((sum,s)=>sum+toList(s.items).reduce((n,i)=>n+Number(i.cost||product(i.productId)?.cost||0)*Number(i.qty||0),0),0),expenseTotal=expenses.reduce((sum,e)=>sum+Number(e.amount||0),0);
  $('#financeMetrics').innerHTML=`<div><span>Revenue</span><strong>${money(revenue)}</strong><small>${sales.length} invoices</small></div><div><span>Gross profit</span><strong>${money(revenue-cogs)}</strong><small>Revenue less product cost</small></div><div><span>Expenses</span><strong>${money(expenseTotal)}</strong><small>${expenses.length} entries</small></div><div><span>Net profit</span><strong>${money(revenue-cogs-expenseTotal)}</strong><small>Selected reporting period</small></div>`;
  $('#expenseList').innerHTML=[...expenses].sort((a,b)=>new Date(b.date||b.createdAt)-new Date(a.date||a.createdAt)).map(e=>`<div><span><b>${esc(e.name)}</b><small>${esc(e.category)} · ${formatDate(e.date||e.createdAt)}</small></span><strong>${money(e.amount)}</strong><button class="receipt-btn" data-delete-expense="${e.id}">Delete</button></div>`).join('')||'<p class="quiet-state">No expenses in this period.</p>';
  const cats={};state.products.forEach(p=>cats[p.category]=(cats[p.category]||0)+p.stock*p.cost);const max=Math.max(1,...Object.values(cats));$('#categoryBars').innerHTML=Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,v])=>`<div class="category-bar"><div><span>${esc(c)}</span><b>${money(v)}</b></div><div><i style="width:${v/max*100}%"></i></div></div>`).join('');
  const healthy=state.products.filter(p=>availableStock(p)>p.reorder).length,low=state.products.filter(p=>availableStock(p)>0&&availableStock(p)<=p.reorder).length,out=state.products.filter(p=>availableStock(p)===0).length,total=Math.max(1,state.products.length),pct=Math.round(healthy/total*100);$('#healthPct').textContent=`${pct}%`;$('#healthDonut').style.background='#0b1713';$('#healthLegend').innerHTML=`<div><i style="background:var(--green)"></i><span>Healthy</span><b>${healthy}</b></div><div><i style="background:var(--amber)"></i><span>Low stock</span><b>${low}</b></div><div><i style="background:var(--red)"></i><span>Out of stock</span><b>${out}</b></div>`;
  const recs=state.products.filter(p=>availableStock(p)<=p.reorder).sort((a,b)=>availableStock(a)-availableStock(b));$('#reorderRecommendations').innerHTML=recs.map(p=>{const available=availableStock(p),qty=Math.max(p.reorder*2-available,p.reorder);return `<div class="recommendation"><div><strong>${esc(p.name)}</strong><small>${esc(p.sku)} · ${available} available</small></div><span>Order <b>${qty}</b> units</span><strong class="rec-cost">${money(qty*p.cost)}</strong></div>`}).join('')||'<p>Nothing to reorder right now.</p>';
}
function renderAudit(){
  $('#auditTimeline').innerHTML=[...state.audit].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(a=>`<div class="audit-item"><span>✓</span><div><b>${esc(a.action)}</b><p>${esc(a.detail)}</p></div><time>${formatTime(a.createdAt)}<br>${esc(a.user)}</time></div>`).join('')||'<div class="empty-state"><p>No audit events yet.</p></div>';
}
const dangerActions={
  invoices:{title:'Clear all invoices',phrase:'DELETE ALL INVOICES',description:'Deletes every sale from the main database and every archived record from the separate invoice vault.'},
  purchases:{title:'Clear all purchase orders',phrase:'DELETE ALL PURCHASES',description:'Deletes draft, ordered, and received purchase-order records. Existing stock quantities are not reversed.'},
  movements:{title:'Clear stock movement history',phrase:'DELETE MOVEMENT HISTORY',description:'Deletes the full stock ledger. Current product quantities remain unchanged.'},
  products:{title:'Clear all products',phrase:'DELETE ALL PRODUCTS',description:'Deletes every active product and clears the current checkout cart. Historical invoices remain unchanged.'},
  suppliers:{title:'Clear all suppliers',phrase:'DELETE ALL SUPPLIERS',description:'Deletes the supplier directory. Existing purchase records retain their stored identifiers.'},
  customers:{title:'Clear all customers',phrase:'DELETE ALL CUSTOMERS',description:'Deletes every customer profile and its payment history. Existing invoices keep their customer names.'},
  expenses:{title:'Clear all expenses',phrase:'DELETE ALL EXPENSES',description:'Deletes the full operating expense ledger. Sales and inventory remain unchanged.'},
  audit:{title:'Clear audit history',phrase:'DELETE AUDIT HISTORY',description:'Deletes the complete administrative event history.'},
  workspace:{title:'Clear operational database',phrase:'RESET AMCY DATABASE',description:'Deletes products, suppliers, movements, purchase orders, invoices, audit history, and the separate invoice vault. Business profile settings remain.'}
};
let dangerScope='',dangerTimer=null,dangerSeconds=10,dangerReady=false;
function renderSecurityDZ(){
  const counts={Products:state.products.length,Suppliers:state.suppliers.length,Customers:state.customers.length,Movements:state.movements.length,Purchases:state.purchases.length,Invoices:state.sales.length,Expenses:state.expenses.length,Audit:state.audit.length};
  $('#securityDataCounts').innerHTML=Object.entries(counts).map(([label,value])=>`<div><span>${label}</span><strong>${value.toLocaleString('en-PK')}</strong></div>`).join('');
  Object.entries(counts).forEach(([name,value])=>{const el=$(`#dangerCount${name}`);if(el)el.textContent=`${value.toLocaleString('en-PK')} ${value===1?'record':'records'}`;});
}
function cancelDangerFlow(silent=false){
  if(dangerTimer){clearInterval(dangerTimer);dangerTimer=null;}
  dangerScope='';dangerSeconds=10;dangerReady=false;
  $('#dangerConfirmation').classList.add('hidden');$('#dangerTimerBox').classList.add('hidden');$('#dangerFinalApproval').classList.add('hidden');
  $('#dangerPhraseInput').value='';$('#dangerPhraseInput').disabled=false;$('#dangerPhraseError').textContent='';$('#dangerApprovalCheck').checked=false;$('#startDangerTimer').disabled=true;$('#executeDangerDelete').disabled=true;$('#dangerDeleteError').textContent='';
  if(!silent)$('#dangerActionGrid').scrollIntoView({behavior:'smooth',block:'start'});
}
function selectDangerAction(scope){
  const action=dangerActions[scope];if(!action)return;cancelDangerFlow(true);dangerScope=scope;
  $('#dangerActionTitle').textContent=action.title;$('#dangerActionDescription').textContent=action.description;$('#dangerRequiredPhrase').textContent=action.phrase;$('#dangerConfirmation').classList.remove('hidden');$('#dangerPhraseInput').focus();$('#dangerConfirmation').scrollIntoView({behavior:'smooth',block:'start'});
}
async function clearInvoiceVault(){
  if(!invoiceFirebase||!invoiceUser)throw new Error('The invoice vault is not authenticated. Sign in again before clearing invoices.');
  await invoiceFirebase.remove(invoiceFirebase.ref(invoiceFirebase.db,`invoiceVault/${invoiceUser.uid}`));invoiceCloudOnline=true;
}
async function executeDangerAction(scope){
  if(currentUser?.uid!==ADMIN_UID)throw new Error('Administrator authentication is required.');
  if(scope==='invoices'||scope==='workspace')await clearInvoiceVault();
  const root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`),action=dangerActions[scope],deletedAt=new Date().toISOString();
  const result=await firebase.runTransaction(root,current=>{
    const live=normalizeState(current);
    if(scope==='workspace'){const profile={...live.profile};return{...blankState(),profile};}
    if(scope==='invoices')live.sales=[];
    if(scope==='purchases')live.purchases=[];
    if(scope==='movements')live.movements=[];
    if(scope==='products')live.products=[];
    if(scope==='suppliers')live.suppliers=[];
    if(scope==='customers')live.customers=[];
    if(scope==='expenses')live.expenses=[];
    if(scope==='audit')live.audit=[];
    if(scope!=='audit')live.audit.unshift({id:uid('a'),action:'Security DZ deletion',detail:action.title,createdAt:deletedAt,user:live.profile.adminName||'Admin User'});
    return live;
  },{applyLocally:false});
  if(!result.committed)throw new Error('The database did not accept the deletion.');
  state=normalizeState(result.snapshot.val());if(scope==='products'||scope==='workspace')cart=[];renderAll();
}
function populateSelects(){
  const prod='<option value="">Select a product</option>'+state.products.map(p=>`<option value="${p.id}">${esc(p.name)} — ${p.stock} in stock</option>`).join('');$('#movementProduct').innerHTML=prod;$('#purchaseProduct').innerHTML=prod;
  const supp='<option value="">Select a supplier</option>'+state.suppliers.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('');$('#productSupplier').innerHTML=supp;$('#purchaseSupplier').innerHTML=supp;
  const selectedCustomer=$('#saleCustomerId')?.value||'';$('#saleCustomerId').innerHTML='<option value="">Walk-in customer</option>'+state.customers.filter(c=>c.status!=='inactive').map(c=>`<option value="${c.id}">${esc(c.name)}${customerBalance(c)>0?` — owes ${money(customerBalance(c))}`:''}</option>`).join('');$('#saleCustomerId').value=state.customers.some(c=>c.id===selectedCustomer)?selectedCustomer:'';
}
function renderProfile(){
  $('#businessName').value=state.profile.businessName||'AMCY Trader';$('#currencySetting').value=state.profile.currency||'PKR';$('#locationSetting').value=state.profile.location||'';$('#nameSetting').value=state.profile.adminName||'Admin User';$('#invoicePrefixSetting').value=state.profile.invoicePrefix||'INV';$('#nextInvoiceSetting').value=Number(state.profile.nextInvoiceNumber)||1001;$('#taxRateSetting').value=Number(state.profile.taxRate)||0;$('#warehouseSetting').value=state.profile.defaultWarehouse||'Main Warehouse';$('#adminName').textContent=state.profile.adminName||'Admin User';
}

['inventorySearch','categoryFilter','stockFilter'].forEach(id=>$('#'+id).addEventListener(id.includes('Search')?'input':'change',renderInventory));
['movementSearch','movementTypeFilter'].forEach(id=>$('#'+id).addEventListener(id.includes('Search')?'input':'change',renderMovements));
$('#posSearch').addEventListener('input',renderPOS);
$('#salesSearch').addEventListener('input',renderSales);
$('#salesPaymentFilter').addEventListener('change',renderSales);
$('#customerSearch').addEventListener('input',renderCustomers);
$('#customerBalanceFilter').addEventListener('change',renderCustomers);
$('#applyReportRange').addEventListener('click',renderReports);
$('#expenseForm').addEventListener('submit',async event=>{event.preventDefault();const name=$('#expenseName').value.trim(),amount=Number($('#expenseAmount').value);if(!name){toast('Enter an expense description.','error');$('#expenseName').focus();return;}if(!Number.isFinite(amount)||amount<=0){toast('Enter an expense amount greater than zero.','error');$('#expenseAmount').focus();return;}const button=event.submitter;setButtonBusy(button,true,'Saving');try{state.expenses.unshift({id:uid('exp'),name,amount,date:$('#expenseDate').value||new Date().toISOString().slice(0,10),category:$('#expenseCategory').value,createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Expense recorded',`${name} — ${money(amount)}`);event.currentTarget.reset();$('#expenseDate').value=new Date().toISOString().slice(0,10);renderAll();toast('Expense recorded');}catch(error){console.error(error);toast('Expense could not be saved.','error');}finally{setButtonBusy(button,false);}});
$('#expenseList').addEventListener('click',async event=>{const button=event.target.closest('[data-delete-expense]');if(!button)return;const expense=state.expenses.find(e=>e.id===button.dataset.deleteExpense);if(!expense)return;setButtonBusy(button,true,'Deleting');try{state.expenses=state.expenses.filter(e=>e.id!==expense.id);await addAudit('Expense deleted',`${expense.name} — ${money(expense.amount)}`);renderAll();toast('Expense deleted');}catch(error){console.error(error);toast('Expense could not be deleted.','error');}finally{setButtonBusy(button,false);}});
$('#exportFinanceReport').addEventListener('click',()=>{const range=reportWindow(),rows=[['Date','Type','Reference','Category or method','Amount']],sales=state.sales.filter(s=>{const d=new Date(s.createdAt);return d>=range.from&&d<=range.to;}),expenses=state.expenses.filter(e=>{const d=new Date(e.date||e.createdAt);return d>=range.from&&d<=range.to;});sales.forEach(s=>rows.push([s.createdAt,'Sale',s.id,s.payment,Number(s.total||0)-Number(s.refundedTotal||0)]));expenses.forEach(e=>rows.push([e.date||e.createdAt,'Expense',e.name,e.category,-Number(e.amount||0)]));const csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n'),link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download=`AMCY-Finance-${new Date().toISOString().slice(0,10)}.csv`;link.click();URL.revokeObjectURL(link.href);toast('Finance report exported');});
$('#saleDiscount').addEventListener('input',renderCart);
$('#saleReceived').addEventListener('input',renderCart);
$('#salePayment').addEventListener('change',()=>{
  const cash=$('#salePayment').value==='Cash';
  $('#amountReceivedLabel').classList.toggle('hidden',!cash);
  if(!cash)$('#saleReceived').value='';
  renderCart();
});
$('#saleCustomerId').addEventListener('change',event=>{const c=customer(event.target.value);if(c){$('#saleCustomer').value=c.name||'';$('#salePhone').value=c.phone||'';$('#saleEmail').value=c.email||'';}else{$('#saleCustomer').value='';$('#salePhone').value='';$('#saleEmail').value='';}});
$('#posProducts').addEventListener('click',e=>{const b=e.target.closest('[data-pos-product]');if(!b)return;const p=product(b.dataset.posProduct);if(!p||availableStock(p)<=0)return;const item=cart.find(i=>i.productId===p.id);if(item){if(item.qty>=availableStock(p)){toast('No more units are available.','error');return}item.qty++;}else cart.push({productId:p.id,qty:1});renderCart()});
$('#cartItems').addEventListener('click',e=>{const remove=e.target.closest('[data-cart-remove]'),change=e.target.closest('[data-cart-change]');if(remove)cart=cart.filter(i=>i.productId!==remove.dataset.cartRemove);if(change){const item=cart.find(i=>i.productId===change.dataset.cartId),p=product(change.dataset.cartId),next=item.qty+Number(change.dataset.cartChange);if(next<=0)cart=cart.filter(i=>i.productId!==item.productId);else if(next<=availableStock(p))item.qty=next;}renderCart()});
$('#clearCart').addEventListener('click',()=>{cart=[];$('#saleCustomerId').value='';$('#saleCustomerId').dispatchEvent(new Event('change',{bubbles:true}));$('#saleCustomerId')._refreshCustom?.();$('#saleDiscount').value=0;$('#saleReceived').value='';$('#saleNote').value='';$('#salePayment').value='Cash';$('#amountReceivedLabel').classList.remove('hidden');$('#saleError').textContent='';renderCart()});
$('#completeSale').addEventListener('click',async()=>{
  $('#saleError').textContent='';if(!cart.length)return;const printWindow=window.open('','_blank','width=440,height=760');if(printWindow)printWindow.document.write('<p style="font-family:Arial;padding:24px">Preparing receipt…</p>');
  const totals=cartTotals(),payment=$('#salePayment').value,received=payment==='Cash'?Number($('#saleReceived').value||totals.total):totals.total;
  if(payment==='Cash'&&received<totals.total){if(printWindow)printWindow.close();$('#saleError').textContent=`Amount received is ${money(totals.total-received)} short.`;return;}
  const selectedCustomer=customer($('#saleCustomerId').value),invoiceNo=Math.max(1,Number(state.profile.nextInvoiceNumber)||1001),sale={id:`${state.profile.invoicePrefix||'INV'}-${String(invoiceNo).padStart(6,'0')}`,customerId:selectedCustomer?.id||'',customer:$('#saleCustomer').value.trim()||'Walk-in customer',phone:$('#salePhone').value.trim(),email:$('#saleEmail').value.trim(),payment,received,change:payment==='Cash'?Math.max(0,received-totals.total):0,note:$('#saleNote').value.trim(),items:cart.map(item=>{const p=product(item.productId);return{productId:p.id,name:p.name,sku:p.sku,price:p.price,cost:p.cost||0,qty:item.qty}}),subtotal:totals.subtotal,discount:totals.discount,tax:totals.tax,total:totals.total,createdAt:new Date().toISOString(),user:state.profile.adminName||'Admin User',invoiceArchiveStatus:'pending'};
  if(payment==='Credit'&&!selectedCustomer){if(printWindow)printWindow.close();$('#saleError').textContent='Select a saved customer before creating a credit invoice.';return;}
  if(payment==='Credit'&&Number(selectedCustomer.creditLimit||0)>0&&customerBalance(selectedCustomer)+totals.total>Number(selectedCustomer.creditLimit)){if(printWindow)printWindow.close();$('#saleError').textContent=`This sale exceeds ${selectedCustomer.name}'s ${money(selectedCustomer.creditLimit)} credit limit.`;return;}
  const button=$('#completeSale');setButtonBusy(button,true,'Completing sale');
  try{
    const root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`);const result=await firebase.runTransaction(root,current=>{const live=normalizeState(current);if(live.sales.some(s=>s.id===sale.id))throw new Error('Invoice number is already in use. Reload and try again.');for(const item of sale.items){const p=live.products.find(x=>x.id===item.productId);if(!p||availableStock(p)<item.qty)throw new Error(`${item.name} no longer has enough available stock`);}for(const item of sale.items){const p=live.products.find(x=>x.id===item.productId),before=p.stock;p.stock-=item.qty;live.movements.unshift({id:uid('m'),productId:p.id,type:'out',qty:item.qty,before,after:p.stock,reference:sale.id,note:`Customer sale — ${sale.customer}`,createdAt:sale.createdAt,user:sale.user});}live.sales.unshift(sale);live.profile.nextInvoiceNumber=invoiceNo+1;live.audit.unshift({id:uid('a'),action:'Sale completed',detail:`${sale.id} for ${sale.customer} — ${money(sale.total)}`,createdAt:sale.createdAt,user:sale.user});return live;},{applyLocally:false});
    if(!result.committed)throw new Error('Sale could not be committed');
    try{const archivedAt=await archiveInvoice(sale);sale.invoiceArchiveStatus='synced';sale.invoiceArchivedAt=archivedAt;await markInvoiceArchive(sale.id,'synced',archivedAt);}
    catch(archiveError){console.error(archiveError);invoiceCloudOnline=false;toast('Sale saved. Invoice vault sync is pending—use Sync from invoice history.','error');}
    cart=[];$('#saleCustomerId').value='';$('#saleCustomerId').dispatchEvent(new Event('change',{bubbles:true}));$('#saleCustomerId')._refreshCustom?.();$('#saleDiscount').value=0;$('#saleReceived').value='';$('#saleNote').value='';$('#salePayment').value='Cash';$('#amountReceivedLabel').classList.remove('hidden');renderCart();toast(`${sale.id} completed`);printReceipt(sale,printWindow);
  }catch(error){console.error(error);if(printWindow)printWindow.close();$('#saleError').textContent=error.message||'Sale could not be completed. Please retry.';}
  finally{setButtonBusy(button,false);button.disabled=!cart.length||!cloudOnline;}
});
$('#salesTable').addEventListener('click',async e=>{const print=e.target.closest('[data-print-sale]'),view=e.target.closest('[data-view-sale]'),sync=e.target.closest('[data-sync-sale]'),id=print?.dataset.printSale||view?.dataset.viewSale||sync?.dataset.syncSale;if(!id)return;const sale=state.sales.find(s=>s.id===id);if(!sale)return;if(print)printReceipt(sale);if(view)openInvoiceDetail(sale);if(sync){setButtonBusy(sync,true,'Syncing');try{const archivedAt=await archiveInvoice(sale);await markInvoiceArchive(sale.id,'synced',archivedAt);toast(`${sale.id} synced to invoice vault`);}catch(error){console.error(error);toast('Invoice vault unavailable. Confirm the same admin login exists in the invoice project.','error');}finally{setButtonBusy(sync,false);}}});
$('#invoiceDetailPrint').addEventListener('click',()=>{const sale=state.sales.find(item=>item.id===$('#view-invoice-detail').dataset.saleId);if(sale)printReceipt(sale)});
$('#invoiceDetailShare').addEventListener('click',async()=>{const sale=state.sales.find(item=>item.id===$('#view-invoice-detail').dataset.saleId);if(!sale)return;const text=`${state.profile.businessName||'AMCY Trader'} invoice ${sale.id}\nCustomer: ${sale.customer||'Walk-in customer'}\nTotal: ${money(sale.total)}\nDate: ${formatTime(sale.createdAt)}`;try{if(navigator.share)await navigator.share({title:`Invoice ${sale.id}`,text});else{await navigator.clipboard.writeText(text);toast('Invoice summary copied');}}catch(error){if(error?.name!=='AbortError')toast('Invoice could not be shared.','error');}});
$('#invoiceDetailReturn').addEventListener('click',async event=>{
  const invoiceId=$('#view-invoice-detail').dataset.saleId,sale=state.sales.find(item=>item.id===invoiceId),selections=$$('[data-return-line]',$('#invoiceDetailBody')).map(input=>({index:Number(input.dataset.returnLine),qty:Number(input.value||0)})).filter(item=>item.qty>0),error=$('#invoiceReturnError');if(error)error.textContent='';if(!sale||!selections.length){if(error)error.textContent='Enter a return quantity for at least one item.';return;}
  for(const selection of selections){const item=sale.items[selection.index],remaining=Number(item.qty||0)-Number(item.returnedQty||0);if(!Number.isInteger(selection.qty)||selection.qty<1||selection.qty>remaining){error.textContent=`Return quantity for ${item.name} must be between 1 and ${remaining}.`;return;}}
  const gross=selections.reduce((sum,x)=>sum+Number(sale.items[x.index].price||0)*x.qty,0),ratio=Number(sale.subtotal||0)>0?gross/Number(sale.subtotal):0,refund=Math.min(Number(sale.total||0)-Number(sale.refundedTotal||0),ratio*Number(sale.total||0)),button=event.currentTarget;setButtonBusy(button,true,'Processing return');
  try{const now=new Date().toISOString(),root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`),result=await firebase.runTransaction(root,current=>{const live=normalizeState(current),liveSale=live.sales.find(s=>s.id===invoiceId);if(!liveSale)throw new Error('Invoice no longer exists');const returnLines=[];for(const selection of selections){const line=liveSale.items[selection.index];if(!line)throw new Error('Invoice line no longer exists. Reload and try again.');const remaining=Number(line.qty||0)-Number(line.returnedQty||0);if(selection.qty>remaining)throw new Error('Return quantities changed. Reload and try again.');line.returnedQty=Number(line.returnedQty||0)+selection.qty;const p=live.products.find(x=>x.id===line.productId);if(p){const before=Number(p.stock||0);p.stock=before+selection.qty;live.movements.unshift({id:uid('m'),productId:p.id,type:'in',qty:selection.qty,before,after:p.stock,reference:invoiceId,note:'Customer return',createdAt:now,user:live.profile.adminName});}returnLines.push({productId:line.productId,name:line.name,sku:line.sku,qty:selection.qty,unitPrice:Number(line.price||0)});}liveSale.refundedTotal=Number(liveSale.refundedTotal||0)+refund;liveSale.invoiceArchiveStatus='pending';live.returns.unshift({id:uid('ret'),invoiceId,customerId:liveSale.customerId||'',customer:liveSale.customer,items:returnLines,refundAmount:refund,createdAt:now,user:live.profile.adminName});live.audit.unshift({id:uid('a'),action:'Invoice return processed',detail:`${invoiceId} — ${money(refund)} refunded`,createdAt:now,user:live.profile.adminName});return live;},{applyLocally:false});if(!result.committed)throw new Error('Return could not be committed');const updated=normalizeState(result.snapshot.val()).sales.find(s=>s.id===invoiceId);try{const archivedAt=await archiveInvoice(updated);await markInvoiceArchive(invoiceId,'synced',archivedAt);}catch(archiveError){console.error(archiveError);toast('Return saved. Invoice vault resync is pending.','error');}openInvoiceDetail(updated);toast(`Return completed — ${money(refund)} refunded`);}catch(saveError){console.error(saveError);if(error)error.textContent=saveError.message||'Return could not be saved.';}finally{setButtonBusy(button,false);}
});
$('#poTabs').addEventListener('click',e=>{const b=e.target.closest('[data-po]');if(!b)return;poFilter=b.dataset.po;$$('#poTabs button').forEach(x=>x.classList.toggle('active',x===b));renderPurchases()});

function openWorkflow(name,trigger){
  if(name==='customer')openCustomerEditor();
  if(name==='product'){
    $('#productForm').reset();clearFormErrors($('#productForm'));$('#productId').value='';$('#productWarehouse').value=state.profile.defaultWarehouse||'Main Warehouse';$('#productModalTitle').textContent='Add product';$('#productDeleteZone').classList.add('hidden');$('#deleteProductConfirm').classList.add('hidden');go('product-editor');
  }
  if(name==='movement'){
    $('#movementForm').reset();clearFormErrors($('#movementForm'));$('#movementError').textContent='';if(trigger?.dataset.type)$(`input[name="movementType"][value="${trigger.dataset.type}"]`).checked=true;updateStockHint();go('movement-editor');
  }
  if(name==='purchase'){
    $('#purchaseForm').reset();clearFormErrors($('#purchaseForm'));$('#purchaseDate').value=new Date(Date.now()+7*86400000).toISOString().slice(0,10);go('purchase-editor');
  }
  if(name==='supplier'){$('#supplierForm').reset();clearFormErrors($('#supplierForm'));go('supplier-editor');}
  refreshCustomSelects();
}
document.addEventListener('click',e=>{const open=e.target.closest('[data-open]'),back=e.target.closest('[data-back]');if(open)openWorkflow(open.dataset.open,open);if(back){clearFormErrors(back.closest('form')||document);go(back.dataset.back);}});
$('#businessNotifications').addEventListener('click',event=>{const button=event.target.closest('[data-view-jump]');if(button)go(button.dataset.viewJump);});
$('#registerControl').addEventListener('click',async event=>{
  const open=event.target.closest('#openRegister'),close=event.target.closest('[data-close-register]');if(!open&&!close)return;
  const button=open||close;setButtonBusy(button,true,open?'Opening':'Closing');
  try{
    if(open){const openingCash=Math.max(0,Number($('#registerOpeningCash').value)||0);state.registers.push({id:`REG-${Date.now().toString().slice(-8)}`,status:'open',openingCash,openedAt:new Date().toISOString(),openedBy:state.profile.adminName});await addAudit('Cash register opened',`Opening cash ${money(openingCash)}`);toast('Cash register opened');}
    else{const register=state.registers.find(r=>r.id===close.dataset.closeRegister),counted=Math.max(0,Number($('#registerCountedCash').value)||0);if(!register)throw new Error('Register was not found');const cashSales=state.sales.filter(s=>s.payment==='Cash'&&new Date(s.createdAt)>=new Date(register.openedAt)).reduce((sum,s)=>sum+Number(s.total||0),0);register.status='closed';register.closedAt=new Date().toISOString();register.countedCash=counted;register.expectedCash=Number(register.openingCash||0)+cashSales;register.variance=counted-register.expectedCash;register.closedBy=state.profile.adminName;await addAudit('Cash register closed',`${register.id} variance ${money(register.variance)}`);toast('Cash register closed');}
    renderAll();
  }catch(error){console.error(error);toast(error.message||'Register could not be updated.','error');}finally{setButtonBusy(button,false);}
});

$('#customerForm').addEventListener('submit',async event=>{
  event.preventDefault();clearFormErrors(event.currentTarget);const name=$('#customerName').value.trim(),email=$('#customerEmail').value.trim();
  if(!name){fieldError('customerName','Enter the customer name.');focusInvalid('customerName');return;}
  if(email&&!/^\S+@\S+\.\S+$/.test(email)){fieldError('customerEmail','Enter a valid email address or leave it empty.');focusInvalid('customerEmail');return;}
  const id=$('#customerId').value||uid('c'),existing=customer(id),code=$('#customerCode').value.trim().toUpperCase()||`CUS-${String(state.customers.length+1).padStart(4,'0')}`;
  if(state.customers.some(c=>String(c.code).toUpperCase()===code&&c.id!==id)){fieldError('customerCode',`Customer code ${code} is already in use.`);focusInvalid('customerCode');return;}
  const record={id,name,code,status:$('#customerStatus').value,phone:$('#customerPhone').value.trim(),email,address:$('#customerAddress').value.trim(),taxId:$('#customerTaxId').value.trim(),creditLimit:Math.max(0,Number($('#customerCreditLimit').value)||0),openingBalance:Math.max(0,Number($('#customerOpeningBalance').value)||0),tags:$('#customerTags').value.split(',').map(x=>x.trim()).filter(Boolean),notes:$('#customerNotes').value.trim(),payments:customerPayments(existing),createdAt:existing?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
  const button=event.submitter;setButtonBusy(button,true,'Saving customer');
  try{if(existing)Object.assign(existing,record);else state.customers.unshift(record);await addAudit(existing?'Customer updated':'Customer added',`${record.name} (${record.code})`);renderAll();openCustomerDetail(customer(id));toast(existing?'Customer updated':'Customer added');}catch(error){console.error(error);toast('Customer could not be saved. Please retry.','error');}finally{setButtonBusy(button,false);}
});
$('#customerTable').addEventListener('click',event=>{const view=event.target.closest('[data-customer-view]'),edit=event.target.closest('[data-customer-edit]'),c=customer(view?.dataset.customerView||edit?.dataset.customerEdit);if(!c)return;if(edit)openCustomerEditor(c);else openCustomerDetail(c);});
$('#customerDetailContent').addEventListener('click',event=>{const edit=event.target.closest('[data-detail-edit]'),statement=event.target.closest('[data-customer-statement]'),invoice=event.target.closest('[data-customer-invoice]');if(edit){const c=customer(edit.dataset.detailEdit);if(c)openCustomerEditor(c);}if(statement){const c=customer(statement.dataset.customerStatement);if(c)exportCustomerStatement(c);}if(invoice){const sale=state.sales.find(s=>s.id===invoice.dataset.customerInvoice);if(sale)openInvoiceDetail(sale);}});
$('#customerDetailContent').addEventListener('submit',async event=>{if(event.target.id!=='customerPaymentForm')return;event.preventDefault();const c=customer($('#view-customer-detail').dataset.customerId),amount=Number($('#customerPaymentAmount').value),error=$('#customerPaymentError');error.textContent='';if(!c)return;if(!Number.isFinite(amount)||amount<=0){error.textContent='Enter a payment amount greater than zero.';return;}const button=event.submitter;setButtonBusy(button,true,'Recording');try{c.payments=customerPayments(c);c.payments.unshift({id:uid('pay'),amount,note:$('#customerPaymentNote').value.trim(),createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Customer payment recorded',`${c.name} paid ${money(amount)}`);renderAll();openCustomerDetail(customer(c.id));toast('Payment recorded');}catch(saveError){console.error(saveError);error.textContent='Payment could not be saved.';}finally{setButtonBusy(button,false);}});
$('#exportCustomerStatements').addEventListener('click',()=>{const rows=[['Customer','Code','Phone','Email','Invoices','Purchases','Outstanding'],...state.customers.map(c=>{const s=customerStats(c);return[c.name,c.code||'',c.phone||'',c.email||'',s.invoices.length,s.total,s.balance]})],csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n'),link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download=`AMCY-Customer-Statements-${new Date().toISOString().slice(0,10)}.csv`;link.click();URL.revokeObjectURL(link.href);toast('Customer statements exported');});

$('#productForm').addEventListener('submit',async e=>{
  e.preventDefault();clearFormErrors(e.currentTarget);const name=$('#productName').value.trim();
  if(!name){fieldError('productName','Enter a product name to continue.');focusInvalid('productName');return}
  const id=$('#productId').value||uid('p'),existing=product(id);let sku=$('#productSku').value.trim().toUpperCase();
  if(!sku){const base=name.replace(/[^a-z0-9]/gi,'').slice(0,6).toUpperCase()||'ITEM';sku=`AMCY-${base}-${Date.now().toString().slice(-4)}`;}
  const stock=Math.max(0,Number($('#productStock').value)||0),reserved=Math.min(stock,Math.max(0,Number($('#productReserved').value)||0)),damaged=Math.min(stock-reserved,Math.max(0,Number($('#productDamaged').value)||0));
  const item={id,name,sku,barcode:$('#productBarcode').value.trim(),variant:$('#productVariant').value.trim(),category:$('#productCategory').value.trim()||'Uncategorized',stock,reserved,damaged,reorder:Math.max(0,Number($('#productReorder').value)||0),cost:Math.max(0,Number($('#productCost').value)||0),price:Math.max(0,Number($('#productPrice').value)||0),warehouse:$('#productWarehouse').value.trim()||state.profile.defaultWarehouse||'Main Warehouse',batch:$('#productBatch').value.trim(),expiry:$('#productExpiry').value,supplierId:$('#productSupplier').value};
  if(state.products.some(p=>p.sku===item.sku&&p.id!==id)){fieldError('productSku',`SKU ${item.sku} is already in use. Enter another SKU.`);focusInvalid('productSku');return}
  const button=e.submitter;setButtonBusy(button,true,'Saving product');
  try{if(existing)Object.assign(existing,item);else state.products.unshift(item);await addAudit(existing?'Product updated':'Product added',`${item.name} (${item.sku}) ${existing?'was updated':'was created'}`);renderAll();go('inventory');toast(existing?'Product updated':'Product added to inventory');}
  catch(error){console.error(error);toast('Product could not be saved. Please retry.','error');}
  finally{setButtonBusy(button,false);}
});
$('#inventoryTable').addEventListener('click',async e=>{const b=e.target.closest('[data-product-menu]');if(!b)return;const p=product(b.dataset.productMenu);if(!p)return;$('#productForm').reset();clearFormErrors($('#productForm'));$('#productId').value=p.id;$('#productName').value=p.name;$('#productSku').value=p.sku;$('#productBarcode').value=p.barcode||'';$('#productVariant').value=p.variant||'';$('#productCategory').value=p.category;$('#productStock').value=p.stock;$('#productReserved').value=p.reserved||'';$('#productDamaged').value=p.damaged||'';$('#productReorder').value=p.reorder;$('#productCost').value=p.cost;$('#productPrice').value=p.price;$('#productWarehouse').value=p.warehouse||state.profile.defaultWarehouse||'';$('#productBatch').value=p.batch||'';$('#productExpiry').value=p.expiry||'';$('#productSupplier').value=p.supplierId||'';$('#productModalTitle').textContent='Edit product';$('#productDeleteZone').classList.remove('hidden');$('#deleteProductConfirm').classList.add('hidden');refreshCustomSelects();go('product-editor')});
$('#deleteProductBtn').addEventListener('click',()=>{const p=product($('#productId').value);if(!p)return;$('#deleteProductName').textContent=`${p.name} (${p.sku})`;$('#deleteProductError').textContent='';$('#deleteProductConfirm').classList.remove('hidden');$('#deleteProductConfirm').scrollIntoView({behavior:'smooth',block:'center'});});
$('[data-cancel-delete]').addEventListener('click',()=>$('#deleteProductConfirm').classList.add('hidden'));
$('#confirmDeleteProduct').addEventListener('click',async()=>{const id=$('#productId').value,p=product(id),button=$('#confirmDeleteProduct');if(!p)return;setButtonBusy(button,true,'Deleting');$('#deleteProductError').textContent='';try{const root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`),deletedAt=new Date().toISOString(),result=await firebase.runTransaction(root,current=>{const live=normalizeState(current),target=live.products.find(item=>item.id===id);if(!target)return;live.products=live.products.filter(item=>item.id!==id);live.audit.unshift({id:uid('a'),action:'Product deleted',detail:`${target.name} (${target.sku}) was permanently removed from active inventory`,createdAt:deletedAt,user:live.profile.adminName||'Admin User'});return live;},{applyLocally:false});if(!result.committed)throw new Error('Product was already removed or could not be deleted');cart=cart.filter(item=>item.productId!==id);go('inventory');toast(`${p.name} deleted`);}catch(error){console.error(error);$('#deleteProductError').textContent=error.message||'Product could not be deleted.';}finally{setButtonBusy(button,false);}});
function updateStockHint(){const p=product($('#movementProduct').value);$('#currentStockHint').textContent=p?`Current stock: ${p.stock} units`:'Current stock: —'}
$('#movementProduct').addEventListener('change',updateStockHint);
$('#movementForm').addEventListener('submit',async e=>{
  e.preventDefault();clearFormErrors(e.currentTarget);$('#movementError').textContent='';const p=product($('#movementProduct').value),type=$('input[name="movementType"]:checked').value,qty=Number($('#movementQty').value);
  if(!p){fieldError('movementProduct','Choose a product.');focusInvalid('movementProduct');return}
  if(!Number.isFinite(qty)||qty<1){fieldError('movementQty','Enter a quantity of at least 1.');focusInvalid('movementQty');return}
  const before=p.stock,after=type==='in'?before+qty:type==='out'?before-qty:qty;if(after<0){$('#movementError').textContent=`Only ${before} units are available.`;focusInvalid('movementQty');return}
  const button=e.submitter;setButtonBusy(button,true,'Recording');
  try{p.stock=after;const m={id:uid('m'),productId:p.id,type,qty,before,after,reference:$('#movementReference').value.trim(),note:$('#movementNote').value.trim(),createdAt:new Date().toISOString(),user:state.profile.adminName};state.movements.unshift(m);await addAudit(type==='in'?'Stock received':type==='out'?'Stock issued':'Stock adjusted',`${p.name}: ${before} → ${after} units${m.reference?` (${m.reference})`:''}`);renderAll();go('movements');toast('Stock movement recorded');}
  catch(error){console.error(error);$('#movementError').textContent='Movement could not be saved. Please retry.';}
  finally{setButtonBusy(button,false);}
});
$('#supplierForm').addEventListener('submit',async e=>{e.preventDefault();clearFormErrors(e.currentTarget);const name=$('#supplierName').value.trim(),email=$('#supplierEmail').value.trim();if(!name){fieldError('supplierName','Enter the supplier company name.');focusInvalid('supplierName');return}if(email&&!/^\S+@\S+\.\S+$/.test(email)){fieldError('supplierEmail','Enter a valid email address or leave it empty.');focusInvalid('supplierEmail');return}const s={id:uid('s'),name,contact:$('#supplierContact').value.trim(),phone:$('#supplierPhone').value.trim(),email,lead:Math.max(0,Number($('#supplierLead').value)||0),terms:$('#supplierTerms').value.trim()||'Not specified',address:$('#supplierAddress').value.trim()};const button=e.submitter;setButtonBusy(button,true,'Adding supplier');try{state.suppliers.push(s);await addAudit('Supplier added',`${s.name} was added to the supplier directory`);renderAll();go('suppliers');toast('Supplier added');}catch(error){console.error(error);toast('Supplier could not be saved. Please retry.','error');}finally{setButtonBusy(button,false);}});
$('#purchaseForm').addEventListener('submit',async e=>{e.preventDefault();clearFormErrors(e.currentTarget);const supplierId=$('#purchaseSupplier').value,productId=$('#purchaseProduct').value,qty=Number($('#purchaseQty').value);if(!supplierId){fieldError('purchaseSupplier','Choose a supplier.');focusInvalid('purchaseSupplier');return}if(!productId){fieldError('purchaseProduct','Choose a product.');focusInvalid('purchaseProduct');return}if(!Number.isFinite(qty)||qty<1){fieldError('purchaseQty','Enter a quantity of at least 1.');focusInvalid('purchaseQty');return}const maxNo=Math.max(1000,...state.purchases.map(x=>Number(x.id.replace(/\D/g,''))||0)),cost=Math.max(0,Number($('#purchaseCost').value)||0),paid=Math.min(Math.max(0,Number($('#purchasePaid').value)||0),qty*cost);const po={id:`PO-${maxNo+1}`,supplierId,productId,qty,cost,paid,receivedQty:0,supplierInvoice:$('#purchaseSupplierInvoice').value.trim(),status:'draft',expected:$('#purchaseDate').value||new Date().toISOString().slice(0,10),note:$('#purchaseNote').value.trim(),createdAt:new Date().toISOString()};const button=e.submitter;setButtonBusy(button,true,'Creating order');try{state.purchases.unshift(po);await addAudit('Purchase order created',`${po.id} created for ${supplier(po.supplierId)?.name}`);renderAll();go('purchases');toast(`${po.id} created`);}catch(error){console.error(error);toast('Purchase order could not be created. Please retry.','error');}finally{setButtonBusy(button,false);}});
$('#purchaseCards').addEventListener('click',async e=>{const ordered=e.target.closest('[data-mark-ordered]'),receive=e.target.closest('[data-receive-po]'),pay=e.target.closest('[data-pay-po]'),id=ordered?.dataset.markOrdered||receive?.dataset.receivePo||pay?.dataset.payPo;if(!id)return;const po=state.purchases.find(x=>x.id===id),button=ordered||receive||pay;if(!po)return;setButtonBusy(button,true,ordered?'Updating':receive?'Receiving':'Saving payment');try{if(ordered){po.status='ordered';await addAudit('Purchase order placed',`${po.id} marked as ordered`);toast('Order marked as placed');}if(receive){const input=$(`[data-receive-qty="${id}"]`),remaining=Math.max(0,Number(po.qty||0)-Number(po.receivedQty||0)),qty=Number(input?.value||0),p=product(po.productId);if(!Number.isInteger(qty)||qty<1||qty>remaining)throw new Error(`Enter a receiving quantity between 1 and ${remaining}`);if(!p)throw new Error('The purchase product no longer exists');const before=Number(p.stock||0);p.stock=before+qty;po.receivedQty=Number(po.receivedQty||0)+qty;po.status=po.receivedQty>=po.qty?'received':'partial';state.movements.unshift({id:uid('m'),productId:p.id,type:'in',qty,before,after:p.stock,reference:po.id,note:'Purchase order received',createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Purchase stock received',`${po.id}: ${qty} units added to ${p.name}`);toast(`${qty} units received`);}if(pay){const input=$(`[data-pay-amount="${id}"]`),outstanding=Math.max(0,Number(po.qty||0)*Number(po.cost||0)-Number(po.paid||0)),amount=Number(input?.value||0);if(!Number.isFinite(amount)||amount<=0||amount>outstanding)throw new Error(`Enter a supplier payment up to ${money(outstanding)}`);po.paid=Number(po.paid||0)+amount;po.payments=toList(po.payments);po.payments.unshift({id:uid('popay'),amount,createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Supplier payment recorded',`${po.id}: ${money(amount)} paid`);toast('Supplier payment recorded');}renderAll();}catch(error){console.error(error);toast(error.message||'Purchase order could not be updated.','error');}finally{setButtonBusy(button,false);}});

function csvExport(){
  const rows=[['Product','SKU','Category','Stock','Reorder Level','Purchase Cost','Selling Price','Stock Value','Supplier'],...state.products.map(p=>[p.name,p.sku,p.category,p.stock,p.reorder,p.cost,p.price,p.stock*p.cost,supplier(p.supplierId)?.name||''])];const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=`AMCY-Inventory-${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(a.href);toast('Inventory report downloaded');
}
['exportInventory','quickExport','downloadReport'].forEach(id=>$('#'+id).addEventListener('click',csvExport));
function downloadFullBackup(silent=false){const backup={schemaVersion:3,exportedAt:new Date().toISOString(),workspaceUid:ADMIN_UID,data:state};const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`AMCY-Trader-Backup-${new Date().toISOString().replace(/[:.]/g,'-')}.json`;link.click();URL.revokeObjectURL(link.href);if(!silent)toast('Full database backup downloaded');return backup;}
$('#downloadFullBackup').addEventListener('click',()=>downloadFullBackup());
let pendingRestore=null,restoreTimer=null;
$('#restoreBackupButton').addEventListener('click',()=>$('#restoreBackupInput').click());
$('#restoreBackupInput').addEventListener('change',async event=>{const file=event.target.files?.[0];event.target.value='';if(!file)return;$('#restoreBackupError').textContent='';try{const parsed=JSON.parse(await file.text());if(parsed.workspaceUid!==ADMIN_UID||!parsed.data||typeof parsed.data!=='object')throw new Error('This is not a valid AMCY Trader administrator backup.');const normalized=normalizeState(parsed.data);if(!Array.isArray(normalized.products)||!Array.isArray(normalized.sales))throw new Error('Backup structure is incomplete.');pendingRestore={fileName:file.name,data:normalized,exportedAt:parsed.exportedAt||''};$('#restoreBackupName').textContent=file.name;$('#restoreBackupSummary').textContent=`${normalized.products.length} products, ${normalized.customers.length} customers, ${normalized.sales.length} invoices${parsed.exportedAt?` · exported ${formatTime(parsed.exportedAt)}`:''}.`;$('#restoreBackupPhrase').value='';$('#executeRestoreBackup').disabled=true;$('#executeRestoreBackup').textContent='Restore after 10-second hold';$('#restoreBackupPanel').classList.remove('hidden');$('#restoreBackupPanel').scrollIntoView({behavior:'smooth',block:'center'});}catch(error){pendingRestore=null;toast(error.message||'Backup could not be read.','error');}});
$('#restoreBackupPhrase').addEventListener('input',event=>{$('#executeRestoreBackup').disabled=event.target.value!=='RESTORE AMCY BACKUP';$('#restoreBackupError').textContent=event.target.value&&event.target.value!=='RESTORE AMCY BACKUP'?'The confirmation phrase does not match.':'';});
$('#cancelRestoreBackup').addEventListener('click',()=>{pendingRestore=null;if(restoreTimer){clearInterval(restoreTimer);restoreTimer=null;}$('#restoreBackupPanel').classList.add('hidden');$('#restoreBackupPhrase').value='';});
$('#executeRestoreBackup').addEventListener('click',event=>{if(!pendingRestore||$('#restoreBackupPhrase').value!=='RESTORE AMCY BACKUP'||restoreTimer)return;let seconds=10;const button=event.currentTarget;button.disabled=true;button.textContent=`Restore in ${seconds}s`;restoreTimer=setInterval(async()=>{seconds-=1;button.textContent=seconds>0?`Restore in ${seconds}s`:'Restoring…';if(seconds>0)return;clearInterval(restoreTimer);restoreTimer=null;setButtonBusy(button,true,'Restoring backup');try{downloadFullBackup(true);state=normalizeState(pendingRestore.data);state.securityEvents.unshift({id:uid('sec'),action:'Backup restored',detail:pendingRestore.fileName,createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Database backup restored',`${pendingRestore.fileName} replaced live operational data`);pendingRestore=null;cart=[];$('#restoreBackupPanel').classList.add('hidden');renderAll();toast('Backup restored successfully');}catch(error){console.error(error);$('#restoreBackupError').textContent=error.message||'Backup could not be restored.';button.disabled=false;button.textContent='Restore after 10-second hold';}finally{if(!pendingRestore)setButtonBusy(button,false);}},1000);});
$('#dangerActionGrid').addEventListener('click',event=>{const button=event.target.closest('[data-danger-scope]');if(button)selectDangerAction(button.dataset.dangerScope);});
$('#cancelDangerAction').addEventListener('click',()=>cancelDangerFlow());
$('#dangerPhraseInput').addEventListener('input',event=>{const action=dangerActions[dangerScope],matches=!!action&&event.target.value===action.phrase;$('#startDangerTimer').disabled=!matches;$('#dangerPhraseError').textContent=event.target.value&&!matches?'The confirmation phrase does not match.':'';});
$('#startDangerTimer').addEventListener('click',()=>{
  const action=dangerActions[dangerScope];if(!action||$('#dangerPhraseInput').value!==action.phrase)return;
  dangerSeconds=10;dangerReady=false;$('#dangerPhraseInput').disabled=true;$('#startDangerTimer').disabled=true;$('#dangerTimerValue').textContent=String(dangerSeconds);$('#dangerTimerTitle').textContent='Safety hold active';$('#dangerTimerText').textContent='Review the selected action while the timer completes.';$('#dangerTimerBox').classList.remove('hidden');
  dangerTimer=setInterval(()=>{dangerSeconds-=1;$('#dangerTimerValue').textContent=String(Math.max(0,dangerSeconds));if(dangerSeconds<=0){clearInterval(dangerTimer);dangerTimer=null;dangerReady=true;$('#dangerTimerTitle').textContent='Final approval required';$('#dangerTimerText').textContent='The safety timer is complete. Confirm that you understand the deletion.';$('#dangerFinalApproval').classList.remove('hidden');$('#dangerApprovalCheck').focus();}},1000);
});
$('#dangerApprovalCheck').addEventListener('change',event=>{$('#executeDangerDelete').disabled=!(dangerReady&&event.target.checked);});
$('#executeDangerDelete').addEventListener('click',async event=>{
  const action=dangerActions[dangerScope];if(!action||!dangerReady||!$('#dangerApprovalCheck').checked||$('#dangerPhraseInput').value!==action.phrase)return;
  const button=event.currentTarget;$('#dangerDeleteError').textContent='';setButtonBusy(button,true,'Deleting records');
  try{const completedTitle=action.title;downloadFullBackup(true);await executeDangerAction(dangerScope);cancelDangerFlow(true);toast(`${completedTitle} completed. A safety backup was downloaded first.`);}
  catch(error){console.error(error);$('#dangerDeleteError').textContent=error.message||'Records could not be deleted. No further action was taken.';}
  finally{setButtonBusy(button,false);}
});
$('#saveProfile').addEventListener('click',async event=>{const button=event.currentTarget,prefix=$('#invoicePrefixSetting').value.trim().toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,8)||'INV';setButtonBusy(button,true,'Saving');try{state.profile={...state.profile,businessName:$('#businessName').value.trim()||'AMCY Trader',currency:$('#currencySetting').value,location:$('#locationSetting').value.trim(),adminName:$('#nameSetting').value.trim()||'Admin User',invoicePrefix:prefix,nextInvoiceNumber:Math.max(1,Number($('#nextInvoiceSetting').value)||1001),taxRate:Math.min(100,Math.max(0,Number($('#taxRateSetting').value)||0)),defaultWarehouse:$('#warehouseSetting').value.trim()||'Main Warehouse',dataVersion:3};await addAudit('Business profile updated','Company and invoice settings were changed');renderAll();toast('Business profile saved');}catch(error){console.error(error);toast('Business profile could not be saved.','error');}finally{setButtonBusy(button,false);}});

$('#globalSearchBtn').addEventListener('click',()=>{$('#searchOverlay').classList.remove('hidden');$('#globalSearch').focus();renderSearch('')});
$('#searchOverlay').addEventListener('click',e=>{if(e.target===$('#searchOverlay'))$('#searchOverlay').classList.add('hidden')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#searchOverlay').classList.add('hidden');if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();$('#globalSearchBtn').click()}});
$('#globalSearch').addEventListener('input',e=>renderSearch(e.target.value));
function renderSearch(q){q=q.toLowerCase();const results=[...state.products.map(x=>({type:'Product',title:x.name,meta:`${x.sku}${x.barcode?` · ${x.barcode}`:''} · ${availableStock(x)} available`,view:'inventory'})),...state.customers.map(x=>({type:'Customer',title:x.name,meta:[x.code,x.phone,x.email].filter(Boolean).join(' · '),view:'customers'})),...state.suppliers.map(x=>({type:'Supplier',title:x.name,meta:x.contact,view:'suppliers'})),...state.purchases.map(x=>({type:'Purchase order',title:x.id,meta:supplier(x.supplierId)?.name||'',view:'purchases'})),...state.sales.map(x=>({type:'Invoice',title:x.id,meta:x.customer||'Walk-in customer',view:'sales'}))].filter(x=>(x.title+' '+x.meta).toLowerCase().includes(q)).slice(0,12);$('#searchResults').innerHTML=results.map(r=>`<button class="search-result" data-result-view="${r.view}"><span>${r.type[0]}</span><div><b>${esc(r.title)}</b><small>${esc(r.type)} · ${esc(r.meta)}</small></div></button>`).join('')||'<div class="empty-state"><p>No matching records.</p></div>'}
$('#searchResults').addEventListener('click',e=>{const b=e.target.closest('[data-result-view]');if(b){go(b.dataset.resultView);$('#searchOverlay').classList.add('hidden')}});

function toast(message,type='success'){const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;$('#toastContainer').append(el);setTimeout(()=>el.remove(),3200)}

// Structured tools for compatible AI browsers.
const modelContext=document.modelContext;
if(modelContext?.registerTool){
  const toolLife=new AbortController();
  const register=tool=>Promise.resolve(modelContext.registerTool(tool,{signal:toolLife.signal})).catch(console.error);
  register({name:'amcy_inventory_summary',title:'Inventory summary',description:'Get current AMCY Trader inventory totals and low-stock count.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({products:state.products.length,units:state.products.reduce((s,p)=>s+availableStock(p),0),lowStock:state.products.filter(p=>availableStock(p)<=p.reorder).length,value:state.products.reduce((s,p)=>s+p.stock*p.cost,0),currency:state.profile.currency})});
  register({name:'amcy_search_products',title:'Search products',description:'Search inventory by product name, SKU, barcode, variant, warehouse, or category.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:({query})=>{if(typeof query!=='string'||!query.trim())throw new Error('query is required');return state.products.filter(p=>[p.name,p.sku,p.barcode,p.variant,p.warehouse,p.category].join(' ').toLowerCase().includes(query.trim().toLowerCase())).slice(0,20)}});
  register({name:'amcy_record_stock_movement',title:'Record stock movement',description:'Record stock in, stock out, or an exact-count adjustment for an existing SKU.',inputSchema:{type:'object',properties:{sku:{type:'string'},type:{type:'string',enum:['in','out','adjustment']},quantity:{type:'integer',minimum:0},reference:{type:'string'}},required:['sku','type','quantity'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:async({sku,type,quantity,reference=''})=>{const p=state.products.find(x=>x.sku.toLowerCase()===String(sku).toLowerCase());if(!p)throw new Error('SKU not found');if(!Number.isInteger(quantity)||quantity<0||(type!=='adjustment'&&quantity===0))throw new Error('quantity is invalid');const before=p.stock,after=type==='in'?before+quantity:type==='out'?before-quantity:quantity;if(after<0)throw new Error(`Only ${before} units are available`);p.stock=after;state.movements.unshift({id:uid('m'),productId:p.id,type,qty:quantity,before,after,reference:String(reference).slice(0,80),note:'Recorded through structured browser tool',createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Stock movement recorded',`${p.name}: ${before} → ${after} units`);renderAll();return{sku:p.sku,before,after,type,quantity}}});
}

init();
