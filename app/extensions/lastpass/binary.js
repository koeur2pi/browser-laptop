function have_binary(){return have_nplastpass()||have_native_messaging()||have_ws()}function have_binary_function(a,c){return have_nplastpass(null,c)&&"function"==typeof g_nplastpass[a]?!0:have_native_messaging()&&lp_in_array(a,g_native_messaging_functions)?!0:have_ws()&&lp_in_array(a,g_ws_functions)?!0:!1}
function call_binary_function(){var a;if(0<arguments.length){for(var c=arguments[0],b=[],e=null,d=1;d<arguments.length;d++)d==arguments.length-1&&"function"==typeof arguments[d]?e=arguments[d]:b[b.length]=arguments[d];if(have_nplastpass()&&"function"==typeof g_nplastpass[c])0==b.length?a=g_nplastpass[c]():1==b.length?a=g_nplastpass[c](b[0]):2==b.length?a=g_nplastpass[c](b[0],b[1]):3==b.length?a=g_nplastpass[c](b[0],b[1],b[2]):4==b.length?a=g_nplastpass[c](b[0],b[1],b[2],b[3]):5==b.length?a=g_nplastpass[c](b[0],
b[1],b[2],b[3],b[4]):6==b.length?a=g_nplastpass[c](b[0],b[1],b[2],b[3],b[4],b[5]):lplog("too many arguments passed to call_binary_function, funcname="+c+", argslen="+b.length),e&&e(a);else if(have_native_messaging()&&lp_in_array(c,g_native_messaging_functions)){a={cmd:c,argcount:b.length};for(d=0;d<b.length;d++)a["arg"+d]=b[d];var f;"get_chrome_passwords"==c&&(f=e,e=function(a){f(JSON.parse(a))});native_messaging_send_message(a,e)}else if(lp_ws&&lp_ws.isconnected()&&lp_in_array(c,g_ws_functions)){a=
{cmd:c,argcount:b.length};for(d=0;d<b.length;d++)a["arg"+d]=b[d];"get_chrome_passwords"==c&&(f=e,e=function(a){f(JSON.parse(a))});ws_send_message(a,e)}}}function call_binary_function_if(){if(0<arguments.length)if(have_binary_function(arguments[0]))call_binary_function.apply(this,arguments);else if(1<arguments.length&&"function"==typeof arguments[arguments.length-1])arguments[arguments.length-1](!1)}
function resolveToFile(a){switch(a.scheme){case "chrome":return resolveToFile(g_chrome.Cc["@mozilla.org/chrome/chrome-registry;1"].getService(g_chrome.Ci.nsIChromeRegistry).convertChromeURL(a));case "resource":return resolveToFile(g_chrome.Cu["import"]("resource://gre/modules/Services.jsm").Services.io.newURI(g_chrome.Cu["import"]("resource://gre/modules/Services.jsm").Services.io.getProtocolHandler("resource").QueryInterface(g_chrome.Ci.nsIResProtocolHandler).resolveURI(a),null,null));case "file":return a.QueryInterface(g_chrome.Ci.nsIFileURL).file;
default:throw Error("Cannot resolve");}}var lpctypes=null,lpctypeslib=null,lpctypesabi=null,lpctypesfree=null,lpctypes_call_binary_function=null,g_native_messaging=null,g_native_messaging_loaded=!1,g_native_messaging_functions=[],g_native_messaging_version=gs("Unknown"),g_native_messaging_build_date=gs("Unknown"),g_native_messaging_build_time=gs("Unknown");
function connect_native_messaging(){try{if(g_isfirefoxsdk){if(!g_is_win&&!g_is_mac&&!g_is_linux)return;var a;g_is_win?a=-1!=g_system.architecture.indexOf("64")?"nplastpass64.dll":"nplastpass.dll":g_is_mac?a="nplastpass.bundle/Contents/MacOS/nplastpass":g_is_linux&&(a=-1!=g_system.architecture.indexOf("64")?"libnplastpass64.so":"libnplastpass.so");a=resolveToFile(g_chrome.Cu["import"]("resource://gre/modules/Services.jsm").Services.io.newURI(self.data.url(a),null,null));if(!a.exists())return;lpctypes=
g_chrome.Cu["import"]("resource://gre/modules/ctypes.jsm").ctypes;lpctypeslib=lpctypes.open(a.path);lpctypesabi=g_is_win&&-1==g_system.architecture.indexOf("64")?lpctypes.winapi_abi:lpctypes.default_abi;lpctypesfree=lpctypeslib.declare("lp_free",lpctypesabi,lpctypes.void_t,lpctypes.void_t.ptr);lpctypes_call_binary_function=function(a){try{var c=lpctypeslib.declare("call_binary_function",lpctypesabi,lpctypes["char"].ptr,lpctypes["char"].ptr)(a),d;c.isNull()?d="":(d=c.readString(),lpctypesfree(c));
return d}catch(f){return""}}}else{if("undefined"==typeof chrome)return;if("undefined"!=typeof chrome.runtime&&"undefined"!=typeof chrome.runtime.connectNative)g_native_messaging=chrome.runtime.connectNative("com.lastpass.nplastpass");else if("undefined"!=typeof chrome.extension&&"undefined"!=typeof chrome.extension.connectNative)g_native_messaging=chrome.extension.connectNative("com.lastpass.nplastpass");else return;g_native_messaging.onMessage.addListener(native_messaging_message);g_native_messaging.onDisconnect.addListener(function(){g_native_messaging_loaded=
!1;lplog("native messaging host disconnected");"undefined"!=typeof chrome.runtime.lastError&&"undefined"!=typeof chrome.runtime.lastError.message?lplog("last error: "+chrome.extension.lastError.message):"undefined"!=typeof chrome.extension.lastError&&"undefined"!=typeof chrome.extension.lastError.message&&lplog("last error: "+chrome.extension.lastError.message)})}native_messaging_send_message({cmd:"get_function_names",argcount:0},function(a){a&&(g_native_messaging_functions=a.split(","),g_native_messaging_loaded=
!0,localStorage_setItem("hadNativeMessaging","1"),setup_wlan_variables(),setup_is_chrome_portable(),!have_nplastpass()&&g_onload_started&&onLoad(!0))});native_messaging_send_message({cmd:"get_version",argcount:0},function(a){0>=CompareLastPassVersions(a,"3.0.15")?(g_native_messaging_loaded=!1,g_native_messaging.disconnect(),lplog("blocked old native messaging host version "+a)):g_native_messaging_version=a});native_messaging_send_message({cmd:"get_build_date",argcount:0},function(a){g_native_messaging_build_date=
a});native_messaging_send_message({cmd:"get_build_time",argcount:0},function(a){g_native_messaging_build_time=a})}catch(c){}}var g_native_messaging_parts=[];
function native_messaging_message(a,c,b){if("undefined"!=typeof a.id){c=b?g_ws_callbacks:g_native_messaging_callbacks;lpdbg("nativemessaging","got message, id="+a.id);b=!1;if("undefined"!=typeof a.retval)b=!0;else if("undefined"!=typeof a.parts&&"undefined"!=typeof a.part&&"undefined"!=typeof a.retvalpart){if("undefined"==typeof g_native_messaging_parts[a.id]){g_native_messaging_parts[a.id]=[];for(var e=0;e<a.parts;e++)g_native_messaging_parts[a.id][e]=null}g_native_messaging_parts[a.id][a.part]=
a.retvalpart;b=!0;for(e=0;e<a.parts;e++)if(null==g_native_messaging_parts[a.id][e]){b=!1;break}if(b){a.retval="";for(e=0;e<a.parts;e++)a.retval+=g_native_messaging_parts[a.id][e];g_native_messaging_parts[a.id]=null}}b&&"function"==typeof c[a.id]&&(b=c[a.id],c[a.id]=null,b(a.retval))}else if("undefined"!=typeof a.cmd)switch(lpdbg("nativemessaging","got message, cmd="+a.cmd),a.cmd){case "namedpipeobserverfunction":namedpipeobserverfunction(a.arg0,a.arg1,a.arg2);break;case "basicauth_save":basicauth_save(a.arg0,
a.arg1,a.arg2,a.arg3);break;case "basicauth_found":basicauth_found(a.arg0,a.arg1,a.arg2)}}function have_native_messaging(){return g_native_messaging_loaded}function have_ws(){return"undefined"!==typeof lp_ws&&lp_ws.isconnected()}var g_native_messaging_callbacks={};
function native_messaging_send_message(a,c){try{var b=(new Date).getTime()+"_"+Math.floor(100*Math.random());lpdbg("nativemessaging","sending message, cmd="+("undefined"!=typeof a.cmd?a.cmd:"undefined")+", id="+b);a.id=b;if(g_isfirefoxsdk){a.extension_url=window.location.href;var e=lpctypes_call_binary_function(JSON.stringify(a));"function"==typeof c&&c(JSON.parse(e).retval)}else g_native_messaging_callbacks[b]=c,g_native_messaging.postMessage(a)}catch(d){}}var g_ws_parts={},chunk_size=5E4;
function ws_send_part(a,c){var b=g_ws_parts[a].message,e=g_ws_parts[a].arg;b.part=c;b["arg"+b.argpart]=e.substring(c*chunk_size,(c+1)*chunk_size);g_ws_callbacks[a]=c>=b.parts-1?function(b){g_ws_parts[a].callback(b);g_ws_parts[a]=null}:function(b){ws_send_part(a,b+1)};lp_ws.send(LPJSON.stringify(b))}var g_ws_callbacks={};
function ws_send_message(a,c){try{var b=(new Date).getTime()+"_"+Math.floor(100*Math.random());a.id=b;var e=-1;if(g_ischrome)for(var d=0;d<a.argcount;d++)if("string"==typeof a["arg"+d]&&a["arg"+d].length>chunk_size){e=d;break}if(-1!=e){var f=a["arg"+e];a.cmdparts=a.cmd;delete a.cmd;a.argpart=e;a.parts=Math.ceil(f.length/chunk_size);g_ws_parts[b]={message:a,arg:f,callback:c};ws_send_part(b,0)}else g_ws_callbacks[b]=c,lp_ws.send(LPJSON.stringify(a))}catch(g){}}
function test_native_messaging(a){try{if(g_isfirefoxsdk)a(!0);else if(!g_ischrome||"undefined"==typeof chrome||"undefined"==typeof chrome.permissions||"undefined"==typeof chrome.permissions.contains)g_do_native_messaging=!1;else{var c=navigator.userAgent.match(/Chrome\/(\d+)/);c&&29>parseInt(c[1])?g_do_native_messaging=!1:!g_is_win&&!g_is_mac&&!g_is_linux?g_do_native_messaging=!1:chrome.permissions.contains({permissions:["nativeMessaging"]},a)}}catch(b){g_do_native_messaging=!1}}
function request_native_messaging(a){getBG().lpPutGblPref("native_messaging_asked","1");a?openURL(getchromeurl("native_messaging.html?hidenever=1")):"undefined"!=typeof chrome.permissions&&chrome.permissions.request({permissions:["nativeMessaging","privacy"]},function(a){a&&alert(gs("Please restart your browser to finish enabling native messaging."))})}
function native_messaging_never_ask_again(){var a=getBG();a.lpPutGblPref("native_messaging_never_ask_again","1");a.lpWriteAllPrefs();a.closecurrenttab("native_messaging.html")}var g_ask_native_messaging_from_button=!1;function open_native_messaging_html_if(){g_open_native_messaging_html&&!have_nplastpass()&&"1"!=lpGetPref("native_messaging_never_ask_again","0")&&lpGetPref("native_messaging_asked","0")}
function install_binary(a,c){g_do_native_messaging&&!a&&!g_have_native_messaging_permission&&supports_native_messaging()?request_native_messaging(c):openURL(base_url+"installer/")}var g_debug_nplastpass=!0;function debug_nplastpass(a){g_debug_nplastpass&&lpdbg("nplastpass",a)}var g_nplastpass_loaded=!1,g_nplastpass_exception=!1;
function have_nplastpass(a,c){debug_nplastpass("checking for binary component");try{g_nplastpass&&(g_nplastpass_loaded&&"undefined"==typeof g_nplastpass.alert)&&(debug_nplastpass("binary component loaded but alert function not found, resetting"),g_nplastpass=null)}catch(b){debug_nplastpass("caught exception while resetting binary component: "+b.message)}if(!g_nplastpass){if(g_nplastpass_exception&&!c)return!1;debug_nplastpass("attempting to setup binary component");for(var e=0;e<(g_issafari?2:1);e++)try{if(0==
e){if(debug_nplastpass("setting binary component global"),g_nplastpass=document.getElementById("nplastpass"),!g_nplastpass&&g_isopera&&allow_nplastpass()){var d=document.createElement("embed");d.setAttribute("id","nplastpass");d.setAttribute("type","application/x-vnd-lastpass");document.body.appendChild(d);g_nplastpass=d}}else if(g_issafari)for(var f=0;f<safari.extension.bars.length;f++)if("LPMenu"==safari.extension.bars[f].identifier){var g=safari.extension.bars[f].contentWindow.document;g.getElementById("nplastpass")&&
g.body.removeChild(g.getElementById("nplastpass"));d=g.createElement("embed");d.setAttribute("id","nplastpass");d.setAttribute("type","application/x-vnd-lastpass");d.style.visibility="hidden";g.body.appendChild(d);g_nplastpass=d;break}debug_nplastpass("type of alert is "+typeof g_nplastpass.alert);debug_nplastpass("checking for chrome portable");g_nplastpass.is_chrome_portable();debug_nplastpass("checking for wlan stuff");setup_wlan_variables();setup_is_chrome_portable();debug_nplastpass("checking for alert function");
(g_nplastpass_loaded="undefined"!=typeof g_nplastpass.alert)?debug_nplastpass("binary component is loaded"):debug_nplastpass("binary component failed to load");break}catch(j){debug_nplastpass("caught exception while setting up binary component: "+j.message),g_nplastpass=null,g_nplastpass_exception=!0}}g_debug_nplastpass=!1;try{return"undefined"!=typeof g_nplastpass.alert&&(a||-1==navigator.userAgent.indexOf("Chrome/4.1.249.1042"))}catch(h){return!1}}
function get_nplastpass_version(){return have_nplastpass()&&"function"==typeof g_nplastpass.get_version?g_nplastpass.get_version():gs("Unknown")}function get_nplastpass_build_date_time(){return have_nplastpass()&&"function"==typeof g_nplastpass.get_build_date&&"function"==typeof g_nplastpass.get_build_time?g_nplastpass.get_build_date()+" "+g_nplastpass.get_build_time():gs("Unknown")}
function close_lpctypeslib(){g_isfirefoxsdk&&lpctypeslib&&(ctypeslib=lpctypeslib,g_native_messaging_loaded=!1,lpctypeslib=lpctypesfree=null,g_is_mac||ctypeslib.close())}var lpopenssllib=null,lp_EVP_MD=null,lp_PKCS5_PBKDF2_HMAC=null,lp_EVP_sha256=null;
function lpuseopensslpbkdf2(){if("undefined"===typeof is_fennec||!is_fennec())return!1;try{lpopenssllib||(lpctypes||(lpctypes=g_chrome.Cu["import"]("resource://gre/modules/ctypes.jsm").ctypes),lpopenssllib=lpctypes.open("libcrypto.so"),lp_EVP_MD=(new lpctypes.StructType("EVP_MD")).ptr),lpopenssllib&&(lp_PKCS5_PBKDF2_HMAC||(lp_PKCS5_PBKDF2_HMAC=lpopenssllib.declare("PKCS5_PBKDF2_HMAC",lpctypes.default_abi,lpctypes["int"],lpctypes["char"].ptr,lpctypes["int"],lpctypes.unsigned_char.ptr,lpctypes["int"],
lpctypes["int"],lp_EVP_MD,lpctypes["int"],lpctypes.unsigned_char.ptr)),lp_EVP_sha256||(lp_EVP_sha256=lpopenssllib.declare("EVP_sha256",lpctypes.default_abi,lp_EVP_MD)))}catch(a){}return lpopenssllib&&lp_PKCS5_PBKDF2_HMAC&&lp_EVP_sha256}
function lpopensslpbkdf2(a,c,b,e){try{for(var d=(new lpctypes.ArrayType(lpctypes["char"]))(a.length),f=0;f<a.length;f++){var g=a.charCodeAt(f);try{d[f]=new lpctypes["char"](g)}catch(j){128<=g&&(g-=256),d[f]=new lpctypes["char"](g)}}for(var h=(new lpctypes.ArrayType(lpctypes.unsigned_char))(c.length),f=0;f<c.length;f++)h[f]=new lpctypes.unsigned_char(c.charCodeAt(f));var k=(new lpctypes.ArrayType(lpctypes.unsigned_char))(e);lp_PKCS5_PBKDF2_HMAC(d,a.length,h,c.length,b,lp_EVP_sha256(),e,k);a="";for(f=
0;f<e;f++)a+=String.fromCharCode(k[f]);return AES.bin2hex(a)}catch(l){return""}};
