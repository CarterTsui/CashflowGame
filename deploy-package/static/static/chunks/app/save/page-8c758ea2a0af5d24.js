(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[470],{8505:(e,a,t)=>{"use strict";t.d(a,{default:()=>r});var s=t(5155),o=t(2115);function r(){let[e,a]=(0,o.useState)([]),[t,r]=(0,o.useState)(""),[l,c]=(0,o.useState)("");(0,o.useEffect)(()=>{n()},[]);let n=()=>{try{let e=localStorage.getItem("cashflow-tycoon-saves");e&&a(JSON.parse(e))}catch(e){console.error("Error loading games:",e),c("Error loading saved games")}},d=e=>{try{let a=localStorage.getItem("cashflow-tycoon-save-".concat(e));if(a){let e=JSON.parse(a);console.log("Loaded game state:",e),c("Game loaded successfully! (check console)"),setTimeout(()=>c(""),3e3)}}catch(e){console.error("Error loading game:",e),c("Error loading game")}},m=t=>{try{let s=e.filter(e=>e.id!==t);localStorage.setItem("cashflow-tycoon-saves",JSON.stringify(s)),localStorage.removeItem("cashflow-tycoon-save-".concat(t)),a(s),c("Game deleted successfully!"),setTimeout(()=>c(""),3e3)}catch(e){console.error("Error deleting game:",e),c("Error deleting game")}};return(0,s.jsxs)("div",{className:"p-4 max-w-md mx-auto bg-white rounded-md shadow-md",children:[(0,s.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Save/Load Game Demo"}),(0,s.jsxs)("div",{className:"mb-6 p-4 border border-gray-200 rounded-md",children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Save Current Game"}),(0,s.jsxs)("div",{className:"flex gap-2 mb-2",children:[(0,s.jsx)("input",{type:"text",value:t,onChange:e=>r(e.target.value),placeholder:"Enter save name",className:"flex-1 px-3 py-2 border border-gray-300 rounded-md"}),(0,s.jsx)("button",{onClick:()=>{let e=t.trim()||"Game ".concat(new Date().toLocaleDateString());try{let t={players:[{name:"Player 1",cash:1e3,position:0}],round:1,currentTime:new Date().toISOString()},s={id:"save-".concat(Date.now()),name:e,date:new Date().toISOString(),gameState:t},o=JSON.parse(localStorage.getItem("cashflow-tycoon-saves")||"[]");o.push(s),localStorage.setItem("cashflow-tycoon-saves",JSON.stringify(o)),localStorage.setItem("cashflow-tycoon-save-".concat(s.id),JSON.stringify(t)),a(o),r(""),c('Game "'.concat(e,'" saved successfully!')),setTimeout(()=>c(""),3e3)}catch(e){console.error("Error saving game:",e),c("Error saving game")}},className:"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",children:"Save"})]})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Saved Games"}),0===e.length?(0,s.jsx)("p",{className:"text-gray-500",children:"No saved games found"}):(0,s.jsx)("ul",{className:"space-y-2",children:e.map(e=>(0,s.jsxs)("li",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border border-gray-200 rounded-md gap-2",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"font-medium",children:e.name}),(0,s.jsx)("div",{className:"text-sm text-gray-500",children:new Date(e.date).toLocaleString()})]}),(0,s.jsxs)("div",{className:"flex gap-2 mt-2 sm:mt-0",children:[(0,s.jsx)("button",{onClick:()=>d(e.id),className:"flex-1 sm:flex-none bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm",children:"Load"}),(0,s.jsx)("button",{onClick:()=>m(e.id),className:"flex-1 sm:flex-none bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm",children:"Delete"})]})]},e.id))})]}),l&&(0,s.jsx)("div",{className:"mt-4 p-3 bg-blue-100 text-blue-700 rounded-md",children:l})]})}},9170:(e,a,t)=>{Promise.resolve().then(t.bind(t,8505))}},e=>{var a=a=>e(e.s=a);e.O(0,[441,587,358],()=>a(9170)),_N_E=e.O()}]);