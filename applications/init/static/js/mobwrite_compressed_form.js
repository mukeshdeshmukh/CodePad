(function(){var a;function diff_match_patch(){this.Diff_Timeout=1;this.Diff_EditCost=4;this.Diff_DualThreshold=32;this.Match_Threshold=0.5;this.Match_Distance=1000;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;function b(){for(var c=0,d=1,e=2;d!=e;){c++;d=e;e<<=1}return c}this.Match_MaxBits=b()}a=diff_match_patch.prototype;
a.diff_main=function(b,c,d){if(b==c)return[[0,b]];if(typeof d=="undefined")d=true;var e=d,f=this.diff_commonPrefix(b,c);d=b.substring(0,f);b=b.substring(f);c=c.substring(f);f=this.diff_commonSuffix(b,c);var h=b.substring(b.length-f);b=b.substring(0,b.length-f);c=c.substring(0,c.length-f);b=this.diff_compute(b,c,e);d&&b.unshift([0,d]);h&&b.push([0,h]);this.diff_cleanupMerge(b);return b};
a.diff_compute=function(b,c,d){var e;if(!b)return[[1,c]];if(!c)return[[-1,b]];e=b.length>c.length?b:c;var f=b.length>c.length?c:b,h=e.indexOf(f);if(h!=-1){e=[[1,e.substring(0,h)],[0,f],[1,e.substring(h+f.length)]];if(b.length>c.length)e[0][0]=e[2][0]=-1;return e}if(e=this.diff_halfMatch(b,c)){var g=e[0];b=e[1];f=e[2];c=e[3];e=e[4];g=this.diff_main(g,f,d);d=this.diff_main(b,c,d);return g.concat([[0,e]],d)}if(d&&(b.length<100||c.length<100))d=false;if(d){g=this.diff_linesToChars(b,c);b=g[0];c=g[1];
g=g[2]}(e=this.diff_map(b,c))||(e=[[-1,b],[1,c]]);if(d){this.diff_charsToLines(e,g);this.diff_cleanupSemantic(e);e.push([0,""]);c=b=d=0;for(f=g="";d<e.length;){switch(e[d][0]){case 1:c++;f+=e[d][1];break;case -1:b++;g+=e[d][1];break;case 0:if(b>=1&&c>=1){g=this.diff_main(g,f,false);e.splice(d-b-c,b+c);d=d-b-c;for(b=g.length-1;b>=0;b--)e.splice(d,0,g[b]);d+=g.length}b=c=0;f=g="";break}d++}e.pop()}return e};
a.diff_linesToChars=function(b,c){var d=[],e={};d[0]="";function f(h){for(var g="",i=0,k=-1,j=d.length;k<h.length-1;){k=h.indexOf("\n",i);if(k==-1)k=h.length-1;var m=h.substring(i,k+1);i=k+1;if(e.hasOwnProperty?e.hasOwnProperty(m):e[m]!==undefined)g+=String.fromCharCode(e[m]);else{g+=String.fromCharCode(j);e[m]=j;d[j++]=m}}return g}b=f(b);c=f(c);return[b,c,d]};a.diff_charsToLines=function(b,c){for(var d=0;d<b.length;d++){for(var e=b[d][1],f=[],h=0;h<e.length;h++)f[h]=c[e.charCodeAt(h)];b[d][1]=f.join("")}};
a.diff_map=function(b,c){var d=(new Date).getTime()+this.Diff_Timeout*1000,e=b.length,f=c.length,h=e+f-1,g=this.Diff_DualThreshold*2<h,i=[],k=[],j={},m={};j[1]=0;m[1]=0;for(var l,n,p,o={},u=false,s=!!o.hasOwnProperty,r=(e+f)%2,q=0;q<h;q++){if(this.Diff_Timeout>0&&(new Date).getTime()>d)return null;i[q]={};for(var t=-q;t<=q;t+=2){l=t==-q||t!=q&&j[t-1]<j[t+1]?j[t+1]:j[t-1]+1;n=l-t;if(g){p=l+","+n;if(r&&(s?o.hasOwnProperty(p):o[p]!==undefined))u=true;r||(o[p]=q)}for(;!u&&l<e&&n<f&&b.charAt(l)==c.charAt(n);){l++;
n++;if(g){p=l+","+n;if(r&&(s?o.hasOwnProperty(p):o[p]!==undefined))u=true;r||(o[p]=q)}}j[t]=l;i[q][l+","+n]=true;if(l==e&&n==f)return this.diff_path1(i,b,c);else if(u){k=k.slice(0,o[p]+1);d=this.diff_path1(i,b.substring(0,l),c.substring(0,n));return d.concat(this.diff_path2(k,b.substring(l),c.substring(n)))}}if(g){k[q]={};for(t=-q;t<=q;t+=2){l=t==-q||t!=q&&m[t-1]<m[t+1]?m[t+1]:m[t-1]+1;n=l-t;p=e-l+","+(f-n);if(!r&&(s?o.hasOwnProperty(p):o[p]!==undefined))u=true;if(r)o[p]=q;for(;!u&&l<e&&n<f&&b.charAt(e-
l-1)==c.charAt(f-n-1);){l++;n++;p=e-l+","+(f-n);if(!r&&(s?o.hasOwnProperty(p):o[p]!==undefined))u=true;if(r)o[p]=q}m[t]=l;k[q][l+","+n]=true;if(u){i=i.slice(0,o[p]+1);d=this.diff_path1(i,b.substring(0,e-l),c.substring(0,f-n));return d.concat(this.diff_path2(k,b.substring(e-l),c.substring(f-n)))}}}}return null};
a.diff_path1=function(b,c,d){for(var e=[],f=c.length,h=d.length,g=null,i=b.length-2;i>=0;i--)for(;1;)if(b[i].hasOwnProperty?b[i].hasOwnProperty(f-1+","+h):b[i][f-1+","+h]!==undefined){f--;if(g===-1)e[0][1]=c.charAt(f)+e[0][1];else e.unshift([-1,c.charAt(f)]);g=-1;break}else if(b[i].hasOwnProperty?b[i].hasOwnProperty(f+","+(h-1)):b[i][f+","+(h-1)]!==undefined){h--;if(g===1)e[0][1]=d.charAt(h)+e[0][1];else e.unshift([1,d.charAt(h)]);g=1;break}else{f--;h--;if(g===0)e[0][1]=c.charAt(f)+e[0][1];else e.unshift([0,
c.charAt(f)]);g=0}return e};
a.diff_path2=function(b,c,d){for(var e=[],f=0,h=c.length,g=d.length,i=null,k=b.length-2;k>=0;k--)for(;1;)if(b[k].hasOwnProperty?b[k].hasOwnProperty(h-1+","+g):b[k][h-1+","+g]!==undefined){h--;if(i===-1)e[f-1][1]+=c.charAt(c.length-h-1);else e[f++]=[-1,c.charAt(c.length-h-1)];i=-1;break}else if(b[k].hasOwnProperty?b[k].hasOwnProperty(h+","+(g-1)):b[k][h+","+(g-1)]!==undefined){g--;if(i===1)e[f-1][1]+=d.charAt(d.length-g-1);else e[f++]=[1,d.charAt(d.length-g-1)];i=1;break}else{h--;g--;if(i===0)e[f-
1][1]+=c.charAt(c.length-h-1);else e[f++]=[0,c.charAt(c.length-h-1)];i=0}return e};a.diff_commonPrefix=function(b,c){if(!b||!c||b.charCodeAt(0)!==c.charCodeAt(0))return 0;for(var d=0,e=Math.min(b.length,c.length),f=e,h=0;d<f;){if(b.substring(h,f)==c.substring(h,f))h=d=f;else e=f;f=Math.floor((e-d)/2+d)}return f};
a.diff_commonSuffix=function(b,c){if(!b||!c||b.charCodeAt(b.length-1)!==c.charCodeAt(c.length-1))return 0;for(var d=0,e=Math.min(b.length,c.length),f=e,h=0;d<f;){if(b.substring(b.length-f,b.length-h)==c.substring(c.length-f,c.length-h))h=d=f;else e=f;f=Math.floor((e-d)/2+d)}return f};
a.diff_halfMatch=function(b,c){var d=b.length>c.length?b:c,e=b.length>c.length?c:b;if(d.length<10||e.length<1)return null;var f=this;function h(i,k,j){for(var m=i.substring(j,j+Math.floor(i.length/4)),l=-1,n="",p,o,u,s;(l=k.indexOf(m,l+1))!=-1;){var r=f.diff_commonPrefix(i.substring(j),k.substring(l)),q=f.diff_commonSuffix(i.substring(0,j),k.substring(0,l));if(n.length<q+r){n=k.substring(l-q,l)+k.substring(l,l+r);p=i.substring(0,j-q);o=i.substring(j+r);u=k.substring(0,l-q);s=k.substring(l+r)}}return n.length>=
i.length/2?[p,o,u,s,n]:null}var g=h(d,e,Math.ceil(d.length/4));d=h(d,e,Math.ceil(d.length/2));if(!g&&!d)return null;else g=d?g?g[4].length>d[4].length?g:d:d:g;if(b.length>c.length){b=g[0];c=g[1];d=g[2];e=g[3]}else{d=g[0];e=g[1];b=g[2];c=g[3]}g=g[4];return[b,c,d,e,g]};
a.diff_cleanupSemantic=function(b){for(var c=false,d=[],e=0,f=null,h=0,g=0,i=0;h<b.length;){if(b[h][0]==0){d[e++]=h;g=i;i=0;f=b[h][1]}else{i+=b[h][1].length;if(f!==null&&f.length<=g&&f.length<=i){b.splice(d[e-1],0,[-1,f]);b[d[e-1]+1][0]=1;e--;e--;h=e>0?d[e-1]:-1;i=g=0;f=null;c=true}}h++}c&&this.diff_cleanupMerge(b);this.diff_cleanupSemanticLossless(b)};
a.diff_cleanupSemanticLossless=function(b){var c=/[^a-zA-Z0-9]/,d=/\s/,e=/[\r\n]/,f=/\n\r?\n$/,h=/^\r?\n\r?\n/;function g(s,r){if(!s||!r)return 5;var q=0;if(s.charAt(s.length-1).match(c)||r.charAt(0).match(c)){q++;if(s.charAt(s.length-1).match(d)||r.charAt(0).match(d)){q++;if(s.charAt(s.length-1).match(e)||r.charAt(0).match(e)){q++;if(s.match(f)||r.match(h))q++}}}return q}for(var i=1;i<b.length-1;){if(b[i-1][0]==0&&b[i+1][0]==0){var k=b[i-1][1],j=b[i][1],m=b[i+1][1],l=this.diff_commonSuffix(k,j);
if(l){var n=j.substring(j.length-l);k=k.substring(0,k.length-l);j=n+j.substring(0,j.length-l);m=n+m}l=k;n=j;for(var p=m,o=g(k,j)+g(j,m);j.charAt(0)===m.charAt(0);){k+=j.charAt(0);j=j.substring(1)+m.charAt(0);m=m.substring(1);var u=g(k,j)+g(j,m);if(u>=o){o=u;l=k;n=j;p=m}}if(b[i-1][1]!=l){if(l)b[i-1][1]=l;else{b.splice(i-1,1);i--}b[i][1]=n;if(p)b[i+1][1]=p;else{b.splice(i+1,1);i--}}}i++}};
a.diff_cleanupEfficiency=function(b){for(var c=false,d=[],e=0,f="",h=0,g=false,i=false,k=false,j=false;h<b.length;){if(b[h][0]==0){if(b[h][1].length<this.Diff_EditCost&&(k||j)){d[e++]=h;g=k;i=j;f=b[h][1]}else{e=0;f=""}k=j=false}else{if(b[h][0]==-1)j=true;else k=true;if(f&&(g&&i&&k&&j||f.length<this.Diff_EditCost/2&&g+i+k+j==3)){b.splice(d[e-1],0,[-1,f]);b[d[e-1]+1][0]=1;e--;f="";if(g&&i){k=j=true;e=0}else{e--;h=e>0?d[e-1]:-1;k=j=false}c=true}}h++}c&&this.diff_cleanupMerge(b)};
a.diff_cleanupMerge=function(b){b.push([0,""]);for(var c=0,d=0,e=0,f="",h="",g;c<b.length;)switch(b[c][0]){case 1:e++;h+=b[c][1];c++;break;case -1:d++;f+=b[c][1];c++;break;case 0:if(d!==0||e!==0){if(d!==0&&e!==0){g=this.diff_commonPrefix(h,f);if(g!==0){if(c-d-e>0&&b[c-d-e-1][0]==0)b[c-d-e-1][1]+=h.substring(0,g);else{b.splice(0,0,[0,h.substring(0,g)]);c++}h=h.substring(g);f=f.substring(g)}g=this.diff_commonSuffix(h,f);if(g!==0){b[c][1]=h.substring(h.length-g)+b[c][1];h=h.substring(0,h.length-g);f=
f.substring(0,f.length-g)}}if(d===0)b.splice(c-d-e,d+e,[1,h]);else e===0?b.splice(c-d-e,d+e,[-1,f]):b.splice(c-d-e,d+e,[-1,f],[1,h]);c=c-d-e+(d?1:0)+(e?1:0)+1}else if(c!==0&&b[c-1][0]==0){b[c-1][1]+=b[c][1];b.splice(c,1)}else c++;d=e=0;h=f="";break}b[b.length-1][1]===""&&b.pop();d=false;for(c=1;c<b.length-1;){if(b[c-1][0]==0&&b[c+1][0]==0)if(b[c][1].substring(b[c][1].length-b[c-1][1].length)==b[c-1][1]){b[c][1]=b[c-1][1]+b[c][1].substring(0,b[c][1].length-b[c-1][1].length);b[c+1][1]=b[c-1][1]+b[c+
1][1];b.splice(c-1,1);d=true}else if(b[c][1].substring(0,b[c+1][1].length)==b[c+1][1]){b[c-1][1]+=b[c+1][1];b[c][1]=b[c][1].substring(b[c+1][1].length)+b[c+1][1];b.splice(c+1,1);d=true}c++}d&&this.diff_cleanupMerge(b)};a.diff_xIndex=function(b,c){var d=0,e=0,f=0,h=0,g;for(g=0;g<b.length;g++){if(b[g][0]!==1)d+=b[g][1].length;if(b[g][0]!==-1)e+=b[g][1].length;if(d>c)break;f=d;h=e}if(b.length!=g&&b[g][0]===-1)return h;return h+(c-f)};
a.diff_prettyHtml=function(b){for(var c=[],d=0,e=0;e<b.length;e++){var f=b[e][0],h=b[e][1],g=h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"&para;<BR>");switch(f){case 1:c[e]='<INS STYLE="background:#E6FFE6;" TITLE="i='+d+'">'+g+"</INS>";break;case -1:c[e]='<DEL STYLE="background:#FFE6E6;" TITLE="i='+d+'">'+g+"</DEL>";break;case 0:c[e]='<SPAN TITLE="i='+d+'">'+g+"</SPAN>";break}if(f!==-1)d+=h.length}return c.join("")};
a.diff_text1=function(b){for(var c=[],d=0;d<b.length;d++)if(b[d][0]!==1)c[d]=b[d][1];return c.join("")};a.diff_text2=function(b){for(var c=[],d=0;d<b.length;d++)if(b[d][0]!==-1)c[d]=b[d][1];return c.join("")};a.diff_levenshtein=function(b){for(var c=0,d=0,e=0,f=0;f<b.length;f++){var h=b[f][0],g=b[f][1];switch(h){case 1:d+=g.length;break;case -1:e+=g.length;break;case 0:c+=Math.max(d,e);e=d=0;break}}c+=Math.max(d,e);return c};
a.diff_toDelta=function(b){for(var c=[],d=0;d<b.length;d++)switch(b[d][0]){case 1:c[d]="+"+encodeURI(b[d][1]);break;case -1:c[d]="-"+b[d][1].length;break;case 0:c[d]="="+b[d][1].length;break}return c.join("\t").replace(/\x00/g,"%00").replace(/%20/g," ")};
a.diff_fromDelta=function(b,c){var d=[],e=0,f=0;c=c.replace(/%00/g,"\u0000");c=c.split(/\t/g);for(var h=0;h<c.length;h++){var g=c[h].substring(1);switch(c[h].charAt(0)){case "+":try{d[e++]=[1,decodeURI(g)]}catch(i){throw new Error("Illegal escape in diff_fromDelta: "+g);}break;case "-":case "=":var k=parseInt(g,10);if(isNaN(k)||k<0)throw new Error("Invalid number in diff_fromDelta: "+g);g=b.substring(f,f+=k);if(c[h].charAt(0)=="=")d[e++]=[0,g];else d[e++]=[-1,g];break;default:if(c[h])throw new Error("Invalid diff operation in diff_fromDelta: "+
c[h]);}}if(f!=b.length)throw new Error("Delta length ("+f+") does not equal source text length ("+b.length+").");return d};a.match_main=function(b,c,d){d=Math.max(0,Math.min(d,b.length));return b==c?0:b.length?b.substring(d,d+c.length)==c?d:this.match_bitap(b,c,d):-1};
a.match_bitap=function(b,c,d){if(c.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var e=this.match_alphabet(c),f=this;function h(s,r){s=s/c.length;r=Math.abs(d-r);if(!f.Match_Distance)return r?1:s;return s+r/f.Match_Distance}var g=this.Match_Threshold,i=b.indexOf(c,d);if(i!=-1)g=Math.min(h(0,i),g);i=b.lastIndexOf(c,d+c.length);if(i!=-1)g=Math.min(h(0,i),g);var k=1<<c.length-1;i=-1;for(var j,m,l=c.length+b.length,n,p=0;p<c.length;p++){j=0;for(m=l;j<m;){if(h(p,d+m)<=
g)j=m;else l=m;m=Math.floor((l-j)/2+j)}l=m;j=Math.max(1,d-m+1);var o=Math.min(d+m,b.length)+c.length;m=Array(o+2);m[o+1]=(1<<p)-1;for(o=o;o>=j;o--){var u=e[b.charAt(o-1)];m[o]=p===0?(m[o+1]<<1|1)&u:(m[o+1]<<1|1)&u|(n[o+1]|n[o])<<1|1|n[o+1];if(m[o]&k){u=h(p,o-1);if(u<=g){g=u;i=o-1;if(i>d)j=Math.max(1,2*d-i);else break}}}if(h(p+1,d)>g)break;n=m}return i};a.match_alphabet=function(b){for(var c={},d=0;d<b.length;d++)c[b.charAt(d)]=0;for(d=0;d<b.length;d++)c[b.charAt(d)]|=1<<b.length-d-1;return c};
a.patch_addContext=function(b,c){for(var d=c.substring(b.start2,b.start2+b.length1),e=0;c.indexOf(d)!=c.lastIndexOf(d)&&d.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;){e+=this.Patch_Margin;d=c.substring(b.start2-e,b.start2+b.length1+e)}e+=this.Patch_Margin;(d=c.substring(b.start2-e,b.start2))&&b.diffs.unshift([0,d]);(c=c.substring(b.start2+b.length1,b.start2+b.length1+e))&&b.diffs.push([0,c]);b.start1-=d.length;b.start2-=d.length;b.length1+=d.length+c.length;b.length2+=d.length+
c.length};
a.patch_make=function(b,c,d){var e;if(typeof b=="string"&&typeof c=="string"&&typeof d=="undefined"){e=b;c=this.diff_main(e,c,true);if(c.length>2){this.diff_cleanupSemantic(c);this.diff_cleanupEfficiency(c)}}else if(typeof b=="object"&&typeof c=="undefined"&&typeof d=="undefined"){c=b;e=this.diff_text1(c)}else if(typeof b=="string"&&typeof c=="object"&&typeof d=="undefined"){e=b;c=c}else if(typeof b=="string"&&typeof c=="string"&&typeof d=="object"){e=b;c=d}else throw new Error("Unknown call format to patch_make.");if(c.length===
0)return[];d=[];b=new patch_obj;var f=0,h=0,g=0,i=e;e=e;for(var k=0;k<c.length;k++){var j=c[k][0],m=c[k][1];if(!f&&j!==0){b.start1=h;b.start2=g}switch(j){case 1:b.diffs[f++]=c[k];b.length2+=m.length;e=e.substring(0,g)+m+e.substring(g);break;case -1:b.length1+=m.length;b.diffs[f++]=c[k];e=e.substring(0,g)+e.substring(g+m.length);break;case 0:if(m.length<=2*this.Patch_Margin&&f&&c.length!=k+1){b.diffs[f++]=c[k];b.length1+=m.length;b.length2+=m.length}else if(m.length>=2*this.Patch_Margin)if(f){this.patch_addContext(b,
i);d.push(b);b=new patch_obj;f=0;i=e;h=g}break}if(j!==1)h+=m.length;if(j!==-1)g+=m.length}if(f){this.patch_addContext(b,i);d.push(b)}return d};a.patch_deepCopy=function(b){for(var c=[],d=0;d<b.length;d++){var e=b[d],f=new patch_obj;f.diffs=[];for(var h=0;h<e.diffs.length;h++)f.diffs[h]=e.diffs[h].slice();f.start1=e.start1;f.start2=e.start2;f.length1=e.length1;f.length2=e.length2;c[d]=f}return c};
a.patch_apply=function(b,c){if(b.length==0)return[c,[]];b=this.patch_deepCopy(b);var d=this.patch_addPadding(b);c=d+c+d;this.patch_splitMax(b);for(var e=0,f=[],h=0;h<b.length;h++){var g=b[h].start2+e,i=this.diff_text1(b[h].diffs),k,j=-1;if(i.length>this.Match_MaxBits){k=this.match_main(c,i.substring(0,this.Match_MaxBits),g);if(k!=-1){j=this.match_main(c,i.substring(i.length-this.Match_MaxBits),g+i.length-this.Match_MaxBits);if(j==-1||k>=j)k=-1}}else k=this.match_main(c,i,g);if(k==-1){f[h]=false;e-=
b[h].length2-b[h].length1}else{f[h]=true;e=k-g;g=j==-1?c.substring(k,k+i.length):c.substring(k,j+this.Match_MaxBits);if(i==g)c=c.substring(0,k)+this.diff_text2(b[h].diffs)+c.substring(k+i.length);else{g=this.diff_main(i,g,false);if(i.length>this.Match_MaxBits&&this.diff_levenshtein(g)/i.length>this.Patch_DeleteThreshold)f[h]=false;else{this.diff_cleanupSemanticLossless(g);i=0;var m;for(j=0;j<b[h].diffs.length;j++){var l=b[h].diffs[j];if(l[0]!==0)m=this.diff_xIndex(g,i);if(l[0]===1)c=c.substring(0,
k+m)+l[1]+c.substring(k+m);else if(l[0]===-1)c=c.substring(0,k+m)+c.substring(k+this.diff_xIndex(g,i+l[1].length));if(l[0]!==-1)i+=l[1].length}}}}}c=c.substring(d.length,c.length-d.length);return[c,f]};
a.patch_addPadding=function(b){for(var c=this.Patch_Margin,d="",e=1;e<=c;e++)d+=String.fromCharCode(e);for(e=0;e<b.length;e++){b[e].start1+=c;b[e].start2+=c}e=b[0];var f=e.diffs;if(f.length==0||f[0][0]!=0){f.unshift([0,d]);e.start1-=c;e.start2-=c;e.length1+=c;e.length2+=c}else if(c>f[0][1].length){var h=c-f[0][1].length;f[0][1]=d.substring(f[0][1].length)+f[0][1];e.start1-=h;e.start2-=h;e.length1+=h;e.length2+=h}e=b[b.length-1];f=e.diffs;if(f.length==0||f[f.length-1][0]!=0){f.push([0,d]);e.length1+=
c;e.length2+=c}else if(c>f[f.length-1][1].length){h=c-f[f.length-1][1].length;f[f.length-1][1]+=d.substring(0,h);e.length1+=h;e.length2+=h}return d};
a.patch_splitMax=function(b){for(var c=0;c<b.length;c++)if(b[c].length1>this.Match_MaxBits){var d=b[c];b.splice(c--,1);for(var e=this.Match_MaxBits,f=d.start1,h=d.start2,g="";d.diffs.length!==0;){var i=new patch_obj,k=true;i.start1=f-g.length;i.start2=h-g.length;if(g!==""){i.length1=i.length2=g.length;i.diffs.push([0,g])}for(;d.diffs.length!==0&&i.length1<e-this.Patch_Margin;){g=d.diffs[0][0];var j=d.diffs[0][1];if(g===1){i.length2+=j.length;h+=j.length;i.diffs.push(d.diffs.shift());k=false}else if(g===
-1&&i.diffs.length==1&&i.diffs[0][0]==0&&j.length>2*e){i.length1+=j.length;f+=j.length;k=false;i.diffs.push([g,j]);d.diffs.shift()}else{j=j.substring(0,e-i.length1-this.Patch_Margin);i.length1+=j.length;f+=j.length;if(g===0){i.length2+=j.length;h+=j.length}else k=false;i.diffs.push([g,j]);if(j==d.diffs[0][1])d.diffs.shift();else d.diffs[0][1]=d.diffs[0][1].substring(j.length)}}g=this.diff_text2(i.diffs);g=g.substring(g.length-this.Patch_Margin);j=this.diff_text1(d.diffs).substring(0,this.Patch_Margin);
if(j!==""){i.length1+=j.length;i.length2+=j.length;if(i.diffs.length!==0&&i.diffs[i.diffs.length-1][0]===0)i.diffs[i.diffs.length-1][1]+=j;else i.diffs.push([0,j])}k||b.splice(++c,0,i)}}};a.patch_toText=function(b){for(var c=[],d=0;d<b.length;d++)c[d]=b[d];return c.join("")};
a.patch_fromText=function(b){var c=[];if(!b)return c;b=b.replace(/%00/g,"\u0000");b=b.split("\n");for(var d=0;d<b.length;){var e=b[d].match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/);if(!e)throw new Error("Invalid patch string: "+b[d]);var f=new patch_obj;c.push(f);f.start1=parseInt(e[1],10);if(e[2]===""){f.start1--;f.length1=1}else if(e[2]=="0")f.length1=0;else{f.start1--;f.length1=parseInt(e[2],10)}f.start2=parseInt(e[3],10);if(e[4]===""){f.start2--;f.length2=1}else if(e[4]=="0")f.length2=0;else{f.start2--;
f.length2=parseInt(e[4],10)}for(d++;d<b.length;){e=b[d].charAt(0);try{var h=decodeURI(b[d].substring(1))}catch(g){throw new Error("Illegal escape in patch_fromText: "+h);}if(e=="-")f.diffs.push([-1,h]);else if(e=="+")f.diffs.push([1,h]);else if(e==" ")f.diffs.push([0,h]);else if(e=="@")break;else if(e!=="")throw new Error('Invalid patch mode "'+e+'" in: '+h);d++}}return c};function patch_obj(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0}
patch_obj.prototype.toString=function(){var b,c;b=this.length1===0?this.start1+",0":this.length1==1?this.start1+1:this.start1+1+","+this.length1;c=this.length2===0?this.start2+",0":this.length2==1?this.start2+1:this.start2+1+","+this.length2;b=["@@ -"+b+" +"+c+" @@\n"];var d;for(c=0;c<this.diffs.length;c++){switch(this.diffs[c][0]){case 1:d="+";break;case -1:d="-";break;case 0:d=" ";break}b[c+1]=d+encodeURI(this.diffs[c][1])+"\n"}return b.join("").replace(/\x00/g,"%00").replace(/%20/g," ")};
window.diff_match_patch=diff_match_patch;window.patch_obj=patch_obj;window.DIFF_DELETE=-1;window.DIFF_INSERT=1;window.DIFF_EQUAL=0;var mobwrite={};mobwrite.syncGateway="/scripts/q.py";mobwrite.get_maxchars=1000;mobwrite.debug=false;if(!("console"in window)||!("info"in window.console)||!("warn"in window.console)||!("error"in window.console))mobwrite.debug=false;
mobwrite.sniffUserAgent=function(){if(window.opera)mobwrite.UA_opera=true;else{var b=navigator.userAgent.toLowerCase();mobwrite.UA_webkit=b.indexOf("webkit")!=-1;if(!mobwrite.UA_webkit){mobwrite.UA_gecko=b.indexOf("gecko")!=-1;if(!mobwrite.UA_gecko)mobwrite.UA_msie=b.indexOf("msie")!=-1}}};mobwrite.UA_gecko=false;mobwrite.UA_opera=false;mobwrite.UA_msie=false;mobwrite.UA_webkit=false;mobwrite.sniffUserAgent();mobwrite.syncRunPid_=null;mobwrite.syncKillPid_=null;mobwrite.timeoutInterval=30000;
mobwrite.minSyncInterval=1000;mobwrite.maxSyncInterval=10000;mobwrite.syncInterval=2000;mobwrite.idPrefix="";mobwrite.nullifyAll=false;mobwrite.clientChange_=false;mobwrite.serverChange_=false;mobwrite.syncAjaxObj_=null;mobwrite.uniqueId=function(){var b="abcdefghijklmnopqrstuvwxyz",c=b.charAt(Math.random()*b.length);b+="0123456789-_:.";for(var d=1;d<8;d++)c+=b.charAt(Math.random()*b.length);if(c.indexOf("--")!=-1)c=mobwrite.uniqueId();return c};mobwrite.syncUsername=mobwrite.uniqueId();
mobwrite.shared={};mobwrite.shareHandlers=[];mobwrite.shareObj=function(b){if(b){this.file=b;this.dmp=new diff_match_patch;this.dmp.Diff_Timeout=0.5;this.editStack=[];mobwrite.debug&&window.console.info('Creating shareObj: "'+b+'"')}};a=mobwrite.shareObj.prototype;a.shadowText="";a.clientVersion=0;a.serverVersion=0;a.deltaOk=false;a.mergeChanges=true;a.getClientText=function(){window.alert("Defined by subclass");return""};a.setClientText=function(){window.alert("Defined by subclass")};
a.patchClientText=function(b){var c=this.getClientText();b=this.dmp.patch_apply(b,c);c!=b[0]&&this.setClientText(b[0])};a.onSentDiff=function(){};a.fireChange=function(b){if("createEvent"in document){var c=document.createEvent("HTMLEvents");c.initEvent("change",false,false);b.dispatchEvent(c)}else"fireEvent"in b&&b.fireEvent("onchange")};a.nullify=function(){mobwrite.unshare(this.file);return"N:"+mobwrite.idPrefix+this.file+"\n"};
a.syncText=function(){var b=this.getClientText();if(this.deltaOk){var c=this.dmp.diff_main(this.shadowText,b,true);if(c.length>2){this.dmp.diff_cleanupSemantic(c);this.dmp.diff_cleanupEfficiency(c)}var d=c.length!=1||c[0][0]!=0;if(d){mobwrite.clientChange_=true;this.shadowText=b}if(d||!this.editStack.length){b=(this.mergeChanges?"d:":"D:")+this.clientVersion+":"+this.dmp.diff_toDelta(c);this.editStack.push([this.clientVersion,b]);this.clientVersion++;this.onSentDiff(c)}}else{if(this.shadowText!=b)this.shadowText=
b;this.clientVersion++;b="r:"+this.clientVersion+":"+encodeURI(b).replace(/%20/g," ");this.editStack.push([this.clientVersion,b]);this.deltaOk=true}c="F:"+this.serverVersion+":"+mobwrite.idPrefix+this.file+"\n";for(b=0;b<this.editStack.length;b++)c+=this.editStack[b][1]+"\n";return c.replace(/\x00/g,"%00")};
mobwrite.syncRun1_=function(){mobwrite.clientChange_=false;var b=[];b[0]="u:"+mobwrite.syncUsername+"\n";var c=true;for(var d in mobwrite.shared)if(mobwrite.shared.hasOwnProperty(d)){mobwrite.nullifyAll?b.push(mobwrite.shared[d].nullify()):b.push(mobwrite.shared[d].syncText());c=false}if(c)mobwrite.debug&&window.console.info("MobWrite task stopped.");else if(b.length==1){mobwrite.debug&&window.console.info("All objects silent; null sync.");mobwrite.syncRun2_("\n\n")}else{d=mobwrite.syncGateway.indexOf("://")!=
-1;mobwrite.debug&&window.console.info("TO server:\n"+b.join(""));b.push("\n");b=b.join("");mobwrite.syncKillPid_=window.setTimeout(mobwrite.syncKill_,mobwrite.timeoutInterval);if(d){b=mobwrite.splitBlocks_(b);c=document.getElementsByTagName("head")[0];for(d=0;d<b.length;d++){var e=document.getElementById("mobwrite_sync"+d);if(e){e.parentNode.removeChild(e);if(!mobwrite.UA_msie){for(var f in e)delete e[f];e=null}}if(!e){e=document.createElement("script");e.type="text/javascript";e.charset="utf-8";
e.id="mobwrite_sync"+d}e.src=b[d];c.appendChild(e)}}else{b="q="+encodeURIComponent(b);mobwrite.syncAjaxObj_=mobwrite.syncLoadAjax_(mobwrite.syncGateway,b,mobwrite.syncCheckAjax_)}}};
mobwrite.splitBlocks_=function(b,c){var d=encodeURIComponent(b),e=mobwrite.syncGateway+"?p=",f=mobwrite.get_maxchars-e.length,h=d.replace(/%20/g,"+");if(h.length<=f)return[e+h];h=1;if(typeof c!="undefined")h=String(c).length;f=[];d=encodeURIComponent(d);var g=mobwrite.uniqueId();h=(e+"b%3A"+g+"+++%0A%0A").length+2*h;h=mobwrite.get_maxchars-h;if(h<3){mobwrite.debug&&window.console.error("mobwrite.get_maxchars too small to send data.");h=3}var i=Math.ceil(d.length/h);if(typeof c!="undefined")i=Math.max(i,
c);c="b%3A"+g+"+"+encodeURIComponent(i)+"+";var k=0;for(g=1;g<=i;g++){var j=k+h;if(d.charAt(j-1)=="%")j-=1;else if(d.charAt(j-2)=="%")j-=2;k=d.substring(k,j);f.push(e+c+g+"+"+k+"%0A%0A");k=j}if(k<d.length){mobwrite.debug&&window.console.debug("Recursing splitBlocks_ at n="+(i+1));return this.splitBlocks_(b,i+1)}return f};mobwrite.callback=function(b){if(b)mobwrite.syncRun2_(b+"\n");else{window.clearTimeout(mobwrite.syncKillPid_);mobwrite.syncKillPid_=window.setTimeout(mobwrite.syncKill_,mobwrite.timeoutInterval)}};
mobwrite.syncRun2_=function(b){mobwrite.serverChange_=false;mobwrite.debug&&window.console.info("FROM server:\n"+b);b=b.replace(/%00/g,"\u0000");if(b.length<2||b.substring(b.length-2)!="\n\n"){b="";mobwrite.error&&window.console.info("Truncated data.  Abort.")}b=b.split("\n");for(var c=null,d=null,e=0;e<b.length;e++){var f=b[e];if(!f)break;if(f.charAt(1)!=":")mobwrite.debug&&window.console.error("Unparsable line: "+f);else{var h=f.charAt(0),g=f.substring(2),i;if("FfDdRr".indexOf(h)!=-1){var k=g.indexOf(":");
if(k<1){mobwrite.debug&&window.console.error("No version number: "+f);continue}i=parseInt(g.substring(0,k),10);if(isNaN(i)){mobwrite.debug&&window.console.error("NaN version number: "+f);continue}g=g.substring(k+1)}if(h=="F"||h=="f")if(g.substring(0,mobwrite.idPrefix.length)==mobwrite.idPrefix){g=g.substring(mobwrite.idPrefix.length);if(mobwrite.shared.hasOwnProperty(g)){c=mobwrite.shared[g];c.deltaOk=true;d=i;for(f=0;f<c.editStack.length;f++)if(c.editStack[f][0]<=d){c.editStack.splice(f,1);f--}}else{c=
null;mobwrite.debug&&window.console.error("Unknown file: "+g)}}else{c=null;mobwrite.debug&&window.console.error('File does not have "'+mobwrite.idPrefix+'" prefix: '+g)}else if(h=="R"||h=="r"){if(c){c.shadowText=decodeURI(g);c.clientVersion=d;c.serverVersion=i;c.editStack=[];h=="R"&&c.setClientText(c.shadowText);mobwrite.serverChange_=true}}else if(h=="D"||h=="d")if(c)if(d!=c.clientVersion){c.deltaOk=false;mobwrite.debug&&window.console.error("Client version number mismatch.\nExpected: "+c.clientVersion+
" Got: "+d)}else if(i>c.serverVersion){c.deltaOk=false;mobwrite.debug&&window.console.error("Server version in future.\nExpected: "+c.serverVersion+" Got: "+i)}else if(i<c.serverVersion)mobwrite.debug&&window.console.warn("Server version in past.\nExpected: "+c.serverVersion+" Got: "+i);else{var j;try{j=c.dmp.diff_fromDelta(c.shadowText,g);c.serverVersion++}catch(m){j=null;c.deltaOk=false;mobwrite.syncInterval=0;mobwrite.debug&&window.console.error("Delta mismatch.\n"+encodeURI(c.shadowText))}if(j&&
(j.length!=1||j[0][0]!=0)){if(h=="D"){c.shadowText=c.dmp.diff_text2(j);c.setClientText(c.shadowText)}else{f=c.dmp.patch_make(c.shadowText,j);h=c.dmp.patch_apply(f,c.shadowText);c.shadowText=h[0];c.patchClientText(f)}mobwrite.serverChange_=true}}}}mobwrite.computeSyncInterval_();window.clearTimeout(mobwrite.syncRunPid_);mobwrite.syncRunPid_=window.setTimeout(mobwrite.syncRun1_,mobwrite.syncInterval);window.clearTimeout(mobwrite.syncKillPid_);mobwrite.syncKillPid_=null};
mobwrite.computeSyncInterval_=function(){var b=mobwrite.maxSyncInterval-mobwrite.minSyncInterval;if(mobwrite.clientChange_)mobwrite.syncInterval-=b*0.4;if(mobwrite.serverChange_)mobwrite.syncInterval-=b*0.2;if(!mobwrite.clientChange_&&!mobwrite.serverChange_)mobwrite.syncInterval+=b*0.1;mobwrite.syncInterval=Math.max(mobwrite.minSyncInterval,mobwrite.syncInterval);mobwrite.syncInterval=Math.min(mobwrite.maxSyncInterval,mobwrite.syncInterval)};
mobwrite.syncKill_=function(){mobwrite.syncKillPid_=null;if(mobwrite.syncAjaxObj_){mobwrite.syncAjaxObj_.abort();mobwrite.syncAjaxObj_=null}mobwrite.debug&&window.console.warn("Connection timeout.");window.clearTimeout(mobwrite.syncRunPid_);mobwrite.syncRunPid_=window.setTimeout(mobwrite.syncRun1_,1)};
mobwrite.syncLoadAjax_=function(b,c,d){var e=null;if(window.XMLHttpRequest)try{e=new XMLHttpRequest}catch(f){e=null}else if(window.ActiveXObject)try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(h){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(g){e=null}}if(e){e.onreadystatechange=d;e.open("POST",b,true);e.setRequestHeader("Content-Type","application/x-www-form-urlencoded");e.send(c)}return e};
mobwrite.syncCheckAjax_=function(){if(!(typeof mobwrite=="undefined"||!mobwrite.syncAjaxObj_))if(mobwrite.syncAjaxObj_.readyState==4)if(mobwrite.syncAjaxObj_.status==200){var b=mobwrite.syncAjaxObj_.responseText;mobwrite.syncAjaxObj_=null;mobwrite.syncRun2_(b)}else{mobwrite.debug&&window.console.warn("Connection error code: "+mobwrite.syncAjaxObj_.status);mobwrite.syncAjaxObj_=null}};mobwrite.unload_=function(){if(!mobwrite.syncKillPid_){mobwrite.debug=false;mobwrite.syncRun1_()}};
if(window.addEventListener)window.addEventListener("unload",mobwrite.unload_,false);else window.attachEvent&&window.attachEvent("onunload",mobwrite.unload_);
mobwrite.share=function(){for(var b=0;b<arguments.length;b++){for(var c=arguments[b],d=null,e=0;e<mobwrite.shareHandlers.length&&!d;e++)d=mobwrite.shareHandlers[e].call(mobwrite,c);if(d&&d.file)if(d.file.match(/^[A-Za-z][-.:\w]*$/))if(d.file in mobwrite.shared)mobwrite.debug&&window.console.warn('Ignoring duplicate share on "'+c+'".');else{mobwrite.shared[d.file]=d;if(mobwrite.syncRunPid_===null)mobwrite.debug&&window.console.info("MobWrite task started.");else window.clearTimeout(mobwrite.syncRunPid_);
mobwrite.syncRunPid_=window.setTimeout(mobwrite.syncRun1_,10)}else mobwrite.debug&&window.console.error('Illegal id "'+d.file+'".');else mobwrite.debug&&window.console.warn("Share: Unknown widget type: "+c+".")}};
mobwrite.unshare=function(){for(var b=0;b<arguments.length;b++){var c=arguments[b];if(typeof c=="string"&&mobwrite.shared.hasOwnProperty(c)){delete mobwrite.shared[c];mobwrite.debug&&window.console.info("Unshared: "+c)}else{for(var d=null,e=0;e<mobwrite.shareHandlers.length&&!d;e++)d=mobwrite.shareHandlers[e].call(mobwrite,c);if(d&&d.file)if(mobwrite.shared.hasOwnProperty(d.file)){delete mobwrite.shared[d.file];mobwrite.debug&&window.console.info("Unshared: "+c)}else mobwrite.debug&&window.console.warn("Ignoring "+
c+". Not currently shared.");else mobwrite.debug&&window.console.warn("Unshare: Unknown widget type: "+c+".")}}};window.mobwrite=mobwrite;mobwrite.validNode_=function(b){for(;b.parentNode;)b=b.parentNode;return b.nodeType==9};mobwrite.shareHandlerForm=function(b){if(typeof b=="string")b=document.getElementById(b)||document.forms[b];if(b&&"tagName"in b&&b.tagName=="FORM")for(var c=0,d;d=b.elements[c];c++)mobwrite.share(d);return null};mobwrite.shareHandlers.push(mobwrite.shareHandlerForm);mobwrite.shareHiddenObj=function(b){mobwrite.shareObj.apply(this,[b.id]);this.element=b};mobwrite.shareHiddenObj.prototype=new mobwrite.shareObj("");
mobwrite.shareHiddenObj.prototype.getClientText=function(){mobwrite.validNode_(this.element)||mobwrite.unshare(this.file);this.mergeChanges=!this.element.value.match(/^\s*-?[\d.]+\s*$/);return this.element.value};mobwrite.shareHiddenObj.prototype.setClientText=function(b){this.element.value=b};mobwrite.shareHiddenObj.shareHandler=function(b){if(typeof b=="string")b=document.getElementById(b);if(b&&"type"in b&&b.type=="hidden")return new mobwrite.shareHiddenObj(b);return null};mobwrite.shareHandlers.push(mobwrite.shareHiddenObj.shareHandler);
mobwrite.shareCheckboxObj=function(b){mobwrite.shareObj.apply(this,[b.id]);this.element=b;this.mergeChanges=false};mobwrite.shareCheckboxObj.prototype=new mobwrite.shareObj("");mobwrite.shareCheckboxObj.prototype.getClientText=function(){mobwrite.validNode_(this.element)||mobwrite.unshare(this.file);return this.element.checked?this.element.value:""};mobwrite.shareCheckboxObj.prototype.setClientText=function(b){var c=this.element.value||"on";this.element.checked=b==c;this.fireChange(this.element)};
mobwrite.shareCheckboxObj.shareHandler=function(b){if(typeof b=="string")b=document.getElementById(b);if(b&&"type"in b&&b.type=="checkbox")return new mobwrite.shareCheckboxObj(b);return null};mobwrite.shareHandlers.push(mobwrite.shareCheckboxObj.shareHandler);mobwrite.shareSelectObj=function(b){mobwrite.shareObj.apply(this,[b.id]);this.element=b;this.mergeChanges=b.type=="select-multiple"};mobwrite.shareSelectObj.prototype=new mobwrite.shareObj("");
mobwrite.shareSelectObj.prototype.getClientText=function(){mobwrite.validNode_(this.element)||mobwrite.unshare(this.file);for(var b=[],c=0,d;d=this.element.options[c];c++)d.selected&&b.push(d.value);return b.join("\u0000")};mobwrite.shareSelectObj.prototype.setClientText=function(b){b="\u0000"+b+"\u0000";for(var c=0,d;d=this.element.options[c];c++)d.selected=b.indexOf("\u0000"+d.value+"\u0000")!=-1;this.fireChange(this.element)};
mobwrite.shareSelectObj.shareHandler=function(b){if(typeof b=="string")b=document.getElementById(b);if(b&&"type"in b&&(b.type=="select-one"||b.type=="select-multiple"))return new mobwrite.shareSelectObj(b);return null};mobwrite.shareHandlers.push(mobwrite.shareSelectObj.shareHandler);mobwrite.shareRadioObj=function(b){mobwrite.shareObj.apply(this,[b.id]);this.elements=[b];this.form=b.form;this.name=b.name;this.mergeChanges=false};mobwrite.shareRadioObj.prototype=new mobwrite.shareObj("");
mobwrite.shareRadioObj.prototype.getClientText=function(){mobwrite.validNode_(this.elements[0])||mobwrite.unshare(this.file);for(var b=0;b<this.elements.length;b++)if(this.elements[b].checked)return this.elements[b].value;return""};mobwrite.shareRadioObj.prototype.setClientText=function(b){for(var c=0;c<this.elements.length;c++){this.elements[c].checked=b==this.elements[c].value;this.fireChange(this.elements[c])}};
mobwrite.shareRadioObj.shareHandler=function(b){if(typeof b=="string")b=document.getElementById(b);if(b&&"type"in b&&b.type=="radio"){for(var c in mobwrite.shared)if(mobwrite.shared[c].form==b.form&&mobwrite.shared[c].name==b.name){mobwrite.shared[c].elements.push(b);return null}return new mobwrite.shareRadioObj(b)}return null};mobwrite.shareHandlers.push(mobwrite.shareRadioObj.shareHandler);
mobwrite.shareTextareaObj=function(b){mobwrite.shareObj.apply(this,[b.id]);this.element=b;if(b.type=="password")this.mergeChanges=false};mobwrite.shareTextareaObj.prototype=new mobwrite.shareObj("");a=mobwrite.shareTextareaObj.prototype;a.getClientText=function(){mobwrite.validNode_(this.element)||mobwrite.unshare(this.file);var b=mobwrite.shareTextareaObj.normalizeLinebreaks_(this.element.value);if(this.element.type=="text")this.mergeChanges=!b.match(/^\s*-?[\d.,]+\s*$/);return b};
a.setClientText=function(b){this.element.value=b;this.fireChange(this.element)};a.patchClientText=function(b){this.dmp.Match_Distance=1000;this.dmp.Match_Threshold=0.6;var c=this.getClientText(),d=this.captureCursor_(),e=[];if(d){e[0]=d.startOffset;if("endOffset"in d)e[1]=d.endOffset}b=this.patch_apply_(b,c,e);if(c!=b){this.setClientText(b);if(d){d.startOffset=e[0];if(e.length>1){d.endOffset=e[1];if(d.startOffset>=d.endOffset)d.collapsed=true}this.restoreCursor_(d)}}};
a.patch_apply_=function(b,c,d){if(b.length==0)return c;b=this.dmp.patch_deepCopy(b);var e=this.dmp.patch_addPadding(b);c=e+c+e;this.dmp.patch_splitMax(b);for(var f=0,h=0;h<b.length;h++){var g=b[h].start2+f,i=this.dmp.diff_text1(b[h].diffs),k,j=-1;if(i.length>this.dmp.Match_MaxBits){k=this.dmp.match_main(c,i.substring(0,this.dmp.Match_MaxBits),g);if(k!=-1){j=this.dmp.match_main(c,i.substring(i.length-this.dmp.Match_MaxBits),g+i.length-this.dmp.Match_MaxBits);if(j==-1||k>=j)k=-1}}else k=this.dmp.match_main(c,
i,g);if(k==-1){mobwrite.debug&&window.console.warn("Patch failed: "+b[h]);f-=b[h].length2-b[h].length1}else{mobwrite.debug&&window.console.info("Patch OK.");f=k-g;g=j==-1?c.substring(k,k+i.length):c.substring(k,j+this.dmp.Match_MaxBits);g=this.dmp.diff_main(i,g,false);if(i.length>this.dmp.Match_MaxBits&&this.dmp.diff_levenshtein(g)/i.length>this.dmp.Patch_DeleteThreshold)mobwrite.debug&&window.console.warn("Patch contents mismatch: "+b[h]);else{i=0;var m;for(j=0;j<b[h].diffs.length;j++){var l=b[h].diffs[j];
if(l[0]!==0)m=this.dmp.diff_xIndex(g,i);if(l[0]===1){c=c.substring(0,k+m)+l[1]+c.substring(k+m);for(var n=0;n<d.length;n++)if(d[n]+e.length>k+m)d[n]+=l[1].length}else if(l[0]===-1){var p=k+m,o=k+this.dmp.diff_xIndex(g,i+l[1].length);c=c.substring(0,p)+c.substring(o);for(n=0;n<d.length;n++)if(d[n]+e.length>p)if(d[n]+e.length<o)d[n]=p-e.length;else d[n]-=o-p}if(l[0]!==-1)i+=l[1].length}}}}return c=c.substring(e.length,c.length-e.length)};
a.captureCursor_=function(){if("activeElement"in this.element&&!this.element.activeElement)return null;var b=this.dmp.Match_MaxBits/2,c=this.element.value,d={};if("selectionStart"in this.element){try{var e=this.element.selectionStart,f=this.element.selectionEnd}catch(h){return null}d.startPrefix=c.substring(e-b,e);d.startSuffix=c.substring(e,e+b);d.startOffset=e;d.collapsed=e==f;if(!d.collapsed){d.endPrefix=c.substring(f-b,f);d.endSuffix=c.substring(f,f+b);d.endOffset=f}}else{for(e=this.element;e.parentNode;)e=
e.parentNode;if(!e.selection||!e.selection.createRange)return null;c=e.selection.createRange();if(c.parentElement()!=this.element)return null;e=e.body.createTextRange();d.collapsed=c.text=="";e.moveToElementText(this.element);if(!d.collapsed){e.setEndPoint("EndToEnd",c);d.endPrefix=e.text;d.endOffset=d.endPrefix.length;d.endPrefix=d.endPrefix.substring(d.endPrefix.length-b)}e.setEndPoint("EndToStart",c);d.startPrefix=e.text;d.startOffset=d.startPrefix.length;d.startPrefix=d.startPrefix.substring(d.startPrefix.length-
b);e.moveToElementText(this.element);e.setEndPoint("StartToStart",c);d.startSuffix=e.text.substring(0,b);if(!d.collapsed){e.setEndPoint("StartToEnd",c);d.endSuffix=e.text.substring(0,b)}}if("scrollTop"in this.element){d.scrollTop=this.element.scrollTop/this.element.scrollHeight;d.scrollLeft=this.element.scrollLeft/this.element.scrollWidth}return d};
a.restoreCursor_=function(b){this.dmp.Match_Distance=1000;this.dmp.Match_Threshold=0.9;var c=this.dmp.Match_MaxBits/2,d=this.element.value,e=b.startPrefix+b.startSuffix,f,h=this.dmp.match_main(d,e,b.startOffset-c);if(h!==null){f=d.substring(h,h+e.length);e=this.dmp.diff_main(e,f,false);h+=this.dmp.diff_xIndex(e,b.startPrefix.length)}var g=null;if(!b.collapsed){e=b.endPrefix+b.endSuffix;g=this.dmp.match_main(d,e,b.endOffset-c);if(g!==null){f=d.substring(g,g+e.length);e=this.dmp.diff_main(e,f,false);
g+=this.dmp.diff_xIndex(e,b.endPrefix.length)}}if(h===null&&g!==null)h=g;else if(h===null&&g===null)h=b.startOffset;if(g===null)g=h;if("selectionStart"in this.element){this.element.selectionStart=h;this.element.selectionEnd=g}else{for(c=this.element;c.parentNode;)c=c.parentNode;if(!c.selection||!c.selection.createRange)return;d=this.element.value.substring(0,h);d=d.replace(/\r\n/g,"\n").length;c=c.body.createTextRange();c.moveToElementText(this.element);c.collapse(true);c.moveStart("character",d);
if(!b.collapsed){d=this.element.value.substring(h,g);h=d.replace(/\r\n/g,"\n").length;c.moveEnd("character",h)}c.select()}if("scrollTop"in b){this.element.scrollTop=b.scrollTop*this.element.scrollHeight;this.element.scrollLeft=b.scrollLeft*this.element.scrollWidth}};mobwrite.shareTextareaObj.normalizeLinebreaks_=function(b){return b.replace(/\r\n/g,"\n").replace(/\r/g,"\n")};
mobwrite.shareTextareaObj.shareHandler=function(b){if(typeof b=="string")b=document.getElementById(b);if(b&&"value"in b&&"type"in b&&(b.type=="textarea"||b.type=="text"||b.type=="password")){if(mobwrite.UA_webkit){b.addEventListener("focus",function(){this.activeElement=true},false);b.addEventListener("blur",function(){this.activeElement=false},false);b.activeElement=false}return new mobwrite.shareTextareaObj(b)}return null};mobwrite.shareHandlers.push(mobwrite.shareTextareaObj.shareHandler);})()
