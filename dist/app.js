const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const ADMIN_UID = 'sAYmgRLwq4g1MIYQPRrT5CeiqJB3';
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB8AYL6JYpKJYxtS_1EsEMpMFdrjYIM06k',
  authDomain: 'amcy-traders.firebaseapp.com',
  databaseURL: 'https://amcy-traders-default-rtdb.firebaseio.com',
  projectId: 'amcy-traders',
  storageBucket: 'amcy-traders.firebasestorage.app',
  messagingSenderId: '70776800554',
  appId: '1:70776800554:web:7750826c31f81830410a53'
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
  profile:{businessName:'AMCY Trader',currency:'PKR',location:'Main Warehouse',adminName:'Admin User',dataVersion:2},
  products:[],suppliers:[],movements:[],purchases:[],sales:[],audit:[]
});
const toList = value => Array.isArray(value) ? value.filter(Boolean) : value && typeof value==='object' ? Object.values(value) : [];
const normalizeState = raw => ({
  profile:{...blankState().profile,...(raw?.profile||{})},products:toList(raw?.products),suppliers:toList(raw?.suppliers),movements:toList(raw?.movements),purchases:toList(raw?.purchases),sales:toList(raw?.sales),audit:toList(raw?.audit)
});
const isOriginalMockData = raw => {const products=toList(raw?.products),demoSkus=['AMCY-TX-101','AMCY-SF-205','AMCY-PK-310','AMCY-CL-412','AMCY-PK-322','AMCY-SF-218','AMCY-TX-118'];return !raw?.profile?.dataVersion&&products.length===7&&demoSkus.every(sku=>products.some(p=>p?.sku===sku))};

let state = blankState();
let mode = 'firebase';
let firebase = null;
let firebaseConfig = null;
let currentUser = null;
let cloudOnline = false;
let syncWarningShown = false;
let stopRealtime = null;
let cart = [];

const money = n => `${state.profile.currency || 'PKR'} ${Number(n||0).toLocaleString('en-PK',{maximumFractionDigits:0})}`;
const uid = p => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
const esc = v => String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const initials = s => s.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const product = id => state.products.find(x=>x.id===id);
const supplier = id => state.suppliers.find(x=>x.id===id);
const formatDate = v => new Intl.DateTimeFormat('en-PK',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(v));
const formatTime = v => new Intl.DateTimeFormat('en-PK',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(v));

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
    firebase={...authMod,...dbMod,auth,db}; firebaseConfig=config; mode='firebase';
    return true;
  }catch(e){ console.error(e); mode='offline'; cloudOnline=false; return false; }
}

