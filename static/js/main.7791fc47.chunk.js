(this.webpackJsonpcraftjs=this.webpackJsonpcraftjs||[]).push([[0],{28:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"c",(function(){return setUpdateUIFunction})),__webpack_require__.d(__webpack_exports__,"b",(function(){return game})),__webpack_require__.d(__webpack_exports__,"a",(function(){return executeCode}));var _home_owner_code_craftjs_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(32);function setUpdateUIFunction(e){game.update=e}var game={settings:{tickInterval:1e3},data:{},actions:{},conditionals:{},dataSources:{},configure:function(e){console.log("game.configure not defined")},isInitialized:!1,_initialize:function(e){console.log("game.initialize not defined")},get initialize(){return this._initialize},set initialize(e){var t=this;this._initialize=function(){console.log("Initializing"),t.isInitialized=!0,e(game.data)}},tick:function(){console.log("game.tick not defined")},update:function(){console.log("game.update not defined")}},currentTimeout=null;function tick(){currentTimeout=setTimeout((function(){game.tick(),tick()}),game.settings.tickInterval)}function executeCode(){var files=localStorage.gameCode?JSON.parse(localStorage.gameCode):[],finalCode="",_iterator=Object(_home_owner_code_craftjs_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__.a)(files),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var file=_step.value;finalCode+=file.code+"\n\n"}}catch(err){_iterator.e(err)}finally{_iterator.f()}try{currentTimeout&&clearTimeout(currentTimeout),eval(finalCode),game.isInitialized||game.initialize(game.data),game.configure(game.settings),tick()}catch(err){err.message="GAME SCRIPT ERROR: "+err.message,console.error(err)}}window.game=game},566:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"Button",(function(){return Y})),n.d(a,"Card",(function(){return se})),n.d(a,"CardBottom",(function(){return ie})),n.d(a,"CardTop",(function(){return oe})),n.d(a,"Container",(function(){return de})),n.d(a,"PathContainer",(function(){return Oe})),n.d(a,"Text",(function(){return ne})),n.d(a,"VariableText",(function(){return xe})),n.d(a,"AppBar",(function(){return ke})),n.d(a,"Table",(function(){return Pe}));var r=n(2),c=n(0),o=n.n(c),i=n(14),s=n.n(i),l=n(97),u=n(98),d=n(113),j=n(111),b=n(53),p={DEBUG:1,INFO:2,WARN:3,ERROR:4},f=console,m=Object(b.a)({},console);f.logLevels=p,f.logLevel=p.INFO,f.debug=function(){if(f.logLevel<=p.DEBUG){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];m.debug.apply(m,["DEBUG"].concat(t))}},f.info=function(){if(f.logLevel<=p.INFO){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];m.info.apply(m,["INFO"].concat(t))}},f.warn=function(){if(f.logLevel<=p.WARN){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];m.warn.apply(m,["WARN"].concat(t))}},f.error=function(){if(f.logLevel<=p.ERROR){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];m.error.apply(m,["ERROR"].concat(t))}};console;var O=n(33),h=n(99),x=n.n(h),g=(n(137),n(552),n(553),n(17)),v=n(599),y={state:{drawerOpen:!1},editorQuery:null,update:function(){console.log("Update function not defined")}},_=o.a.createContext(y);window.store=y;var C=n(28),S=localStorage.gameCode?JSON.parse(localStorage.gameCode):[];function N(){var e=Object(g.g)(),t=Object(c.useState)(!1),n=Object(O.a)(t,2),a=n[0],o=n[1];function i(){localStorage.gameCode=JSON.stringify(S)}return Object(c.useContext)(_),Object(c.useEffect)((function(){var e=setInterval((function(){i()}),1e3);return function(){clearInterval(e),i(),Object(C.a)()}}),[]),0===S.length&&S.push({name:"main",code:"//main\n\n\n// You may wish to move each of the following to its own file\n\ngame.configure = (settings) => {\n  // Update any game settings here\n  // settings.tickInterval = 5000\n}\n\ngame.initialize = () => {\n  // Update any initial game data here\n}\n\ngame.tick = () => {\n  // The main function to handle game logic\n};\n\n// Define actions using game.actions ...\n// Define conditionals using game.conditionals ...\n"}),Object(r.jsxs)("div",{children:[S.map((function(t,n){var a=e.location.pathname.includes(t.name)?"contained":"text";return Object(r.jsx)(v.a,{color:"primary",variant:a,onClick:function(){e.push("/code/".concat(t.name))},children:t.name},t.name)})),Object(r.jsx)(v.a,{color:"primary",variant:"outlined",onClick:function(){var e="New File ".concat(S.length);S.push({name:e,code:"//".concat(e)}),o(!a)},children:"+ New File"}),Object(r.jsxs)(g.d,{children:[S.map((function(e){return Object(r.jsx)(g.b,{path:"/code/".concat(e.name),render:function(){return Object(r.jsx)(x.a,{mode:"javascript",theme:"monokai",onChange:function(t){e.code=t},name:"Code Editor",editorProps:{$blockScrolling:!0},style:{width:"100%",fontSize:"1em"},value:e.code,tabSize:2})}},e.name)})),Object(r.jsx)(g.b,{path:"/code",children:Object(r.jsx)(g.a,{to:"/code/".concat(S[0].name)})})]})]})}var k=n(622),w=n(85),z=n(11),I=n(633),P=n(58),F=n(54),T=n(32),D=n(602),E=n(603),A=n(604),R=n(605),U=n(606),B=function(e){var t,n=e.config,a=e.properties,c=e.setProp,o=[],i=Object(T.a)(n);try{for(i.s();!(t=i.n()).done;){var s=t.value,l=s.property,u=s.name,d=Object(F.a)(s,["property","name"]),j=a[l];o.push(Object(r.jsxs)(D.a,{children:[Object(r.jsx)(E.a,{component:"td",scope:"row",children:l}),Object(r.jsx)(E.a,{children:Object(r.jsx)(s.type,Object(b.a)({property:l,value:j,setProp:c},d))})]},u))}}catch(p){i.e(p)}finally{i.f()}return Object(r.jsx)(A.a,{children:Object(r.jsx)(R.a,{size:"small",children:Object(r.jsx)(U.a,{children:o})})})},W=n(636),L=function(e){var t=e.property,n=e.value,a=e.setProp;return Object(r.jsx)(W.a,{fullWidth:!0,value:n,onChange:function(e){a((function(n){return n[t]=e.target.value}))}})},J=n(612),H=n(634),M=function(e){var t,n=e.property,a=e.value,c=e.itemsFn,o=e.setProp,i=[],s=Object(T.a)(c());try{for(s.s();!(t=s.n()).done;){var l=t.value,u="",d=null;"string"===typeof l?(u=l,d=l):(u=l.name,d=l.value),i.push(Object(r.jsx)(J.a,{value:d,children:u}))}}catch(j){s.e(j)}finally{s.f()}return Object(r.jsx)(H.a,{fullWidth:!0,labelId:"demo-simple-select-label",id:"demo-simple-select",value:a||"",onChange:function(e){o((function(t){return t[n]=e.target.value}))},children:i})},G=n(112),q=n(613),Q=Object(q.a)((function(e){return{componentEditing:{boxShadow:"inset 0em 0em 0em 2px red",minHeight:"5px",minWidth:"5px"},componentSelected:{boxShadow:"inset 0em 0em 0em 2px green"}}}));function V(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return[].concat(Object(G.a)(a),[e?n.componentEditing:"",t?n.componentSelected:""]).join(" ")}function K(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.additionalClasses,n=void 0===t?[]:t,a=Object(z.e)((function(e){return{selected:e.events.selected}})),r=a.connectors,c=r.connect,o=r.drag,i=a.selected,s=Object(z.d)((function(e){return{enabled:e.options.enabled}})),l=s.enabled,u=Q(),d=V(l,i,u,n),j=function(e){return c(o(e))};return{refFn:j,selected:i,enabled:l,componentClassName:d}}var Y=function(e){var t=e.size,n=e.variant,a=e.color,c=e.text,o=e.onClickAction,i=e.actionContext,s=K(),l=s.refFn,u=s.componentClassName;return Object(r.jsx)(v.a,{ref:l,className:u,size:t,variant:n,color:a,onClick:function(){var e=C.b.actions[o];e&&(e(i),y.update())},children:c})};Y.craft={props:{size:"small",variant:"contained",color:"primary",text:"Click me"},related:{settings:function(){var e=Object(z.e)((function(e){return{props:e.data.props}})),t=e.actions.setProp,n=e.props;return Object(r.jsx)(B,{config:[{type:M,property:"onClickAction",itemsFn:function(){return Object.keys(C.b.actions)}},{type:L,property:"text"}],properties:n,setProp:t})}}};var $=n(609),X=n(610),Z=n(639),ee=n(105),te=n.n(ee),ne=function(e){var t=e.text,n=e.fontSize,a=K(),c=a.refFn,o=a.selected,i=a.componentClassName;return Object(r.jsx)("span",{ref:c,children:Object(r.jsx)(te.a,{disabled:!o,html:t,onChange:function(e){return null},tagName:"span",style:{fontSize:"".concat(n,"px")},className:i})})};ne.craft={props:{text:"Hi",fontSize:20},rules:{canDrag:function(e){return!0}},related:{settings:function(){var e=Object(z.e)((function(e){return{fontSize:e.data.props.fontSize}})),t=e.actions.setProp,n=e.fontSize;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)($.a,{size:"small",component:"fieldset",children:[Object(r.jsx)(X.a,{component:"legend",children:"Font size"}),Object(r.jsx)(Z.a,{value:n||7,step:7,min:1,max:50,onChange:function(e,n){t((function(e){return e.fontSize=n}))}})]})})}}};var ae=n(614),re=n(615),ce=n(616),oe=function(e){var t=e.children,n=Object(z.e)().connectors.connect;return Object(r.jsx)(ae.a,{ref:n,className:"text-only",children:t})};oe.craft={rules:{}};var ie=function(e){var t=e.children,n=Object(z.e)().connectors.connect;return Object(r.jsx)(re.a,{ref:n,children:t})};ie.craft={rules:{canMoveIn:function(e){return e.data.type===Y}}};var se=function(){var e=K(),t=e.refFn,n=e.componentClassName;return Object(r.jsxs)(ce.a,{ref:t,className:n,children:[Object(r.jsxs)(z.b,{id:"text",is:oe,canvas:!0,children:[Object(r.jsx)(ne,{text:"Title",fontSize:20}),Object(r.jsx)(ne,{text:"Subtitle",fontSize:15})]}),Object(r.jsx)(z.b,{id:"buttons",is:ie,canvas:!0,children:Object(r.jsx)(Y,{size:"small",text:"Learn more",variant:"outlined",children:"Hi!"})})]})},le=n(617),ue=n(607),de=function(e){var t=e.background,n=e.padding,a=e.children,c=K(),o=c.refFn,i=c.componentClassName;return Object(r.jsx)(le.a,{ref:o,style:{background:t,padding:n},className:i,children:a})};de.craft={props:{padding:"0px"},related:{settings:function(){var e=Object(z.e)((function(e){return{padding:e.data.props.padding}})),t=e.actions.setProp,n=e.padding;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(ue.a,{value:n,onChange:function(e){t((function(t){return t.padding=e.target.value}))}})})}}};var je=n(106),be=n.n(je),pe=n(107),fe=n.n(pe),me=Object(q.a)((function(e){return{main:{padding:"0em"}}})),Oe=function(e){var t=e.path,n=e.children,a=Object(g.g)(),o=K({additionalClasses:[me().main]}),i=o.refFn,s=o.enabled,l=o.componentClassName;Object(c.useContext)(_);var u=a.location.pathname.includes(t);return Object(r.jsxs)(le.a,{ref:i,className:l,children:[Object(r.jsx)("div",{style:{float:"right",height:"0em"},children:u?Object(r.jsx)(be.a,{}):Object(r.jsx)(fe.a,{})}),s&&Object(r.jsxs)("div",{children:[t," : ",a.location.pathname]}),u?n:null]})};Oe.craft={props:{path:"/tab1"},related:{settings:function(){var e=Object(z.e)((function(e){return{path:e.data.props.path}})),t=e.actions.setProp,n=Object(F.a)(e,["actions"]);return Object(r.jsx)(B,{config:[{type:L,property:"path"}],properties:n,setProp:t})}}};var he=function(e){var t=e.property,n=e.value,a=e.min,c=e.max,o=e.step,i=e.setProp;return Object(r.jsx)(Z.a,{value:n||7,step:o,min:a,max:c,onChange:function(e,n){i((function(e){return e[t]=n}))}})},xe=function(e){var t,n=e.dataProperty,a=e.fontSize,o=K(),i=o.refFn,s=o.componentClassName;return Object(c.useContext)(_),Object(r.jsx)("span",{ref:i,className:s,style:{fontSize:a},children:null!==(t=C.b.data[n])&&void 0!==t?t:"##NO VALUE##"})};xe.craft={props:{fontSize:20},rules:{canDrag:function(e){return!0}},related:{settings:function(){var e=Object(z.e)((function(e){return{dataProperty:e.data.props.dataProperty,fontSize:e.data.props.fontSize}})),t=e.actions.setProp,n=Object(F.a)(e,["actions"]);return Object(r.jsx)(B,{config:[{type:L,property:"dataProperty"},{type:he,property:"fontSize",min:1,max:50,step:7}],properties:n,setProp:t})}}};var ge=n(619),ve=n(620),ye=n(637),_e=n(635),Ce=n(618);function Se(e){var t=e.path,n=e.tabs,a=e.className,c=Object(z.e)().connectors.connect,o=Object(g.g)(),i=function(e,t){var n=null;for(var a in t){var r=t[a];if(r.default&&(n=r),e.match(r.path))return[parseInt(a),r]}return n?[-1,n]:[-1,null]}(t,n),s=Object(O.a)(i,2),l=s[0],u=s[1];return-1===l?(u&&o.push(u.to),null):Object(r.jsx)(_e.a,{ref:c,value:l,onChange:function(e,t){var a=n[t];o.push(a.to)},className:a,children:n.map((function(e){return Object(r.jsx)(Ce.a,{label:e.name,className:a},e.name)}))})}var Ne=Object(q.a)((function(e){return{root:{flexGrow:1},spacer:{flexGrow:1},fullHeight:Object(b.a)({},e.mixins.toolbar)}}));function ke(e){var t=e.tabs,n=Ne(),a=K({additionalClasses:[n.root]}),o=a.refFn,i=a.componentClassName,s=Object(g.g)(),l=Object(c.useState)(!0),u=Object(O.a)(l,2),d=u[0],j=u[1],b=Object(c.useContext)(_);return Object(r.jsx)("div",{ref:o,className:n.root,onClick:function(){setTimeout((function(){j(!d),b.update()}))},children:Object(r.jsx)(ge.a,{position:"static",className:i,children:Object(r.jsxs)(ve.a,{children:[Object(r.jsx)(Se,{path:s.location.pathname,tabs:t,className:n.fullHeight}),Object(r.jsx)("div",{className:n.spacer})]})})})}ke.craft={props:{tabs:[{name:"Tab 1",path:"tab1",to:"/tab1",default:!0},{name:"Tab 2",path:"tab2",to:"/tab2"},{name:"Tab 3",path:"tab3",to:"/tab3"}]},related:{settings:function(){var e=Object(z.e)((function(e){return{triggerUpdate:!!e.data.props.triggerUpdate,tabs:e.data.props.tabs}})),t=e.actions.setProp,n=e.triggerUpdate,a=e.tabs,c=function(e,a,r){return e[a]=r,t((function(e){e.triggerUpdate=!n}))};return Object(r.jsxs)("div",{children:[a.map((function(e,t){return Object(r.jsxs)("div",{children:[Object(r.jsx)(W.a,{label:"Name",value:e.name,onChange:function(t){return c(e,"name",t.target.value)}}),Object(r.jsx)(W.a,{label:"Path",value:e.path,onChange:function(t){return c(e,"path",t.target.value)}}),Object(r.jsx)(W.a,{label:"To",value:e.to,onChange:function(t){return c(e,"to",t.target.value)}}),Object(r.jsx)(ye.a,{checked:e.default||!1,onChange:function(){return function(e){var t,n=Object(T.a)(a);try{for(n.s();!(t=n.n()).done;)t.value.default=!1}catch(r){n.e(r)}finally{n.f()}c(e,"default",!0)}(e)}})]},t)})),Object(r.jsx)(v.a,{onClick:function(){return a.push({name:"New Tab",path:"",to:""}),t((function(e){return e.triggerUpdate=!n}))},children:"Add Tab"})]})}}};var we=n(621),ze=function(e){var t=e.component;return e.items.map((function(e,n){return t(e,n)}))},Ie=function(e){var t=e.items,n=e.columnNames,a=[];for(var c in t){var o,i=t[c],s=[],l=Object(T.a)(n);try{for(l.s();!(o=l.n()).done;){var u=o.value,d=u.name,j=i[u.property];switch(u.type){case"string":s.push(Object(r.jsx)(E.a,{children:j},d));break;case"textFromFunction":s.push(Object(r.jsx)(E.a,{children:j.data()},d));break;case"button":s.push(Object(r.jsx)(E.a,{children:Object(r.jsx)(Y,{text:j.text,variant:"contained",color:"primary",onClickAction:j.onClickAction,actionContext:i})},d))}}}catch(b){l.e(b)}finally{l.f()}a.push(Object(r.jsx)(D.a,{children:s},c))}return Object(r.jsx)(U.a,{children:a})},Pe=function(e){var t=e.columnNames,n=void 0===t?[]:t,a=e.itemSource,o=K(),i=o.refFn,s=o.componentClassName;Object(c.useContext)(_);var l,u=[],d=Object(T.a)(n);try{for(d.s();!(l=d.n()).done;){var j=l.value;u.push(Object(r.jsx)(E.a,{children:j.name},j.name))}}catch(f){d.e(f)}finally{d.f()}var b=C.b.dataSources[a],p=b?b():[];return Object(r.jsx)("div",{ref:i,className:s,children:Object(r.jsx)(A.a,{children:Object(r.jsxs)(R.a,{size:"small",children:[Object(r.jsx)(we.a,{children:Object(r.jsx)(D.a,{children:u})}),Object(r.jsx)(Ie,{items:p,columnNames:n})]})})})},Fe=function(e){var t=e.item,n=e.update;return Object(r.jsxs)("div",{style:{marginBottom:"1em"},children:[Object(r.jsx)(W.a,{fullWidth:!0,value:t.name,label:"Name",onChange:function(e){t.name=e.target.value,n()}}),Object(r.jsx)(W.a,{fullWidth:!0,value:t.property,label:"Property",onChange:function(e){t.property=e.target.value,n()}}),Object(r.jsx)(W.a,{fullWidth:!0,value:t.type,label:"Type",onChange:function(e){t.type=e.target.value,n()}})]})};Pe.craft={props:{columnNames:[{name:"Colum 1",property:"col1",type:"string"},{name:"Colum 2",property:"col2",type:"string"},{name:"Colum 3",property:"col3",type:"button"}],itemSource:"",updateVariable:!1},related:{settings:function(){var e=Object(z.e)((function(e){return{props:e.data.props}})),t=e.actions.setProp,n=e.props;return Object(r.jsx)(B,{config:[{type:L,property:"itemSource"},{type:ze,property:"columnNames",component:function(e,n){return Object(r.jsx)(Fe,{item:e,update:function(){t((function(e){return e.updateVarible=!e.updateVarible}))}},n)},items:n.columnNames}],properties:n,setProp:t})}}};var Te=function(){var e=Object(z.d)().connectors;return Object(r.jsx)(I.a,{px:2,py:2,children:Object(r.jsxs)(k.a,{container:!0,direction:"column",alignItems:"center",justify:"center",spacing:1,children:[Object(r.jsx)(I.a,{pb:2,children:Object(r.jsx)(P.a,{children:"Drag to add"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(Y,{text:"Click me",size:"small"}))},variant:"contained",children:"Button"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(ne,{text:"Hi world"}))},variant:"contained",children:"Text"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(z.b,{is:de,padding:20,canvas:!0}))},variant:"contained",children:"Container"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(se,{}))},variant:"contained",children:"Card"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(xe,{}))},variant:"contained",children:"Variable Text"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(ke,{}))},variant:"contained",children:"App Bar"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(z.b,{is:Oe,canvas:!0}))},variant:"contained",children:"Path Container"})}),Object(r.jsx)(k.a,{container:!0,direction:"column",item:!0,children:Object(r.jsx)(v.a,{ref:function(t){return e.create(t,Object(r.jsx)(Pe,{}))},variant:"contained",children:"Table"})})]})})},De=n(640),Ee=function(){var e=Object(z.d)((function(e,t){var n,a=e.events.selected;return a&&(n={id:a,name:e.nodes[a].data.name,settings:e.nodes[a].related&&e.nodes[a].related.settings,isDeletable:t.node(a).isDeletable()}),{selected:n}})),t=e.actions,n=e.selected;return n?Object(r.jsx)(I.a,{mt:2,px:2,py:2,children:Object(r.jsxs)(k.a,{container:!0,direction:"column",spacing:0,children:[Object(r.jsx)(k.a,{item:!0,children:Object(r.jsx)(I.a,{pb:2,children:Object(r.jsxs)(k.a,{container:!0,alignItems:"center",children:[Object(r.jsx)(k.a,{item:!0,xs:!0,children:Object(r.jsx)(P.a,{variant:"subtitle1",children:"Selected"})}),Object(r.jsx)(k.a,{item:!0,children:Object(r.jsx)(De.a,{size:"small",color:"primary",label:n.name})})]})})}),n.settings&&o.a.createElement(n.settings),n.isDeletable?Object(r.jsx)(v.a,{variant:"contained",color:"default",onClick:function(){t.delete(n.id)},children:"Delete"}):null]})}):null};function Ae(){var e=y.editorQuery;e?(console.debug("Saving layout"),localStorage.gameData=JSON.stringify({id:Math.random(),layout:e.serialize()})):console.error("store.editorQuery not set")}var Re=function(){return Object(c.useEffect)((function(){console.debug("Starting autosave");var e=setInterval((function(){Ae()}),1e4);return function(){console.debug("Stopping autosave"),clearInterval(e)}}),[]),null},Ue={};function Be(){try{var e=localStorage.gameData;return e&&(e=JSON.parse(e)),e||null}catch(t){return null}}Object.assign(Ue,a);var We=n(31);function Le(){var e=Object(z.d)().query;console.debug("Loading game data");var t=(Be()||{}).layout;return y.editorQuery=e,Object(r.jsxs)(k.a,{container:!0,children:[Object(r.jsx)(k.a,{item:!0,xs:!0,children:Object(r.jsx)(We.b,{children:Object(r.jsx)(z.c,{data:t,children:Object(r.jsx)(z.b,{is:de,padding:5,background:"#eee",canvas:!0,children:Object(r.jsx)(ne,{text:"Start dragging components in (and delete this one)"})})})})}),Object(r.jsx)(k.a,{item:!0,xs:3,children:Object(r.jsxs)(w.a,{className:void 0,children:[Object(r.jsx)(Te,{}),Object(r.jsx)(Ee,{})]})})]})}function Je(){return Object(r.jsx)("div",{children:Object(r.jsxs)(z.a,{resolver:Ue,children:[Object(r.jsx)(Re,{}),Object(r.jsx)(Le,{})]})})}function He(){var e=Object(c.useState)({}),t=Object(O.a)(e,2),n=t[0],a=t[1],o=Object(g.g)();return Object(c.useEffect)((function(){var e=Be();e||o.push("/edit"),a(e)}),[o]),Object(r.jsx)("div",{children:Object(r.jsx)(z.a,{resolver:Ue,enabled:!1,children:Object(r.jsx)(We.b,{children:Object(r.jsx)(z.c,{data:n.layout})})})})}var Me=n(631),Ge=n(632),qe=function(){var e=Object(g.g)();return Object(r.jsxs)("div",{children:[Object(r.jsx)(v.a,{onClick:function(){y.state.drawerOpen=!0,y.update()},children:"Options"}),Object(r.jsx)(v.a,{onClick:function(){e.push("/edit")},children:"Edit"}),Object(r.jsx)(v.a,{onClick:function(){e.push("/code")},children:"Code"}),Object(r.jsx)(v.a,{onClick:function(){Ae(),e.push("/play")},children:"Play"})]})},Qe=n(110),Ve=n(623),Ke=Object(Qe.a)({palette:{primary:{main:Ve.a[900]},secondary:{main:Ve.a[100]}}}),Ye=n(624),$e=n(625),Xe=n(626),Ze=n(627),et=n(628),tt=n(641),nt=n(611),at=n(569),rt=n(629),ct=n(630),ot=n(108),it=n.n(ot),st=n(109),lt=n.n(st),ut=function(e){var t=e.onClose,n={gameData:localStorage.gameData,gameCode:localStorage.gameCode},a=Object(c.useState)(btoa(JSON.stringify(n))),o=Object(O.a)(a,2),i=o[0],s=o[1];return Object(r.jsxs)(Ye.a,{open:!0,onClose:t,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(r.jsx)($e.a,{id:"alert-dialog-title",children:"Import or export game data"}),Object(r.jsxs)(Xe.a,{children:[Object(r.jsx)(Ze.a,{children:"Copy and paste the existing data somewhere to save it. Or paste in data you have and import it."}),Object(r.jsx)(W.a,{fullWidth:!0,label:"Current Game Data",multiline:!0,rows:4,value:i,onChange:function(e){s(e.target.value)},variant:"filled"})]}),Object(r.jsx)(et.a,{children:Object(r.jsx)(v.a,{onClick:function(){var e=JSON.parse(atob(i));localStorage.gameData=e.gameData,localStorage.gameCode=e.gameCode,window.location.reload()},color:"primary",children:"Import"})})]})},dt=function(){var e=Object(c.useState)(!1),t=Object(O.a)(e,2),n=t[0],a=t[1];return Object(r.jsxs)("div",{children:[Object(r.jsx)(tt.a,{open:y.state.drawerOpen,onClose:function(){y.state.drawerOpen=!1,y.update()},children:Object(r.jsxs)(nt.a,{children:[Object(r.jsxs)(at.a,{button:!0,onClick:function(){delete localStorage.gameData,delete localStorage.gameCode,window.location.reload()},children:[Object(r.jsx)(rt.a,{children:Object(r.jsx)(it.a,{})}),Object(r.jsx)(ct.a,{primary:"Reset All",secondary:"Reset all game configuration"})]}),Object(r.jsxs)(at.a,{button:!0,onClick:function(){a(!0)},children:[Object(r.jsx)(rt.a,{children:Object(r.jsx)(lt.a,{})}),Object(r.jsx)(ct.a,{primary:"Import / Export",secondary:"Import or export your game data"})]})]})}),n&&Object(r.jsx)(ut,{onClose:function(){return a(!1)}})]})},jt=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).update=function(){e.setState({})},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){y.update=this.update,Object(C.c)(y.update),Object(C.a)()}},{key:"render",value:function(){return Object(r.jsxs)(Me.a,{theme:Ke,children:[Object(r.jsx)(Ge.a,{}),Object(r.jsx)(_.Provider,{value:{state:y.state,update:this.update,editorQuery:y.editorQuery},children:Object(r.jsx)(We.a,{basename:"/idling-engine",children:Object(r.jsxs)("div",{children:[Object(r.jsx)(dt,{}),Object(r.jsx)(qe,{}),Object(r.jsxs)(g.d,{children:[Object(r.jsx)(g.b,{path:"/edit",render:function(){return Object(r.jsx)(Je,{})}}),Object(r.jsx)(g.b,{path:"/code",render:function(){return Object(r.jsx)(N,{})}}),Object(r.jsx)(g.b,{path:"/play",render:function(){return Object(r.jsx)(He,{})}}),Object(r.jsx)(g.b,{path:"/",children:Object(r.jsx)(g.a,{to:"/edit"})})]})]})})})]})}}]),n}(c.Component);s.a.render(Object(r.jsx)(jt,{}),document.getElementById("root"))}},[[566,1,2]]]);
//# sourceMappingURL=main.7791fc47.chunk.js.map