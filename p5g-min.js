var P5g=function(n){function t(n,t){if(isFinite(n)&&isFinite(t)&&n>=0&&I>n&&t>=0&&P>t){var e=n+t*I;q?void 0===F?v():g(F):0===S[e]?(S[e]=J,T[J-1]=e,a(),J+=1,J>z&&(q=!0)):console.log("Unavailable placement.")}else console.log("Unavailable placement.")}function e(n,t,e){if(isFinite(n)&&isFinite(t)&&isFinite(e)&&n>=0&&I>n&&t>=0&&P>t&&e>=0&&e<V.length){for(var r,o=n+t*I,i=G[V[e]],a=Math.min(2*R,1===i.x?I-n:-1===i.x?n+1:1/0,1===i.y?P-t:-1===i.y?t+1:1/0),c=i.x+i.y*I,p=[],l=[],s=-1,d=-1,h=-1,u={o:0,j:0,d:0},f=1;a>f;f++)if(r=o+c*f,0===S[r]){if(-1!==s)break;if(s=f,-1!=d)break}else if(Math.abs(S[r]-S[o])%2===0){if(-1!==d){h=f;break}-1===s?p.push(r):l.push(r)}else if(Math.abs(S[r]-S[o])%2===1){if(-1!==s){l.length>0&&(d=f);break}l.push(r),-1===d&&(d=f)}return f===a&&(-1==s?-1==d?d=f:h=f:l.length>0&&(d=f)),-1!==h?(u.b=1,u.d=1):l.length>0?-1!=d?s>d?u.d=1:(u.o=1,u.j=1,u.b=1):(u.j=1,u.o=1):-1!==d?u.d=1:u.o=1,{p:o,n:p,n2:l,f:u}}}function r(n,t,r){var o,i=e(n,t,r),a=e(n,t,r+4),c=i.n.length+a.n.length+1,p=[i.p].concat(i.n).concat(a.n),l=[];return R>c?i.f.o&&a.f.o?i.f.j&&a.f.j?(o=i.n2.length>a.n2.length?1:i.n2.length<a.n2.length?2:0,2!==o&&l.push(i.f.b?{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:1,n:c+i.n2.length,p:p.concat(i.n2),d:r}),1!==o&&l.push(a.f.b?{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:1,n:c+a.n2.length,p:p.concat(a.n2),d:r})):l.push(i.f.j?i.f.b?{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:1,n:c+i.n2.length,p:p.concat(i.n2),d:r}:a.f.j?a.f.b?{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:1,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:0,n:c,p:p,d:r}):l.push(i.f.o?i.f.j?i.f.b?{t:5,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:2,n:c,p:p,d:r}:a.f.o?a.f.j?a.f.b?{t:5,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:2,n:c,p:p,d:r}:{t:4,n:c,p:p,d:r}):l.push({t:0,n:c,p:p,d:r}),l}function o(n,t){var e=n+t*I,o=0;$[e]=[];for(var i=0;i<K.length;i++)r(n,t,i).forEach(function(n){n.n<R?n.n===R-1?4!==n.t&&($[e].push(n),o=Math.max(o,R-1)):n.n===R-2?n.t<2?($[e].push(n),o=Math.max(o,R-2)):n.n<4&&$[e].push(n):n.n===R-3&&n.t<2&&$[e].push(n):n.t%2?($[e].push(n),o=Math.max(o,R-1)):($[e].push(n),o=R)});return $[e].length>0?$[e].sort(function(n,t){return t.n-n.n||n.t-t.t}):delete $[e],o}function i(n,t){for(var e,r,i,a=n+t*I,c=0;c<V.length;c++)for(var p=G[V[c]],l=Math.min(R,1===p.x?I-n:-1===p.x?n+1:1/0,1===p.y?P-t:-1===p.y?t+1:1/0),s=p.x+p.y*I,d=0,h=0,u=1;l>u;u++)if(e=a+s*u,r=n+p.x*u,i=t+p.y*u,0===S[e]){if(h)break;h=u}else if(Math.abs(S[e]-S[a])%2===0){if(d)break;H[e]=o(r,i)}else Math.abs(S[e]-S[a])%2===1&&(d||(d=u),H[e]=o(r,i));H[a]=o(n,t)}function a(){if(J>z)v();else{var n=T[J-1],t=n%I,e=(n-t)/I;i(t,e),H[n]<R?J===z&&v():g((J-1)%2)}}function c(n,t){for(var e=n%I,r=Math.max(e-t,0),o=Math.min(e+1+t,I),i=(n-e)/I,a=Math.max(i-t,0),c=Math.min(i+1+t,P),p=[],l=a;c>l;l++)for(var s=r;o>s;s++)p.push({p:s+l*I,dx:Math.abs(s-e),dy:Math.abs(l-i)});return p}function p(){for(var n=Object.keys($),t=n.length,e=[],r=[],o={},i={},a={},p={},l=0;t>l;l++)(J-S[n[l]])%2===1?r.push({p:n[l],n:$[n[l]]}):e.push({p:n[l],n:$[n[l]]});for(r.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),e.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),l=0;l<r.length;l++)for(var s=0;s<r[l].n.length;s++){r[l].n[s].p.sort(function(n,t){return n-t});var d,h=G[V[r[l].n[s].d]],u=r[l].n[s].t,f=r[l].n[s].n,g=h.x+h.y*I,v=r[l].n[s].p[r[l].n[s].p.length-1]-g,b=r[l].n[s].p[r[l].n[s].p.length-1]%I-h.x,m=(r[l].n[s].p[r[l].n[s].p.length-1]-b)/I-h.y,x=r[l].n[s].p[0]+g,y=r[l].n[s].p[0]%I+h.x,E=(r[l].n[s].p[0]-y)/I+h.y,k=v-g,N=b-h.x,w=m-h.y,M=x+g,C=y+h.x,U=E+h.y,_=k-g,L=N-h.x,j=w-h.y,A=M+g,F=C+h.x,D=U+h.y,B=_-g,O=L-h.x,z=j-h.y,H=A+g,q=F+h.x,K=D+h.y;if(u%2)for(var Q=1;Q<r[l].n[s].p.length;Q++)if(r[l].n[s].p[Q]-r[l].n[s].p[Q-1]>-g){d=x-g*(Q+1);break}!(O>=0&&I>O&&z>=0&&P>z||(B=-1,L>=0&&I>L&&j>=0&&P>j||(_=-1,N>=0&&I>N&&w>=0&&P>w||(k=-1,b>=0&&I>b&&m>=0&&P>m||!(v=-1))))),!(q>=0&&I>q&&K>=0&&P>K||(H=-1,F>=0&&I>F&&D>=0&&P>D||(A=-1,C>=0&&I>C&&U>=0&&P>U||(M=-1,y>=0&&I>y&&E>=0&&P>E||!(x=-1))))),0===u?f===R-1?(o[v]=(o[v]||0)+80/f,o[x]=(o[x]||0)+80/f):f===R-2?-1!==k&&0===S[k]&&-1!==M&&0===S[M]?(o[v]=(o[v]||0)+36/f,o[x]=(o[x]||0)+36/f):-1!==M&&0===S[M]?(o[x]=(o[x]||0)+36/f,o[v]=(o[v]||0)+10/f):-1!==k&&0===S[k]?(o[v]=(o[v]||0)+36/f,o[x]=(o[x]||0)+10/f):(o[v]=(o[v]||0)+10/f,o[x]=(o[x]||0)+10/f):f===R-3&&(-1!==k&&0===S[k]&&-1!==M&&0===S[M]?(o[v]=(o[v]||0)+14/f,o[k]=(o[k]||0)+14/f,o[x]=(o[x]||0)+14/f,o[M]=(o[M]||0)+14/f):-1!==M&&0===S[M]?(o[x]=(o[x]||0)+10/f,o[M]=(o[M]||0)+10/f):-1!==k&&0===S[k]?(o[v]=(o[v]||0)+10/f,o[k]=(o[k]||0)+10/f):(o[v]=(o[v]||0)+6/f,o[x]=(o[x]||0)+6/f)):1===u?R-1>f?f===R-2?(o[d]=(o[d]||0)+36/f,-1!==x&&(o[x]=(o[x]||0)+30/f),-1!==v&&(o[v]=(o[v]||0)+30/f)):f===R-3&&(-1!==k&&0===S[k]&&-1!==M&&0===S[M]?(o[d]=(o[d]||0)+14/f,o[v]=(o[v]||0)+14/f,o[k]=(o[k]||0)+14/f,o[x]=(o[x]||0)+14/f,o[M]=(o[M]||0)+14/f):-1!==M&&0===S[M]?(o[d]=(o[d]||0)+10/f,o[x]=(o[x]||0)+12/f):-1!==k&&0===S[k]?(o[d]=(o[d]||0)+10/f,o[v]=(o[v]||0)+12/f):o[d]=(o[d]||0)+6/f):o[d]=(o[d]||0)+80/f:2===u?f===R-1?(-1!==v&&0===S[v]&&(o[v]=(o[v]||0)+80/f),-1!==x&&0===S[x]&&(o[x]=(o[x]||0)+80/f)):f===R-2?(-1!==v&&0===S[v]&&-1!==k&&0===S[k]&&(o[v]=(o[v]||0)+12/f,o[k]=(o[k]||0)+12/f),-1!==x&&0===S[x]&&-1!==M&&0===S[M]&&(o[x]=(o[x]||0)+12/f,o[M]=(o[M]||0)+12/f)):f===R-3&&(-1!==v&&-1!==k&&0===S[k]&&-1!==_&&0!==S[_]&&(J-S[_])%2===1&&(o[v]=(o[v]||0)+12/f,o[k]=(o[k]||0)+12/f),-1!==x&&-1!==M&&0===S[M]&&-1!==A&&0!==S[A]&&(J-S[A])%2===1&&(o[x]=(o[x]||0)+12/f,o[M]=(o[M]||0)+12/f)):3===u?R-1>f?f===R-2&&(o[d]=(o[d]||0)+12/f,o[v]=-1===k||0===S[k]||(J-S[k])%2!==0?(o[v]||0)+12/f:(o[v]||0)+6/f,o[x]=-1===M||0===S[M]||(J-S[M])%2!==0?(o[x]||0)+12/f:(o[x]||0)+6/f):o[d]=(o[d]||0)+80/f:5===u&&(R-1>f||(o[d]=(o[d]||0)+80/f))}var W=Object.keys(o),X=W.length,Y=Array(X);for(l=0;X>l;l++)Y[l]={p:W[l],n:o[W[l]]},p[W[l]]=o[W[l]];for(Y.sort(function(n,t){return t.n-n.n||n.p-t.p}),l=0;l<e.length;l++)for(s=0;s<e[l].n.length;s++){e[l].n[s].p.sort(function(n,t){return n-t});var d,Z,h=G[V[e[l].n[s].d]],u=e[l].n[s].t,f=e[l].n[s].n,g=h.x+h.y*I,v=e[l].n[s].p[e[l].n[s].p.length-1]-g,b=e[l].n[s].p[e[l].n[s].p.length-1]%I-h.x,m=(e[l].n[s].p[e[l].n[s].p.length-1]-b)/I-h.y,x=e[l].n[s].p[0]+g,y=e[l].n[s].p[0]%I+h.x,E=(e[l].n[s].p[0]-y)/I+h.y,k=v-g,N=b-h.x,w=m-h.y,M=x+g,C=y+h.x,U=E+h.y,_=k-g,L=N-h.x,j=w-h.y,A=M+g,F=C+h.x,D=U+h.y,B=_-g,O=L-h.x,z=j-h.y,H=A+g,q=F+h.x,K=D+h.y;if(u%2)for(var Q=1;Q<e[l].n[s].p.length;Q++)if(e[l].n[s].p[Q]-e[l].n[s].p[Q-1]>-g){d=x-g*(Q+1),Z=Q;break}!(O>=0&&I>O&&z>=0&&P>z||(B=-1,L>=0&&I>L&&j>=0&&P>j||(_=-1,N>=0&&I>N&&w>=0&&P>w||(k=-1,b>=0&&I>b&&m>=0&&P>m||!(v=-1))))),!(q>=0&&I>q&&K>=0&&P>K||(H=-1,F>=0&&I>F&&D>=0&&P>D||(A=-1,C>=0&&I>C&&U>=0&&P>U||(M=-1,y>=0&&I>y&&E>=0&&P>E||!(x=-1))))),0===u?f===R-1?(i[v]=(i[v]||0)+100/f,i[x]=(i[x]||0)+100/f):f===R-2?(-1!==k&&(0===S[k]?(i[v]=(i[v]||0)+36/f,i[k]=(i[k]||0)+24/f):(J-S[k])%2===1&&(i[v]=(i[v]||0)+21/f)),-1!==M&&(0===S[M]?(i[x]=(i[x]||0)+36/f,i[M]=(i[M]||0)+24/f):(J-S[M])%2===1&&(i[x]=(i[x]||0)+21/f))):f===R-3&&(-1===k||0===S[k]||-1===M||0===S[M])&&(-1!==k&&(0===S[k]?-1!==_&&(0===S[_]?(i[v]=(i[v]||0)+16/f,i[k]=(i[k]||0)+14/f):(J-S[_])%2===0?(i[v]=(i[v]||0)+36/f,i[k]=(i[k]||0)+30/f):i[v]=(i[v]||0)+14/f):i[v]=(i[v]||0)+6/f),-1!==M&&(0===S[M]?-1!==A&&(0===S[A]?(i[x]=(i[x]||0)+16/f,i[M]=(i[M]||0)+14/f):(J-S[A])%2===0?(i[x]=(i[x]||0)+36/f,i[M]=(i[M]||0)+30/f):i[x]=(i[x]||0)+14/f):i[x]=(i[x]||0)+6/f)):1===u?R-1>f?f===R-2?(i[d]=(i[d]||0)+36/f,-1!==k&&0===S[k]&&-1!==M&&0===S[M]?1===Z?(i[v]=(i[v]||0)+30/f,i[x]=(i[x]||0)+18/f):(i[v]=(i[v]||0)+18/f,i[x]=(i[x]||0)+30/f):-1!==k&&0===S[k]?1===Z?(i[v]=(i[v]||0)+30/f,i[x]=(i[x]||0)+6/f):(i[v]=(i[v]||0)+18/f,i[x]=(i[x]||0)+6/f):-1!==M&&0===S[M]?1===Z?(i[v]=(i[v]||0)+6/f,i[x]=(i[x]||0)+18/f):(i[v]=(i[v]||0)+6/f,i[x]=(i[x]||0)+30/f):(i[v]=(i[v]||0)+6/f,i[x]=(i[x]||0)+6/f)):f===R-3&&(-1!==k&&0===S[k]&&-1!==M&&0===S[M]?(i[d]=(i[d]||0)+16/f,i[v]=(i[v]||0)+14/f,i[x]=(i[x]||0)+14/f):-1!==k&&0===S[k]?(i[d]=(i[d]||0)+14/f,i[v]=(i[v]||0)+12/f,i[x]=(i[x]||0)+6/f):-1!==M&&0===S[M]?(i[d]=(i[d]||0)+14/f,i[v]=(i[v]||0)+6/f,i[x]=(i[x]||0)+12/f):i[d]=(i[d]||0)+6/f):i[d]=(i[d]||0)+100/f:2===u?f===R-1?(-1!==v&&0===S[v]&&(i[v]=(i[v]||0)+100/f),-1!==x&&0===S[x]&&(i[x]=(i[x]||0)+100/f)):f===R-2?(-1!==v&&0===S[v]&&-1!==k&&0===S[k]&&(i[v]=(i[v]||0)+18/f,i[k]=(i[k]||0)+18/f),-1!==x&&0===S[x]&&-1!==M&&0===S[M]&&(i[x]=(i[x]||0)+18/f,i[M]=(i[M]||0)+18/f)):f===R-3&&(-1===k||0===S[k]||-1===M||0===S[M])&&(0===S[v]&&-1!==k&&(0===S[k]?-1!==_&&(0===S[_]?(i[v]=(i[v]||0)+16/f,i[k]=(i[k]||0)+14/f):(J-S[_])%2===0?(i[v]=(i[v]||0)+36/f,i[k]=(i[k]||0)+30/f):i[v]=(i[v]||0)+14/f):i[v]=(i[v]||0)+6/f),0===S[x]&&-1!==M&&(0===S[M]?-1!==A&&(0===S[A]?(i[x]=(i[x]||0)+16/f,i[M]=(i[M]||0)+14/f):(J-S[A])%2===0?(i[x]=(i[x]||0)+36/f,i[M]=(i[M]||0)+30/f):i[x]=(i[x]||0)+14/f):i[x]=(i[x]||0)+6/f)):3===u?R-1>f?f===R-2&&(i[d]=(i[d]||0)+18/f,1===Z&&0===S[v]&&(-1!==k?0===S[k]?i[v]=(i[v]||0)+18/f:(J-S[k])%2===1&&(i[v]=(i[v]||0)+6/f):i[v]=(i[v]||0)+6/f),2===Z&&0===S[x]&&(-1!==M?0===S[M]?i[x]=(i[x]||0)+18/f:(J-S[M])%2===1&&(i[x]=(i[x]||0)+6/f):i[x]=(i[x]||0)+6/f)):i[d]=(i[d]||0)+100/f:5===u&&(R-1>f||(i[d]=(i[d]||0)+100/f))}var nt=Object.keys(i),tt=nt.length,et=Array(tt);for(l=0;tt>l;l++)et[l]={p:nt[l],n:i[nt[l]]},p[nt[l]]|=i[nt[l]];for(et.sort(function(n,t){return t.n-n.n||n.p-t.p}),l=J-3;l>=0;l-=2)for(var rt,ot,it,at=T[l],ct=c(at,2),Q=0;Q<ct.length;Q++)rt=ct[Q].p,ot=ct[Q].dx,it=ct[Q].dy,0===S[rt]?1===ot&&1===it?a[rt]=(a[rt]||0)+.2:it+ot===1?a[rt]=(a[rt]||0)+.1:it+ot===2?a[rt]=(a[rt]||0)+.01:it+ot===3&&(a[rt]=(a[rt]||0)+.02):(J-S[rt])%2&&c(rt,2).forEach(function(n){0===S[n.p]&&(1===n.dx&&1===n.dy||n.dy+n.dx===1)});var pt=Object.keys(a),lt=pt.length,st=Array(lt);for(l=0;lt>l;l++)st[l]={p:pt[l],n:a[pt[l]]},a[pt[l]]>0&&(p[pt[l]]=(p[pt[l]]||0)+a[pt[l]]);st.sort(function(n,t){return t.n-n.n||n.p-t.p});var dt=Object.keys(p),ht=dt.length,ut=[];for(0===ht&&(c(T[J-2],2).forEach(function(n){0===S[n.p]&&(1===n.dx&&1===n.dy?p[n.p]=(p[n.p]||0)+.2:n.dy+n.dx===1?p[n.p]=(p[n.p]||0)+.1:n.dy+n.dx===2?p[n.p]=(p[n.p]||0)+.01:n.dy+n.dx===3&&(p[n.p]=(p[n.p]||0)+.02))}),dt=Object.keys(p),ht=dt.length),l=0;ht>l;l++)p[dt[l]]>0&&ut.push({p:dt[l],n:p[dt[l]]});return ut.sort(function(n,t){return t.n-n.n||n.p-t.p}),[Y,et,st,ut]}function l(n){var t=void 0===n?p():n,e=[];if(t[3].length>0){e.push(t[3][0]);for(var r=1;r<t[3].length&&Math.floor(t[3][r].n)>=Math.floor(e[0].n);r++)e.push(t[3][r])}return e}function s(n){var t=void 0===n?l():n;return t.length>0?t[Math.min(Math.ceil(Math.random()*t.length),t.length-1)].p:-1}function d(n,t){return t=void 0===t?J:t,n>0&&!q?l().map(function(e){var r,o,a,c=+e.p%I,s=(+e.p-c)/I,h=x(),u=0,f=0,g=0;return S[+e.p]=J,T[J-1]=+e.p,i(c,s),J+=1,a=p(),H[+e.p]<R||(F=(J-1)%2,q=!0),J===z&&(q=!0),r=x(),Object.keys($).forEach(function(n){$[n].forEach(function(e){Math.abs(t-S[n])%2===0?0===e.t?e.n===R?f+=1e3/e.n:e.n===R-1?f+=80/e.n:e.n===R-2?f+=24/e.n:e.n===R-3&&(f+=6/e.n):1===e.t?e.n<R-1?e.n===R-2?f+=24/e.n:e.n===R-3&&(f+=6/e.n):f+=40/e.n:2===e.t?e.n===R?f+=1e3/e.n:e.n===R-1?f+=40/e.n:e.n===R-2&&(f+=6/e.n):3===e.t?e.n===R?f+=1e3/e.n:e.n===R-1?f+=40/e.n:e.n===R-2&&(f+=3/e.n):4===e.t?e.n===R&&(f+=1e3/e.n):5===e.t&&(e.n<R-1||(f+=40/e.n)):0===e.t?e.n===R?g-=1e3/e.n:e.n===R-1?g-=80/e.n:e.n===R-2?g-=24/e.n:e.n===R-3&&(g-=6/e.n):1===e.t?e.n<R-1?e.n===R-2?g-=24/e.n:e.n===R-3&&(g-=6/e.n):g-=40/e.n:2===e.t?e.n===R?g-=1e3/e.n:e.n===R-1?g-=40/e.n:e.n===R-2&&(g-=6/e.n):3===e.t?e.n===R?g-=1e3/e.n:e.n===R-1?g-=40/e.n:e.n===R-2&&(g-=3/e.n):4===e.t?e.n===R&&(g-=1e3/e.n):5===e.t&&(e.n<R-1||(g-=40/e.n))})}),u=(J-t)%2===1?a[3].reduce(function(n,t){return n+Math.ceil(t.n)},0):-a[3].reduce(function(n,t){return n+Math.ceil(t.n)},0),o=l(a).length<10?{p:+e.p,c:r,h:d(n-1,t),s:u,s2:f,s3:g}:{p:+e.p,c:r,h:[],s:u,s2:f,s3:g},y(h),o}):[]}function h(n){var t=[];return n.forEach(function(n){var e=h(n.h);e.length>0?e.forEach(function(e){t.push([[n.p].concat(e[0]),n.s+e[1],n.s2+e[2],n.s3+e[3]])}):t.push([[n.p],n.s,n.s2,n.s3])}),t}function u(){if(!q){var n=s(),e=n%I,r=(n-e)/I;-1!==n&&t(e,r)}}function f(){if(!q){if(1===J)t(Math.ceil(I/2),Math.ceil(P/2));else if(6>J)u();else{var n=h(d(6)).sort(function(n,t){return t[3]-n[3]||t[2]-n[2]||t[1]-n[1]}),e=n[0][0][0],r=e%I,o=(e-r)/I;t(r,o)}_(),C(),U()}}function g(n){q=!0,F=n,console.log("Player",n+1,"wins.")}function v(){q=!0,console.log("Tie")}function b(){return JSON.stringify({w:I,h:P,d:Array.prototype.slice.call(T,0,J-1)})}function m(n){try{var e=JSON.parse(n);k(e.w,e.h);for(var r=0;r<e.d.length;r++){var o=e.d[r]%e.w,i=(e.d[r]-o)/e.w;t(o,i)}}catch(a){console.log(a)}}function x(){var n={};return n.cur=J,n.end=q,n.wp=F,n.hist=new Uint16Array(z),n.hist.set(T),n.map=new Uint16Array(z),n.map.set(S),n.cm=new Uint16Array(z),n.cm.set(H),n.pps={},Object.keys($).forEach(function(t){n.pps[t]=[],$[t].forEach(function(e){n.pps[t].push({t:e.t,n:e.n,p:e.p.slice(),d:e.d})})}),n}function y(n){J=n.cur,q=n.end,F=n.wp,T=n.hist,S=n.map,H=n.cm,$=n.pps,n=null}function E(){var n=Array.prototype.slice.call(T,0,J-2),e=I,r=n;k(e,r);for(var o=0;o<n.length;o++){var i=n[o]%I,a=(n[o]-i)/I;t(i,a)}}function k(n,t){n=isFinite(n)?+n:B,t=isFinite(t)?+t:O,I=R+2>n?R+2:n>256?256:n,P=R+2>t?R+2:t>256?256:t,z=I*P,J=1,S=new Uint16Array(z),T=new Uint16Array(z),H=new Uint16Array(z),$={},F=void 0,q=!1}function N(){for(var n=document.getElementsByClassName("hint");n.length;)n[0].title="",n[0].className="point"}function w(n){return 80>n?64>n?48>n?40>n?28>n?24>n?16>n?10>n?6>n?0>n?0:10:9:8:7:6:5:4:3:2:1}function M(){N();for(var n,t=p(),e=document.getElementsByClassName("point"),r=(Math.min.apply(null,t[3].map(function(n){return w(n.n)||1/0})),11),o=0;o<t[3].length;o++)n=w(t[3][o].n),n>0&&r>n?(e[t[3][o].p].className="point hint r"+n,e[t[3][o].p].title="R"+w(t[3][o].n)+"("+Math.floor(t[3][o].n)+")"):e[t[3][o].p].className="point hint";for(var o=0;o<t[0].length;o++)n=w(t[0][o].n),r>n&&(e[t[0][o].p].className+=" def");for(var o=0;o<t[1].length;o++)n=w(t[1][o].n),r>n&&(e[t[1][o].p].className+=" atk")}function C(){for(var n=document.getElementsByClassName("last");n.length>0;)n[0].className=n[0].className.replace(/(?:^|\s+)last(?:\s+|$)/g,"")}function U(){var n=document.getElementsByClassName("point");n[T[J-2]].className+=" last"}function _(){for(var n=document.getElementsByClassName("point"),t=0;t<n.length;t++){var e=n[t].dataset.p;S[e]>0?(n[e].className="point p"+((S[e]-1)%2+1),n[e].title=S[e],n[e].removeEventListener("click",j)):(n[e].className="point",n[e].title="",n[e].addEventListener("click",j)),n[t].firstChild.className=H[e]>0?"cir c"+Math.min(H[e],5):"cir",q&&n[t].removeEventListener("click",j)}q?(document.getElementById("dg_"+D).className="",alert(void 0===F?"It`s a tie.":"Player "+(F+1)+" wins.")):document.getElementById("dg_"+D).className="active p"+((J-1)%2+1)}function L(n){n.removeEventListener("click",j),n.className="point p"+((J-1)%2+1),n.title=J,t(+n.dataset.x,+n.dataset.y);for(var e=document.getElementsByClassName("point"),r=0;r<e.length;r++){var o=e[r].dataset.p;e[r].firstChild.className=H[o]>0?"cir c"+Math.min(H[o],5):"cir",q&&e[r].removeEventListener("click",j)}return n}function j(n){0===n.button&&(n.preventDefault(),L(this),N(),C(),U(),q?(document.getElementById("dg_"+D).className="",alert(void 0===F?"It`s a tie.":"Player "+(F+1)+" wins.")):document.getElementById("dg_"+D).className="active p"+((J-1)%2+1))}function A(n,t,e){var r=document.createElement("div"),o=document.createElement("style"),i=(document.createElement("style"),document.getElementById("gs_"+D)),a=document.getElementById("dg_"+D);a&&a.parentNode.removeChild(a),i&&i.parentNode.removeChild(i),k(t,e),r.id="dg_"+D,o.id="gs_"+D,o.innerHTML="#dg_"+D+" { width: "+22*I+"px; height: "+22*P+"px; display: inline-block; box-sizing: border-box; } #dg_"+D+".active.p1 .point { background-color: #FFE6E6;}#dg_"+D+".active.p2 .point { background-color: #E6E6FF;}.point { background-color: #EEE; width: 20px; height: 20px; float: left; line-height: 20px; font-size: 12px; text-align: center; padding: 1px; position: relative; overflow: hidden; } .point > .cir { width: 20px; height: 20px; border-radius: 10px; z-index: 10; position: absolute; top: 1px; left: 1px; } .active.p1 .point > .cir:hover,.active.p1 .point.hint > .cir:hover { background-color: #FF1010; cursor: pointer; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3); } .active.p2 .point > .cir:hover,.active.p2 .point.hint > .cir:hover { background-color: #1010FF; cursor: pointer; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3); } .p1 > .cir,.active .p1.point > .cir:hover { background-color: #E6A1A1; cursor: default; box-shadow: inset 0 0 22px rgba(200, 40, 40, 0.6); } .p2 > .cir,.active .p2.point > .cir:hover { background-color: #A1A1E6; cursor: default; box-shadow: inset 0 0 22px rgba(40, 40, 200, 0.6); } .bo { display: none; position: absolute; width: 15px; height: 15px; box-shadow: inset 0 0 2px #111; } .l1 { display: block; top: -4px; left: -4px; } .l2 { display: block; top: -4px; right: -4px; } .l3 { display: block; bottom: -4px; left: -4px; } .l4 { display: block; bottom: -4px; right: -4px; } .p1.point > .cir.c3,.active .p1.point > .cir.c3:hover { background-color: #E65C5C; } .p1.point > .cir.c4,.active .p1.point > .cir.c4:hover { background-color: #E62E2E; } .p1.point > .cir.c5,.active .p1.point > .cir.c5:hover { background-color: #FE0101; } .p2.point > .cir.c3,.active .p2.point > .cir.c3:hover { background-color: #5C5CE6; } .p2.point > .cir.c4,.active .p2.point > .cir.c4:hover { background-color: #2E2EE6; } .p2.point > .cir.c5,.active .p2.point > .cir.c5:hover { background-color: #0101FE; }.active .point.hint > .cir { box-sizing: border-box; border: 1px solid rgba(255,255,255,0); }.active .point.hint.def > .cir { border: 1px solid rgba(50,200,200,0.8); box-shadow: inset 0 0 10px rgba(50, 200, 200, 0.2); }.active .point.hint.atk > .cir { border: 1px solid rgba(200,200,50,0.8); box-shadow: inset 0 0 10px rgba(200, 200, 50, 0.2); }.active .point.hint.def.atk > .cir { border: 1px solid rgba(0,100,0,0.95); box-shadow: inset 0 0 20px rgba(0, 200, 0, 0.8); }.active .point.hint.r1 > .cir { background-color: rgba(0,0,0,0.95); }.active .point.hint.r2 > .cir { background-color: rgba(33,33,33,0.9); }.active .point.hint.r3 > .cir { background-color: rgba(66,66,66,0.85); }.active .point.hint.r4 > .cir { background-color: rgba(100,100,100,0.8); }.active .point.hint.r5 > .cir { background-color: rgba(125,125,125,0.75); }.active .point.hint.r6 > .cir { background-color: rgba(150,150,150,0.7); }.active .point.hint.r7 > .cir { background-color: rgba(175,175,175,0.65); }.active .point.hint.r8 > .cir { background-color: rgba(200,200,200,0.6); }.active .point.hint.r9 > .cir { background-color: rgba(225,225,225,0.55); }.active .point.hint.r10 > .cir { background-color: rgba(250,250,250,0.5); }.active .point.last > .cir { box-sizing: border-box; border: 1px solid rgba(50,50,50,0.3); box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.4); }";for(var c=0;P>c;c++){for(var p=document.createElement("div"),l=0;I>l;l++){var s=document.createElement("div");s.dataset.p=l+c*I,s.className="point",s.dataset.x=l,s.dataset.y=c,s.addEventListener("click",j),s.appendChild(document.createElement("div")),s.firstChild.className="cir",s.appendChild(document.createElement("div")),s.lastChild.className="bo"+(0===l||0===c?"":" l1"),s.appendChild(document.createElement("div")),s.lastChild.className="bo"+(l===I-1||0===c?"":" l2"),s.appendChild(document.createElement("div")),s.lastChild.className="bo"+(0===l||c===P-1?"":" l3"),s.appendChild(document.createElement("div")),s.lastChild.className="bo"+(l===I-1||c===P-1?"":" l4"),p.appendChild(s)}p.appendChild(document.createElement("div")),p.lastChild.style.clear="both",r.appendChild(p)}r.className="active p1",r.onmousedown=function(n){n.preventDefault()},n?n.appendChild(r):document.body.appendChild(r),document.body.appendChild(o)}n=void 0===n?{}:{oldP5g:n};var F,D=Math.round(1e7*Math.random()),R=5,B=32,O=32,I=B,P=O,z=I*P,J=1,S=new Uint16Array(z),T=new Uint16Array(z),H=new Uint16Array(z),$={},q=!1,G={U:{x:0,y:-1},UR:{x:1,y:-1},R:{x:1,y:0},RD:{x:1,y:1},D:{x:0,y:1},DL:{x:-1,y:1},L:{x:-1,y:0},LU:{x:-1,y:-1}},K=["LU","L","UR","U"],Q=["RD","R","DL","D"],V=K.concat(Q);return G.U.r=G.D,G.UR.r=G.DL,G.R.r=G.L,G.RD.r=G.LU,G.D.r=G.U,G.DL.r=G.UR,G.L.r=G.R,G.LU.r=G.RD,n.pps=function(){return $},Object.defineProperty(n,"id",{value:"dg_"+D}),n.hint=p,n.place=t,n.reset=k,n.save=b,n.load=m,n.cache=x,n.load_cache=y,n.redo=E,n.refresh_dom=_,n.refresh_hint=M,n.clear_hint=N,n.clear_last=C,n.last_hint=U,n.create_dom=A,n.auto_place=u,n.ap=f,n.point_predict=d,n.score_predict=h,n.prior_point=l,n}(P5g);