async function init(){
  $('#dateLine').textContent=new Intl.DateTimeFormat('en-PK',{weekday:'long',day:'numeric',month:'long'}).format(today);
  const ok=await bootFirebase(DEFAULT_FIREBASE_CONFIG);
  if(ok){
    firebase.onAuthStateChanged(firebase.auth,async user=>{
      if(user?.uid===ADMIN_UID){currentUser=user;try{await loadFirebaseData();showApp();}catch{showAuth();$('#loginError').textContent='Signed in, but live data access was denied. Publish the database rules and reload.';}}
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
    else{state=normalizeState(raw);if(state.profile.dataVersion!==2){state.profile.dataVersion=2;await firebase.set(businessRef,state);}}
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
  const submit=$('#loginForm button[type="submit"]');submit.disabled=true;submit.firstElementChild.textContent='Signing in…';
  try{await firebase.setPersistence(firebase.auth,firebase.browserLocalPersistence);const credential=await firebase.signInWithEmailAndPassword(firebase.auth,$('#loginEmail').value.trim(),$('#loginPassword').value);if(credential.user.uid!==ADMIN_UID){await firebase.signOut(firebase.auth);$('#loginError').textContent='This account is not authorized for AMCY Trader admin access.';}}
  catch(err){console.error(err);const messages={'auth/invalid-credential':'Email or password is incorrect.','auth/user-disabled':'This administrator account is disabled.','auth/too-many-requests':'Too many attempts. Please wait and try again.','auth/network-request-failed':'Network error. Check your connection and try again.'};$('#loginError').textContent=messages[err.code]||`Sign-in failed (${String(err.code||'unknown').replace('auth/','')}).`;}
  finally{submit.disabled=false;submit.firstElementChild.textContent='Sign in securely';}
});
$('#togglePassword').addEventListener('click',e=>{const i=$('#loginPassword');i.type=i.type==='password'?'text':'password';e.target.textContent=i.type==='password'?'Show':'Hide'});
$('#logoutBtn').addEventListener('click',async()=>{if(stopRealtime){stopRealtime();stopRealtime=null;}if(mode==='firebase'&&firebase)await firebase.signOut(firebase.auth);else showAuth()});

const titles={dashboard:'Operations overview',inventory:'Inventory control',movements:'Stock movement ledger',sales:'Point of sale',purchases:'Purchase orders',suppliers:'Supplier directory',reports:'Reports & insights',audit:'Audit log',settings:'System settings'};
function go(view){
  $$('.view').forEach(x=>x.classList.toggle('active',x.id===`view-${view}`));
  $$('#mainNav button').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  $('#pageTitle').textContent=titles[view];$('#sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
$('#mainNav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)go(b.dataset.view)});
$$('[data-view-jump]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.viewJump)));
$('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.add('open'));
$('#closeSidebar').addEventListener('click',()=>$('#sidebar').classList.remove('open'));

function renderAll(){
  renderKpis();renderDashboard();renderInventory();renderMovements();renderPOS();renderSales();renderPurchases();renderSuppliers();renderReports();renderAudit();populateSelects();renderProfile();updateSync();
}
function renderKpis(){
  const value=state.products.reduce((s,p)=>s+p.stock*p.cost,0), units=state.products.reduce((s,p)=>s+p.stock,0), low=state.products.filter(p=>p.stock<=p.reorder), open=state.purchases.filter(p=>p.status!=='received');
  $('#kpiValue').textContent=money(value);$('#kpiProducts').textContent=state.products.length;$('#kpiUnits').textContent=`${units.toLocaleString()} units on hand`;$('#kpiLow').textContent=low.length;$('#kpiOrders').textContent=open.length;$('#kpiIncoming').textContent=`${open.reduce((s,p)=>s+p.qty,0)} incoming units`;$('#lowStockBadge').textContent=low.length;$('#attentionCount').textContent=low.length;$('#attentionStrip').style.display=low.length?'flex':'none';
}
function renderDashboard(){
  const low=[...state.products].filter(p=>p.stock<=p.reorder).sort((a,b)=>a.stock-b.stock).slice(0,5);
  $('#lowStockList').innerHTML=low.length?low.map(p=>`<div class="stock-row"><div class="product-icon">${initials(p.name)}</div><div><b>${esc(p.name)}</b><small>${esc(p.sku)} · Reorder at ${p.reorder}</small></div><strong>${p.stock} left</strong></div>`).join(''):'<div class="empty-state"><p>All stock levels are healthy.</p></div>';
  $('#recentMovements').innerHTML=[...state.movements].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5).map(m=>`<tr><td><strong>${esc(product(m.productId)?.name||'Deleted product')}</strong></td><td><span class="type-badge ${m.type}">${m.type==='in'?'Stock in':m.type==='out'?'Stock out':'Adjustment'}</span></td><td>${m.type==='out'?'-':'+'}${m.qty}</td><td>${esc(m.reference||'—')}</td><td>${formatTime(m.createdAt)}</td></tr>`).join('');
  const days=[6,5,4,3,2,1,0].map(n=>{const d=new Date(today);d.setDate(d.getDate()-n);const items=state.movements.filter(m=>new Date(m.createdAt).toDateString()===d.toDateString());return{label:d.toLocaleDateString('en',{weekday:'short'}),ins:items.filter(x=>x.type==='in').reduce((s,x)=>s+x.qty,0),outs:items.filter(x=>x.type==='out').reduce((s,x)=>s+x.qty,0)}});const max=Math.max(1,...days.flatMap(d=>[d.ins,d.outs]));
  $('#movementChart').innerHTML=days.map(d=>`<div class="chart-day"><div class="bars"><i class="bar in" title="${d.ins} in" style="height:${Math.max(3,d.ins/max*100)}%"></i><i class="bar out" title="${d.outs} out" style="height:${Math.max(3,d.outs/max*100)}%"></i></div><small>${d.label}</small></div>`).join('');
}
function stockStatus(p){return p.stock===0?['out','Out of stock']:p.stock<=p.reorder?['warning','Low stock']:['healthy','Healthy']}
function filteredProducts(){const q=$('#inventorySearch').value.toLowerCase(),cat=$('#categoryFilter').value,st=$('#stockFilter').value;return state.products.filter(p=>(`${p.name} ${p.sku} ${p.category}`).toLowerCase().includes(q)&&(cat==='all'||p.category===cat)&&(st==='all'||stockStatus(p)[0]===st||(st==='low'&&stockStatus(p)[0]==='warning')))}
function renderInventory(){
  const rows=filteredProducts();$('#inventoryCount').textContent=`${rows.length} product${rows.length===1?'':'s'}`;$('#inventoryValue').textContent=money(state.products.reduce((s,p)=>s+p.stock*p.cost,0));
  $('#inventoryTable').innerHTML=rows.map(p=>{const st=stockStatus(p);return `<tr><td><div class="product-cell"><span>${initials(p.name)}</span><div><strong>${esc(p.name)}</strong><small>${esc(supplier(p.supplierId)?.name||'No supplier')}</small></div></div></td><td>${esc(p.sku)}</td><td>${esc(p.category)}</td><td><span class="stock-number ${st[0]}">${p.stock}</span></td><td>${p.reorder}</td><td>${money(p.cost)}</td><td><strong>${money(p.stock*p.cost)}</strong></td><td><span class="status-pill ${st[0]}">${st[1]}</span></td><td><button class="row-menu" data-product-menu="${p.id}">•••</button></td></tr>`}).join('');
  $('#inventoryEmpty').classList.toggle('hidden',rows.length>0);$('#inventoryTable').closest('.table-wrap').classList.toggle('hidden',rows.length===0);
  const categories=[...new Set(state.products.map(p=>p.category))].sort();const current=$('#categoryFilter').value;$('#categoryFilter').innerHTML='<option value="all">All categories</option>'+categories.map(c=>`<option>${esc(c)}</option>`).join('');$('#categoryFilter').value=categories.includes(current)?current:'all';
}
function renderMovements(){
  const q=$('#movementSearch').value.toLowerCase(),type=$('#movementTypeFilter').value;const items=[...state.movements].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).filter(m=>{const p=product(m.productId);return(`${p?.name||''} ${m.reference||''}`).toLowerCase().includes(q)&&(type==='all'||m.type===type)});
  $('#movementsTable').innerHTML=items.map(m=>`<tr><td>${formatTime(m.createdAt)}</td><td><strong>${esc(product(m.productId)?.name||'Deleted product')}</strong><br><small>${esc(product(m.productId)?.sku||'')}</small></td><td><span class="type-badge ${m.type}">${m.type==='in'?'Stock in':m.type==='out'?'Stock out':'Adjustment'}</span></td><td><strong>${m.type==='out'?'-':'+'}${m.qty}</strong></td><td>${m.before}</td><td>${m.after}</td><td>${esc(m.reference||'—')}</td><td>${esc(m.user||'Admin')}</td></tr>`).join('')||'<tr><td colspan="8">No movements match these filters.</td></tr>';
}
function renderPOS(){
  const q=($('#posSearch')?.value||'').toLowerCase();
  const available=state.products.filter(p=>(`${p.name} ${p.sku} ${p.category}`).toLowerCase().includes(q));
  $('#posProducts').innerHTML=available.map(p=>`<button class="pos-product" data-pos-product="${p.id}" ${p.stock<=0?'disabled':''}><b>${esc(p.name)}</b><small>${esc(p.sku)} · ${p.stock} available</small><strong>${money(p.price)}</strong></button>`).join('')||'<div class="empty-state"><h3>No products available</h3><p>Add products to inventory before creating a sale.</p></div>';
  cart=cart.filter(item=>product(item.productId));renderCart();
}
function cartTotals(){const subtotal=cart.reduce((sum,item)=>{const p=product(item.productId);return sum+(p?.price||0)*item.qty},0),discount=Math.min(Math.max(0,Number($('#saleDiscount')?.value||0)),subtotal);return{subtotal,discount,total:subtotal-discount,units:cart.reduce((s,i)=>s+i.qty,0)}}
function renderCart(){
  $('#cartItems').innerHTML=cart.length?cart.map(item=>{const p=product(item.productId);return `<div class="cart-row"><div><b>${esc(p.name)}</b><small>${money(p.price)} each · ${money(p.price*item.qty)}</small></div><div class="qty-control"><button data-cart-change="-1" data-cart-id="${p.id}">−</button><span>${item.qty}</span><button data-cart-change="1" data-cart-id="${p.id}" ${item.qty>=p.stock?'disabled':''}>＋</button></div><button class="cart-remove" data-cart-remove="${p.id}" title="Remove">×</button></div>`}).join(''):'<div class="cart-empty">Select a product to begin this invoice.</div>';
  const t=cartTotals();$('#cartUnits').textContent=t.units;$('#cartSubtotal').textContent=money(t.subtotal);$('#cartTotal').textContent=money(t.total);$('#completeSale').disabled=!cart.length||!cloudOnline;
}
function renderSales(){
  $('#salesTable').innerHTML=[...state.sales].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(s=>`<tr><td><strong>${esc(s.id)}</strong></td><td>${esc(s.customer||'Walk-in customer')}<br><small>${esc(s.phone||'')}</small></td><td>${toList(s.items).reduce((n,i)=>n+i.qty,0)} units</td><td>${esc(s.payment)}</td><td><strong>${money(s.total)}</strong></td><td>${formatTime(s.createdAt)}</td><td><button class="receipt-btn" data-print-sale="${s.id}">Print</button></td></tr>`).join('')||'<tr><td colspan="7">No sales recorded yet.</td></tr>';
}
function receiptHtml(sale){
  const business=esc(state.profile.businessName||'AMCY Trader'),location=esc(state.profile.location||'');return `<!doctype html><html><head><title>${esc(sale.id)}</title><style>body{font:14px Arial,sans-serif;color:#111;margin:0;padding:24px}.receipt{max-width:360px;margin:auto}h1{text-align:center;font-size:22px;margin:0}.location{text-align:center;color:#555;margin:5px 0 18px}.meta{border-top:1px dashed #777;border-bottom:1px dashed #777;padding:10px 0;margin:10px 0}.meta div,.line,.totals div{display:flex;justify-content:space-between;gap:15px}.line{padding:7px 0;border-bottom:1px dotted #ccc}.line span:first-child{flex:1}.line small{display:block;color:#666}.totals{margin-top:12px}.totals div{padding:4px 0}.totals .grand{font-size:18px;font-weight:bold;border-top:2px solid #111;margin-top:7px;padding-top:9px}.thanks{text-align:center;margin-top:24px;font-weight:bold}@media print{body{padding:0}.receipt{max-width:none}}</style></head><body><div class="receipt"><h1>${business}</h1><div class="location">${location}</div><div class="meta"><div><b>Invoice</b><span>${esc(sale.id)}</span></div><div><b>Date</b><span>${formatTime(sale.createdAt)}</span></div><div><b>Customer</b><span>${esc(sale.customer||'Walk-in customer')}</span></div>${sale.phone?`<div><b>Phone</b><span>${esc(sale.phone)}</span></div>`:''}<div><b>Payment</b><span>${esc(sale.payment)}</span></div></div>${toList(sale.items).map(i=>`<div class="line"><span>${esc(i.name)}<small>${i.qty} × ${money(i.price)}</small></span><b>${money(i.qty*i.price)}</b></div>`).join('')}<div class="totals"><div><span>Subtotal</span><b>${money(sale.subtotal)}</b></div>${sale.discount?`<div><span>Discount</span><b>−${money(sale.discount)}</b></div>`:''}<div class="grand"><span>Total</span><b>${money(sale.total)}</b></div></div><p class="thanks">Thank you for your purchase</p></div><script>window.onload=()=>{window.print()}<\/script></body></html>`;
}
function printReceipt(sale,targetWindow){const w=targetWindow||window.open('','_blank','width=440,height=760');if(!w){toast('Allow pop-ups to print the receipt.','error');return}w.document.open();w.document.write(receiptHtml(sale));w.document.close();}
let poFilter='all';
function renderPurchases(){
  const orders=[...state.purchases].filter(p=>poFilter==='all'||p.status===poFilter).sort((a,b)=>b.id.localeCompare(a.id));
  $('#purchaseCards').innerHTML=orders.map(po=>`<article class="po-card"><div class="po-top"><div><span class="eyebrow">${esc(po.id)}</span><h3>${esc(supplier(po.supplierId)?.name||'Unknown supplier')}</h3><p>Expected ${formatDate(po.expected)}</p></div><span class="status-pill ${po.status}">${po.status[0].toUpperCase()+po.status.slice(1)}</span></div><div class="po-details"><span>Product<b>${esc(product(po.productId)?.name||'Deleted')}</b></span><span>Quantity<b>${po.qty} units</b></span></div><div class="po-actions"><strong>${money(po.qty*po.cost)}</strong>${po.status!=='received'?`<button class="small-btn" data-receive-po="${po.id}">${po.status==='draft'?'Mark ordered':'Receive stock'}</button>`:'<small>Completed</small>'}</div></article>`).join('')||'<div class="empty-state"><h3>No purchase orders</h3><p>Create an order to begin.</p></div>';
}
function renderSuppliers(){
  $('#supplierGrid').innerHTML=state.suppliers.map(s=>{const supplied=state.products.filter(p=>p.supplierId===s.id).length;return `<article class="supplier-card"><div class="supplier-top"><div class="supplier-avatar">${initials(s.name)}</div><span class="status-pill healthy">Active</span></div><h3>${esc(s.name)}</h3><p>${esc(s.contact)} · ${esc(s.phone)}</p><dl><div><dt>PRODUCTS</dt><dd>${supplied} supplied</dd></div><div><dt>LEAD TIME</dt><dd>${s.lead} days</dd></div><div><dt>TERMS</dt><dd>${esc(s.terms)}</dd></div><div><dt>EMAIL</dt><dd>${esc(s.email||'—')}</dd></div></dl></article>`}).join('')||'<div class="empty-state"><h3>No suppliers yet</h3></div>';
}
function renderReports(){
  const cats={};state.products.forEach(p=>cats[p.category]=(cats[p.category]||0)+p.stock*p.cost);const max=Math.max(1,...Object.values(cats));$('#categoryBars').innerHTML=Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,v])=>`<div class="category-bar"><div><span>${esc(c)}</span><b>${money(v)}</b></div><div><i style="width:${v/max*100}%"></i></div></div>`).join('');
  const healthy=state.products.filter(p=>p.stock>p.reorder).length,low=state.products.filter(p=>p.stock>0&&p.stock<=p.reorder).length,out=state.products.filter(p=>p.stock===0).length,total=Math.max(1,state.products.length),pct=Math.round(healthy/total*100);$('#healthPct').textContent=`${pct}%`;$('#healthDonut').style.background=`conic-gradient(var(--green) 0 ${healthy/total*100}%,var(--amber) ${healthy/total*100}% ${(healthy+low)/total*100}%,var(--red) ${(healthy+low)/total*100}% 100%)`;$('#healthLegend').innerHTML=`<div><i style="background:var(--green)"></i><span>Healthy</span><b>${healthy}</b></div><div><i style="background:var(--amber)"></i><span>Low stock</span><b>${low}</b></div><div><i style="background:var(--red)"></i><span>Out of stock</span><b>${out}</b></div>`;
  const recs=state.products.filter(p=>p.stock<=p.reorder).sort((a,b)=>a.stock-b.stock);$('#reorderRecommendations').innerHTML=recs.map(p=>{const qty=Math.max(p.reorder*2-p.stock,p.reorder);return `<div class="recommendation"><div><strong>${esc(p.name)}</strong><small>${esc(p.sku)} · ${p.stock} remaining</small></div><span>Order <b>${qty}</b> units</span><strong class="rec-cost">${money(qty*p.cost)}</strong></div>`}).join('')||'<p>Nothing to reorder right now.</p>';
}
function renderAudit(){
  $('#auditTimeline').innerHTML=[...state.audit].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(a=>`<div class="audit-item"><span>✓</span><div><b>${esc(a.action)}</b><p>${esc(a.detail)}</p></div><time>${formatTime(a.createdAt)}<br>${esc(a.user)}</time></div>`).join('')||'<div class="empty-state"><p>No audit events yet.</p></div>';
}
function populateSelects(){
  const prod='<option value="">Select a product</option>'+state.products.map(p=>`<option value="${p.id}">${esc(p.name)} — ${p.stock} in stock</option>`).join('');$('#movementProduct').innerHTML=prod;$('#purchaseProduct').innerHTML=prod;
  const supp='<option value="">Select a supplier</option>'+state.suppliers.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('');$('#productSupplier').innerHTML=supp;$('#purchaseSupplier').innerHTML=supp;
}
function renderProfile(){
  $('#businessName').value=state.profile.businessName||'AMCY Trader';$('#currencySetting').value=state.profile.currency||'PKR';$('#locationSetting').value=state.profile.location||'';$('#nameSetting').value=state.profile.adminName||'Admin User';$('#adminName').textContent=state.profile.adminName||'Admin User';
}

['inventorySearch','categoryFilter','stockFilter'].forEach(id=>$('#'+id).addEventListener(id.includes('Search')?'input':'change',renderInventory));
['movementSearch','movementTypeFilter'].forEach(id=>$('#'+id).addEventListener(id.includes('Search')?'input':'change',renderMovements));
$('#posSearch').addEventListener('input',renderPOS);
$('#saleDiscount').addEventListener('input',renderCart);
$('#posProducts').addEventListener('click',e=>{const b=e.target.closest('[data-pos-product]');if(!b)return;const p=product(b.dataset.posProduct);if(!p||p.stock<=0)return;const item=cart.find(i=>i.productId===p.id);if(item){if(item.qty>=p.stock){toast('No more units are available.','error');return}item.qty++;}else cart.push({productId:p.id,qty:1});renderCart()});
$('#cartItems').addEventListener('click',e=>{const remove=e.target.closest('[data-cart-remove]'),change=e.target.closest('[data-cart-change]');if(remove)cart=cart.filter(i=>i.productId!==remove.dataset.cartRemove);if(change){const item=cart.find(i=>i.productId===change.dataset.cartId),p=product(change.dataset.cartId),next=item.qty+Number(change.dataset.cartChange);if(next<=0)cart=cart.filter(i=>i.productId!==item.productId);else if(next<=p.stock)item.qty=next;}renderCart()});
$('#clearCart').addEventListener('click',()=>{cart=[];$('#saleDiscount').value=0;$('#saleError').textContent='';renderCart()});
$('#completeSale').addEventListener('click',async()=>{
  $('#saleError').textContent='';if(!cart.length)return;const printWindow=window.open('','_blank','width=440,height=760');if(printWindow)printWindow.document.write('<p style="font-family:Arial;padding:24px">Preparing receipt…</p>');
  const totals=cartTotals(),sale={id:`INV-${Date.now().toString().slice(-10)}`,customer:$('#saleCustomer').value.trim()||'Walk-in customer',phone:$('#salePhone').value.trim(),payment:$('#salePayment').value,items:cart.map(item=>{const p=product(item.productId);return{productId:p.id,name:p.name,sku:p.sku,price:p.price,qty:item.qty}}),subtotal:totals.subtotal,discount:totals.discount,total:totals.total,createdAt:new Date().toISOString(),user:state.profile.adminName||'Admin User'};
  const button=$('#completeSale');button.disabled=true;button.firstElementChild.textContent='Completing sale…';
  try{
    const root=firebase.ref(firebase.db,`businesses/${ADMIN_UID}`);const result=await firebase.runTransaction(root,current=>{const live=normalizeState(current);for(const item of sale.items){const p=live.products.find(x=>x.id===item.productId);if(!p||p.stock<item.qty)throw new Error(`${item.name} no longer has enough stock`);}for(const item of sale.items){const p=live.products.find(x=>x.id===item.productId),before=p.stock;p.stock-=item.qty;live.movements.unshift({id:uid('m'),productId:p.id,type:'out',qty:item.qty,before,after:p.stock,reference:sale.id,note:`Customer sale — ${sale.customer}`,createdAt:sale.createdAt,user:sale.user});}live.sales.unshift(sale);live.audit.unshift({id:uid('a'),action:'Sale completed',detail:`${sale.id} for ${sale.customer} — ${money(sale.total)}`,createdAt:sale.createdAt,user:sale.user});return live;},{applyLocally:false});
    if(!result.committed)throw new Error('Sale could not be committed');cart=[];$('#saleCustomer').value='';$('#salePhone').value='';$('#saleDiscount').value=0;renderCart();toast(`${sale.id} completed`);printReceipt(sale,printWindow);
  }catch(error){console.error(error);if(printWindow)printWindow.close();$('#saleError').textContent=error.message||'Sale could not be completed. Please retry.';}
  finally{button.disabled=!cart.length;button.firstElementChild.textContent='Complete sale & print receipt';}
});
$('#salesTable').addEventListener('click',e=>{const b=e.target.closest('[data-print-sale]');if(!b)return;const sale=state.sales.find(s=>s.id===b.dataset.printSale);if(sale)printReceipt(sale)});
$('#poTabs').addEventListener('click',e=>{const b=e.target.closest('[data-po]');if(!b)return;poFilter=b.dataset.po;$$('#poTabs button').forEach(x=>x.classList.toggle('active',x===b));renderPurchases()});

function openDialog(name,trigger){
  const d=$(`#${name}Dialog`);if(!d)return;
  if(name==='product'){$('#productForm').reset();$('#productId').value='';$('#productModalTitle').textContent='Add product';$('#productReorder').value=10}
  if(name==='movement'){$('#movementForm').reset();$('#movementError').textContent='';if(trigger?.dataset.type)$(`input[name="movementType"][value="${trigger.dataset.type}"]`).checked=true;updateStockHint()}
  if(name==='purchase'){$('#purchaseForm').reset();$('#purchaseDate').value=new Date(Date.now()+7*86400000).toISOString().slice(0,10)}
  if(name==='supplier')$('#supplierForm').reset(); d.showModal();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openDialog(b.dataset.open,b)});
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

$('#productForm').addEventListener('submit',async e=>{
  e.preventDefault();const id=$('#productId').value||uid('p'),existing=product(id);const item={id,name:$('#productName').value.trim(),sku:$('#productSku').value.trim().toUpperCase(),category:$('#productCategory').value.trim(),stock:Number($('#productStock').value),reorder:Number($('#productReorder').value),cost:Number($('#productCost').value),price:Number($('#productPrice').value),supplierId:$('#productSupplier').value};
  if(state.products.some(p=>p.sku===item.sku&&p.id!==id)){toast('That SKU already exists.','error');return}
  if(existing)Object.assign(existing,item);else state.products.unshift(item);await addAudit(existing?'Product updated':'Product added',`${item.name} (${item.sku}) ${existing?'was updated':'was created'}`);$('#productDialog').close();renderAll();toast(existing?'Product updated':'Product added to inventory');
});
$('#inventoryTable').addEventListener('click',async e=>{const b=e.target.closest('[data-product-menu]');if(!b)return;const p=product(b.dataset.productMenu);if(!p)return;$('#productId').value=p.id;$('#productName').value=p.name;$('#productSku').value=p.sku;$('#productCategory').value=p.category;$('#productStock').value=p.stock;$('#productReorder').value=p.reorder;$('#productCost').value=p.cost;$('#productPrice').value=p.price;$('#productSupplier').value=p.supplierId||'';$('#productModalTitle').textContent='Edit product';$('#productDialog').showModal()});
function updateStockHint(){const p=product($('#movementProduct').value);$('#currentStockHint').textContent=p?`Current stock: ${p.stock} units`:'Current stock: —'}
$('#movementProduct').addEventListener('change',updateStockHint);
$('#movementForm').addEventListener('submit',async e=>{
  e.preventDefault();const p=product($('#movementProduct').value),type=$('input[name="movementType"]:checked').value,qty=Number($('#movementQty').value);if(!p)return;const before=p.stock;let after=type==='in'?before+qty:type==='out'?before-qty:qty;if(after<0){$('#movementError').textContent=`Only ${before} units are available.`;return}p.stock=after;const m={id:uid('m'),productId:p.id,type,qty,before,after,reference:$('#movementReference').value.trim(),note:$('#movementNote').value.trim(),createdAt:new Date().toISOString(),user:state.profile.adminName};state.movements.unshift(m);await addAudit(type==='in'?'Stock received':type==='out'?'Stock issued':'Stock adjusted',`${p.name}: ${before} → ${after} units${m.reference?` (${m.reference})`:''}`);$('#movementDialog').close();renderAll();toast('Stock movement recorded');
});
$('#supplierForm').addEventListener('submit',async e=>{e.preventDefault();const s={id:uid('s'),name:$('#supplierName').value.trim(),contact:$('#supplierContact').value.trim(),phone:$('#supplierPhone').value.trim(),email:$('#supplierEmail').value.trim(),lead:Number($('#supplierLead').value),terms:$('#supplierTerms').value.trim(),address:$('#supplierAddress').value.trim()};state.suppliers.push(s);await addAudit('Supplier added',`${s.name} was added to the supplier directory`);$('#supplierDialog').close();renderAll();toast('Supplier added')});
$('#purchaseForm').addEventListener('submit',async e=>{e.preventDefault();const maxNo=Math.max(1000,...state.purchases.map(x=>Number(x.id.replace(/\D/g,''))||0));const po={id:`PO-${maxNo+1}`,supplierId:$('#purchaseSupplier').value,productId:$('#purchaseProduct').value,qty:Number($('#purchaseQty').value),cost:Number($('#purchaseCost').value),status:'draft',expected:$('#purchaseDate').value,note:$('#purchaseNote').value.trim()};state.purchases.unshift(po);await addAudit('Purchase order created',`${po.id} created for ${supplier(po.supplierId)?.name}`);$('#purchaseDialog').close();renderAll();toast(`${po.id} created`)});
$('#purchaseCards').addEventListener('click',async e=>{const b=e.target.closest('[data-receive-po]');if(!b)return;const po=state.purchases.find(x=>x.id===b.dataset.receivePo);if(po.status==='draft'){po.status='ordered';await addAudit('Purchase order placed',`${po.id} marked as ordered`);toast('Order marked as placed')}else{const p=product(po.productId),before=p.stock;p.stock+=po.qty;po.status='received';state.movements.unshift({id:uid('m'),productId:p.id,type:'in',qty:po.qty,before,after:p.stock,reference:po.id,note:'Purchase order received',createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Purchase order received',`${po.id}: ${po.qty} units added to ${p.name}`);toast('Order received and stock updated')}renderAll()});

function csvExport(){
  const rows=[['Product','SKU','Category','Stock','Reorder Level','Purchase Cost','Selling Price','Stock Value','Supplier'],...state.products.map(p=>[p.name,p.sku,p.category,p.stock,p.reorder,p.cost,p.price,p.stock*p.cost,supplier(p.supplierId)?.name||''])];const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=`AMCY-Inventory-${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(a.href);toast('Inventory report downloaded');
}
['exportInventory','quickExport','downloadReport'].forEach(id=>$('#'+id).addEventListener('click',csvExport));
$('#saveProfile').addEventListener('click',async()=>{state.profile={...state.profile,businessName:$('#businessName').value.trim(),currency:$('#currencySetting').value,location:$('#locationSetting').value.trim(),adminName:$('#nameSetting').value.trim(),dataVersion:2};await addAudit('Business profile updated','Company settings were changed');renderAll();toast('Business profile saved')});

$('#globalSearchBtn').addEventListener('click',()=>{$('#searchOverlay').classList.remove('hidden');$('#globalSearch').focus();renderSearch('')});
$('#searchOverlay').addEventListener('click',e=>{if(e.target===$('#searchOverlay'))$('#searchOverlay').classList.add('hidden')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#searchOverlay').classList.add('hidden');if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();$('#globalSearchBtn').click()}});
$('#globalSearch').addEventListener('input',e=>renderSearch(e.target.value));
function renderSearch(q){q=q.toLowerCase();const results=[...state.products.map(x=>({type:'Product',title:x.name,meta:`${x.sku} · ${x.stock} units`,view:'inventory'})),...state.suppliers.map(x=>({type:'Supplier',title:x.name,meta:x.contact,view:'suppliers'})),...state.purchases.map(x=>({type:'Purchase order',title:x.id,meta:supplier(x.supplierId)?.name||'',view:'purchases'})),...state.sales.map(x=>({type:'Invoice',title:x.id,meta:x.customer||'Walk-in customer',view:'sales'}))].filter(x=>(x.title+' '+x.meta).toLowerCase().includes(q)).slice(0,12);$('#searchResults').innerHTML=results.map(r=>`<button class="search-result" data-result-view="${r.view}"><span>${r.type[0]}</span><div><b>${esc(r.title)}</b><small>${esc(r.type)} · ${esc(r.meta)}</small></div></button>`).join('')||'<div class="empty-state"><p>No matching records.</p></div>'}
$('#searchResults').addEventListener('click',e=>{const b=e.target.closest('[data-result-view]');if(b){go(b.dataset.resultView);$('#searchOverlay').classList.add('hidden')}});

function toast(message,type='success'){const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;$('#toastContainer').append(el);setTimeout(()=>el.remove(),3200)}

// Structured tools for compatible AI browsers.
const modelContext=document.modelContext;
if(modelContext?.registerTool){
  const toolLife=new AbortController();
  const register=tool=>Promise.resolve(modelContext.registerTool(tool,{signal:toolLife.signal})).catch(console.error);
  register({name:'amcy_inventory_summary',title:'Inventory summary',description:'Get current AMCY Trader inventory totals and low-stock count.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({products:state.products.length,units:state.products.reduce((s,p)=>s+p.stock,0),lowStock:state.products.filter(p=>p.stock<=p.reorder).length,value:state.products.reduce((s,p)=>s+p.stock*p.cost,0),currency:state.profile.currency})});
  register({name:'amcy_search_products',title:'Search products',description:'Search inventory by product name, SKU, or category.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:({query})=>{if(typeof query!=='string'||!query.trim())throw new Error('query is required');return state.products.filter(p=>(p.name+' '+p.sku+' '+p.category).toLowerCase().includes(query.trim().toLowerCase())).slice(0,20)}});
  register({name:'amcy_record_stock_movement',title:'Record stock movement',description:'Record stock in, stock out, or an exact-count adjustment for an existing SKU.',inputSchema:{type:'object',properties:{sku:{type:'string'},type:{type:'string',enum:['in','out','adjustment']},quantity:{type:'integer',minimum:0},reference:{type:'string'}},required:['sku','type','quantity'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:async({sku,type,quantity,reference=''})=>{const p=state.products.find(x=>x.sku.toLowerCase()===String(sku).toLowerCase());if(!p)throw new Error('SKU not found');if(!Number.isInteger(quantity)||quantity<0||(type!=='adjustment'&&quantity===0))throw new Error('quantity is invalid');const before=p.stock,after=type==='in'?before+quantity:type==='out'?before-quantity:quantity;if(after<0)throw new Error(`Only ${before} units are available`);p.stock=after;state.movements.unshift({id:uid('m'),productId:p.id,type,qty:quantity,before,after,reference:String(reference).slice(0,80),note:'Recorded through structured browser tool',createdAt:new Date().toISOString(),user:state.profile.adminName});await addAudit('Stock movement recorded',`${p.name}: ${before} → ${after} units`);renderAll();return{sku:p.sku,before,after,type,quantity}}});
}

init();
