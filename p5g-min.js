var P5g=function(n){function t(n,t){if(isFinite(n)&&isFinite(t)&&n>=0&&J>n&&t>=0&&$>t){var e=n+t*J;Y?void 0===P?v():g(P):0===K[e]?(K[e]=G,Q[G-1]=e,i(),G+=1,G>q&&(Y=!0)):console.log("Unavailable placement.")}else console.log("Unavailable placement.")}function e(n,t,e){if(isFinite(n)&&isFinite(t)&&isFinite(e)&&n>=0&&J>n&&t>=0&&$>t&&e>=0&&e<et.length){for(var r,o=n+t*J,a=Z[et[e]],i=Math.min(2*I,1===a.x?J-n:-1===a.x?n+1:1/0,1===a.y?$-t:-1===a.y?t+1:1/0),c=a.x+a.y*J,p=[],l=[],s=-1,d=-1,h=-1,u={o:0,j:0,d:0},f=1;i>f;f++)if(r=o+c*f,0===K[r]){if(-1!==s)break;if(s=f,-1!=d)break}else if(Math.abs(K[r]-K[o])%2===0){if(-1!==d){h=f;break}-1===s?p.push(r):l.push(r)}else if(Math.abs(K[r]-K[o])%2===1){if(-1!==s){l.length>0&&(d=f);break}l.push(r),-1===d&&(d=f)}return f===i&&(-1==s?-1==d?d=f:h=f:l.length>0&&(d=f)),-1!==h?(u.b=1,u.d=1):l.length>0?-1!=d?s>d?u.d=1:(u.o=1,u.j=1,u.b=1):(u.j=1,u.o=1):-1!==d?u.d=1:u.o=1,{p:o,n:p,n2:l,f:u}}}function r(n,t,r){var o,a=e(n,t,r),i=e(n,t,r+4),c=a.n.length+i.n.length+1,p=[a.p].concat(a.n).concat(i.n),l=[];return I>c?a.f.o&&i.f.o?a.f.j&&i.f.j?(o=a.n2.length>i.n2.length?1:a.n2.length<i.n2.length?2:0,2!==o&&l.push(a.f.b?{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:1,n:c+a.n2.length,p:p.concat(a.n2),d:r}),1!==o&&l.push(i.f.b?{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:1,n:c+i.n2.length,p:p.concat(i.n2),d:r})):l.push(a.f.j?a.f.b?{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:1,n:c+a.n2.length,p:p.concat(a.n2),d:r}:i.f.j?i.f.b?{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:1,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:0,n:c,p:p,d:r}):l.push(a.f.o?a.f.j?a.f.b?{t:5,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:3,n:c+a.n2.length,p:p.concat(a.n2),d:r}:{t:2,n:c,p:p,d:r}:i.f.o?i.f.j?i.f.b?{t:5,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:3,n:c+i.n2.length,p:p.concat(i.n2),d:r}:{t:2,n:c,p:p,d:r}:{t:4,n:c,p:p,d:r}):l.push({t:0,n:c,p:p,d:r}),l}function o(n,t){var e=n+t*J,o=0;X[e]=[];for(var a=0;a<nt.length;a++)r(n,t,a).forEach(function(n){n.n<I?n.n===I-1?4!==n.t&&(X[e].push(n),o=Math.max(o,I-1)):n.n===I-2?n.t<2?(X[e].push(n),o=Math.max(o,I-2)):n.n<4&&X[e].push(n):n.n===I-3&&n.t<4&&X[e].push(n):n.t%2?(X[e].push(n),o=Math.max(o,I-1)):(X[e].push(n),o=I)});return X[e].length>0?X[e].sort(function(n,t){return t.n-n.n||n.t-t.t}):delete X[e],o}function a(n,t){for(var e,r,a,i=n+t*J,c=0;c<et.length;c++)for(var p=Z[et[c]],l=Math.min(I,1===p.x?J-n:-1===p.x?n+1:1/0,1===p.y?$-t:-1===p.y?t+1:1/0),s=p.x+p.y*J,d=0,h=0,u=1;l>u;u++)if(e=i+s*u,r=n+p.x*u,a=t+p.y*u,0===K[e]){if(h)break;h=u}else if(Math.abs(K[e]-K[i])%2===0){if(d)break;V[e]=o(r,a)}else Math.abs(K[e]-K[i])%2===1&&(d||(d=u),V[e]=o(r,a));V[i]=o(n,t)}function i(){if(G>q)v();else{var n=Q[G-1],t=n%J,e=(n-t)/J;a(t,e),V[n]<I?G===q&&v():g((G-1)%2)}}function c(n,t){for(var e=n%J,r=Math.max(e-t,0),o=Math.min(e+1+t,J),a=(n-e)/J,i=Math.max(a-t,0),c=Math.min(a+1+t,$),p=[],l=i;c>l;l++)for(var s=r;o>s;s++)p.push({p:s+l*J,dx:Math.abs(s-e),dy:Math.abs(l-a)});return p}function p(){for(var n=Object.keys(X),t=n.length,e=[],r=[],o={},a={},i={},p={},l=0;t>l;l++)(G-K[n[l]])%2===1?r.push({p:n[l],n:X[n[l]]}):e.push({p:n[l],n:X[n[l]]});for(r.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),e.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),l=0;l<r.length;l++)for(var s=0;s<r[l].n.length;s++){r[l].n[s].p.sort(function(n,t){return n-t});var d,h=Z[et[r[l].n[s].d]],u=r[l].n[s].t,f=r[l].n[s].n,g=h.x+h.y*J,v=r[l].n[s].p[r[l].n[s].p.length-1]-g,b=r[l].n[s].p[r[l].n[s].p.length-1]%J-h.x,m=(r[l].n[s].p[r[l].n[s].p.length-1]-b-h.x)/J-h.y,x=r[l].n[s].p[0]+g,y=r[l].n[s].p[0]%J+h.x,E=(r[l].n[s].p[0]-y+h.x)/J+h.y,k=v-g,M=b-h.x,w=m-h.y,N=x+g,C=y+h.x,U=E+h.y,L=k-g,_=M-h.x,j=w-h.y,A=N+g,F=C+h.x,O=U+h.y,D=L-g,B=_-h.x,P=j-h.y,R=A+g,H=F+h.x,z=O+h.y;if(u%2)for(var T=1;T<r[l].n[s].p.length;T++)if(r[l].n[s].p[T]-r[l].n[s].p[T-1]>-g){d=x-g*(T+1);break}!(B>=0&&J>B&&P>=0&&$>P||(D=-1,_>=0&&J>_&&j>=0&&$>j||(L=-1,M>=0&&J>M&&w>=0&&$>w||(k=-1,b>=0&&J>b&&m>=0&&$>m||!(v=-1))))),!(H>=0&&J>H&&z>=0&&$>z||(R=-1,F>=0&&J>F&&O>=0&&$>O||(A=-1,C>=0&&J>C&&U>=0&&$>U||(N=-1,y>=0&&J>y&&E>=0&&$>E||!(x=-1))))),0===u?f===I-1?(o[v]=(o[v]||0)+160/f,o[x]=(o[x]||0)+160/f):f===I-2?-1!==k&&0===K[k]&&-1!==N&&0===K[N]?(o[v]=(o[v]||0)+40/f,o[x]=(o[x]||0)+40/f):-1!==N&&0===K[N]?(o[x]=(o[x]||0)+40/f,o[v]=(o[v]||0)+10/f):-1!==k&&0===K[k]?(o[v]=(o[v]||0)+40/f,o[x]=(o[x]||0)+12/f):(o[v]=(o[v]||0)+12/f,o[x]=(o[x]||0)+12/f):f===I-3&&(-1!==k&&0===K[k]&&-1!==N&&0===K[N]?(o[v]=(o[v]||0)+12/f,o[k]=(o[k]||0)+12/f,o[x]=(o[x]||0)+12/f,o[N]=(o[N]||0)+12/f):-1!==N&&0===K[N]?(o[x]=(o[x]||0)+10/f,o[N]=(o[N]||0)+10/f):-1!==k&&0===K[k]&&(o[v]=(o[v]||0)+10/f,o[k]=(o[k]||0)+10/f)):1===u?I-1>f?f===I-2?(o[d]=(o[d]||0)+40/f,-1!==k&&0===K[k]&&-1!==N&&0===K[N]?1===V?(o[v]=(o[v]||0)+24/f,o[x]=(o[x]||0)+12/f):(o[v]=(o[v]||0)+12/f,o[x]=(o[x]||0)+24/f):-1!==k&&0===K[k]?-1!==N&&(G-K[N])%2===1?o[x]=(o[x]||0)+2/f:o[v]=1===V?(o[v]||0)+24/f:(o[v]||0)+12/f:-1!==N&&0===K[N]&&(-1!==k&&(G-K[k])%2===1?o[v]=(o[v]||0)+2/f:o[x]=1===V?(o[x]||0)+12/f:(o[x]||0)+24/f)):f===I-3&&(-1!==k&&0===K[k]&&-1!==N&&0===K[N]?(o[d]=(o[d]||0)+12/f,o[v]=(o[v]||0)+10/f,o[k]=(o[k]||0)+10/f,o[x]=(o[x]||0)+10/f,o[N]=(o[N]||0)+10/f):-1!==N&&0===K[N]?(o[d]=(o[d]||0)+10/f,o[x]=(o[x]||0)+10/f):-1!==k&&0===K[k]?(o[d]=(o[d]||0)+10/f,o[v]=(o[v]||0)+10/f):o[d]=(o[d]||0)+2/f):o[d]=(o[d]||0)+160/f:2===u?f===I-1?(-1!==v&&0===K[v]&&(o[v]=(o[v]||0)+160/f),-1!==x&&0===K[x]&&(o[x]=(o[x]||0)+160/f)):f===I-2?(-1!==v&&0===K[v]&&-1!==k&&0===K[k]&&(o[v]=(o[v]||0)+12/f,o[k]=(o[k]||0)+12/f),-1!==x&&0===K[x]&&-1!==N&&0===K[N]&&(o[x]=(o[x]||0)+12/f,o[N]=(o[N]||0)+12/f)):f===I-3&&(-1!==v&&0===K[v]&&-1!==k&&0===K[k]&&-1!==L&&0!==K[L]&&(G-K[L])%2===1&&(o[v]=(o[v]||0)+12/f,o[k]=(o[k]||0)+12/f),-1!==x&&0===K[x]&&-1!==N&&0===K[N]&&-1!==A&&0!==K[A]&&(G-K[A])%2===1&&(o[x]=(o[x]||0)+12/f,o[N]=(o[N]||0)+12/f)):3===u?I-1>f?f===I-2?(o[d]=(o[d]||0)+12/f,-1!==v&&0===K[v]&&(o[v]=-1===k||0===K[k]||(G-K[k])%2!==0?(o[v]||0)+12/f:(o[v]||0)+2/f),-1!==x&&0===K[x]&&(o[x]=-1===N||0===K[N]||(G-K[N])%2!==0?(o[x]||0)+12/f:(o[x]||0)+2/f)):f===I-3&&(-1!==x&&0===K[x]&&-1!==N&&0!==K[N]&&(G-K[N])%2===1?(o[d]=(o[d]||0)+12/f,o[x]=(o[x]||0)+12/f):-1!==v&&0===K[v]&&-1!==k&&0!==K[k]&&(G-K[k])%2===1&&(o[d]=(o[d]||0)+12/f,o[v]=(o[v]||0)+12/f)):o[d]=(o[d]||0)+160/f:5===u&&(I-1>f||(o[d]=(o[d]||0)+160/f))}var W=Object.keys(o),S=W.length,q=Array(S);for(l=0;S>l;l++)q[l]={p:W[l],n:o[W[l]]},p[W[l]]=o[W[l]];for(q.sort(function(n,t){return t.n-n.n||n.p-t.p}),l=0;l<e.length;l++)for(s=0;s<e[l].n.length;s++){e[l].n[s].p.sort(function(n,t){return n-t});var d,V,h=Z[et[e[l].n[s].d]],u=e[l].n[s].t,f=e[l].n[s].n,g=h.x+h.y*J,v=e[l].n[s].p[e[l].n[s].p.length-1]-g,b=e[l].n[s].p[e[l].n[s].p.length-1]%J-h.x,m=(e[l].n[s].p[e[l].n[s].p.length-1]-b-h.x)/J-h.y,x=e[l].n[s].p[0]+g,y=e[l].n[s].p[0]%J+h.x,E=(e[l].n[s].p[0]-y+h.x)/J+h.y,k=v-g,M=b-h.x,w=m-h.y,N=x+g,C=y+h.x,U=E+h.y,L=k-g,_=M-h.x,j=w-h.y,A=N+g,F=C+h.x,O=U+h.y,D=L-g,B=_-h.x,P=j-h.y,R=A+g,H=F+h.x,z=O+h.y;if(u%2)for(var T=1;T<e[l].n[s].p.length;T++)if(e[l].n[s].p[T]-e[l].n[s].p[T-1]>-g){d=x-g*(T+1),V=T;break}!(B>=0&&J>B&&P>=0&&$>P||(D=-1,_>=0&&J>_&&j>=0&&$>j||(L=-1,M>=0&&J>M&&w>=0&&$>w||(k=-1,b>=0&&J>b&&m>=0&&$>m||!(v=-1))))),!(H>=0&&J>H&&z>=0&&$>z||(R=-1,F>=0&&J>F&&O>=0&&$>O||(A=-1,C>=0&&J>C&&U>=0&&$>U||(N=-1,y>=0&&J>y&&E>=0&&$>E||!(x=-1))))),0===u?f===I-1?(a[v]=(a[v]||0)+400/f,a[x]=(a[x]||0)+400/f):f===I-2?(-1!==k?0===K[k]?(a[v]=(a[v]||0)+50/f,a[k]=(a[k]||0)+24/f):(G-K[k])%2===1&&(a[v]=(a[v]||0)+24/f):a[v]=(a[v]||0)+24/f,-1!==N?0===K[N]?(a[x]=(a[x]||0)+50/f,a[N]=(a[N]||0)+24/f):(G-K[N])%2===1&&(a[x]=(a[x]||0)+24/f):a[x]=(a[x]||0)+24/f):f===I-3&&(-1===k||0===K[k]||-1===N||0===K[N])&&(-1!==k&&(0===K[k]?-1!==L&&(0===K[L]?(a[v]=(a[v]||0)+14/f,a[k]=(a[k]||0)+12/f):(G-K[L])%2===0?(a[v]=(a[v]||0)+46/f,a[k]=(a[k]||0)+42/f):a[v]=(a[v]||0)+12/f):a[v]=(a[v]||0)+2/f),-1!==N&&(0===K[N]?-1!==A&&(0===K[A]?(a[x]=(a[x]||0)+14/f,a[N]=(a[N]||0)+12/f):(G-K[A])%2===0?(a[x]=(a[x]||0)+46/f,a[N]=(a[N]||0)+42/f):a[x]=(a[x]||0)+12/f):a[x]=(a[x]||0)+2/f)):1===u?I-1>f?f===I-2?(a[d]=(a[d]||0)+50/f,-1!==k&&0===K[k]&&-1!==N&&0===K[N]?1===V?(a[v]=(a[v]||0)+42/f,a[x]=(a[x]||0)+18/f):(a[v]=(a[v]||0)+18/f,a[x]=(a[x]||0)+42/f):-1!==k&&0===K[k]?1===V?(a[v]=(a[v]||0)+42/f,a[x]=(a[x]||0)+2/f):(a[v]=(a[v]||0)+18/f,a[x]=(a[x]||0)+2/f):-1!==N&&0===K[N]?1===V?(a[v]=(a[v]||0)+2/f,a[x]=(a[x]||0)+18/f):(a[v]=(a[v]||0)+2/f,a[x]=(a[x]||0)+42/f):(a[v]=(a[v]||0)+2/f,a[x]=(a[x]||0)+2/f)):f===I-3&&(-1!==k&&0===K[k]&&-1!==N&&0===K[N]?(a[d]=(a[d]||0)+14/f,a[v]=(a[v]||0)+12/f,a[x]=(a[x]||0)+12/f):-1!==k&&0===K[k]?(a[d]=(a[d]||0)+12/f,-1!==N&&(G-K[N])%2===0?(a[d]=(a[d]||0)+1/f,a[x]=(a[x]||0)+42/f):a[v]=(a[v]||0)+6/f,a[x]=(a[x]||0)+2/f):-1!==N&&0===K[N]?(a[d]=(a[d]||0)+12/f,a[v]=(a[v]||0)+2/f,-1!==k&&(G-K[k])%2===0?(a[d]=(a[d]||0)+1/f,a[v]=(a[v]||0)+42/f):a[x]=(a[x]||0)+6/f):(a[d]=(a[d]||0)+2/f,-1!==N&&(G-K[N])%2===0&&(a[d]=(a[d]||0)+2/f,a[x]=(a[x]||0)+42/f),-1!==k&&(G-K[k])%2===0&&(a[d]=(a[d]||0)+2/f,a[v]=(a[v]||0)+42/f))):a[d]=(a[d]||0)+400/f:2===u?f===I-1?(-1!==v&&0===K[v]&&(a[v]=(a[v]||0)+400/f),-1!==x&&0===K[x]&&(a[x]=(a[x]||0)+400/f)):f===I-2?(-1!==v&&0===K[v]&&-1!==k&&0===K[k]&&(a[v]=(a[v]||0)+42/f,a[k]=(a[k]||0)+42/f),-1!==x&&0===K[x]&&-1!==N&&0===K[N]&&(a[x]=(a[x]||0)+42/f,a[N]=(a[N]||0)+42/f)):f===I-3&&(-1===k||0===K[k]||-1===N||0===K[N])&&(0===K[v]&&-1!==k&&(0===K[k]?-1!==L&&(0===K[L]?(a[v]=(a[v]||0)+2/f,a[k]=(a[k]||0)+1/f):(G-K[L])%2===0?(a[v]=(a[v]||0)+46/f,a[k]=(a[k]||0)+42/f):a[v]=(a[v]||0)+2/f):a[v]=(a[v]||0)+2/f),0===K[x]&&-1!==N&&(0===K[N]?-1!==A&&(0===K[A]?(a[x]=(a[x]||0)+2/f,a[N]=(a[N]||0)+1/f):(G-K[A])%2===0?(a[x]=(a[x]||0)+46/f,a[N]=(a[N]||0)+42/f):a[x]=(a[x]||0)+2/f):a[x]=(a[x]||0)+2/f)):3===u?I-1>f?f===I-2?(a[d]=(a[d]||0)+42/f,0===K[v]&&(-1!==k?0===K[k]?a[v]=(a[v]||0)+18/f:(G-K[k])%2===1&&(a[v]=(a[v]||0)+2/f):a[v]=(a[v]||0)+2/f),0===K[x]&&(-1!==N?0===K[N]?a[x]=(a[x]||0)+18/f:(G-K[N])%2===1&&(a[x]=(a[x]||0)+2/f):a[x]=(a[x]||0)+2/f)):f===I-3&&(-1!==v&&0===K[v]&&-1!==k&&0!==K[k]&&(G-K[k])%2===0&&(a[d]=(a[d]||0)+10/f,a[v]=(a[v]||0)+10/f),-1!==x&&0===K[x]&&-1!==N&&0!==K[N]&&(G-K[N])%2===0&&(a[d]=(a[d]||0)+10/f,a[x]=(a[x]||0)+10/f)):a[d]=(a[d]||0)+400/f:5===u&&(I-1>f||(a[d]=(a[d]||0)+400/f))}var Y=Object.keys(a),nt=Y.length,tt=Array(nt);for(l=0;nt>l;l++)tt[l]={p:Y[l],n:a[Y[l]]},p[Y[l]]=(p[Y[l]]||0)+a[Y[l]];for(tt.sort(function(n,t){return t.n-n.n||n.p-t.p}),l=G-3;l>=0;l-=2)for(var rt,ot,at,it=Q[l],ct=c(it,2),T=0;T<ct.length;T++)rt=ct[T].p,ot=ct[T].dx,at=ct[T].dy,0===K[rt]?1===ot&&1===at?i[rt]=(i[rt]||0)+.1:at+ot===1?i[rt]=(i[rt]||0)+.2:at+ot===2?i[rt]=(i[rt]||0)+.02:at+ot===3&&(i[rt]=(i[rt]||0)+.05):(G-K[rt])%2&&c(rt,2).forEach(function(n){0===K[n.p]&&(1===n.dx&&1===n.dy?i[n.p]=(i[n.p]||0)+.05:n.dy+n.dx===1&&(i[n.p]=(i[n.p]||0)+.05))});var pt=Object.keys(i),lt=pt.length,st=Array(lt);for(l=0;lt>l;l++)st[l]={p:pt[l],n:i[pt[l]]},i[pt[l]]>0&&(p[pt[l]]=(p[pt[l]]||0)+i[pt[l]]);st.sort(function(n,t){return t.n-n.n||n.p-t.p});var dt=Object.keys(p),ht=dt.length,ut=[];for(0===ht&&(c(Q[G-2],2).forEach(function(n){0===K[n.p]&&(1===n.dx&&1===n.dy?p[n.p]=(p[n.p]||0)+.2:n.dy+n.dx===1?p[n.p]=(p[n.p]||0)+.5:n.dy+n.dx===2?p[n.p]=(p[n.p]||0)+.01:n.dy+n.dx===3&&(p[n.p]=(p[n.p]||0)+.02))}),dt=Object.keys(p),ht=dt.length),l=0;ht>l;l++)p[dt[l]]>0&&ut.push({p:dt[l],n:p[dt[l]]});return ut.sort(function(n,t){return t.n-n.n||n.p-t.p}),[q,tt,st,ut]}function l(n){var t=void 0===n?p():n,e=[];if(t[3].length>0){e.push(t[3][0]);for(var r=1;r<t[3].length&&Math.floor(t[3][r].n)>=Math.floor(e[0].n);r++)e.push(t[3][r])}return e}function d(n,t){return t=void 0===t?G:t,n>0&&!Y?l().map(function(e){-1==e.p&&console.log(Q);var r,o,i,c=+e.p%J,s=(+e.p-c)/J,h=x(),u=0,f=0,g=0;return K[+e.p]=G,Q[G-1]=+e.p,a(c,s),G+=1,i=p(),V[+e.p]<I||(P=(G-1)%2,Y=!0),G===q&&(Y=!0),r=x(),Object.keys(X).forEach(function(n){X[n].forEach(function(e){Math.abs(t-K[n])%2===0?0===e.t?e.n===I?f+=1e3/e.n:e.n===I-1?f+=80/e.n:e.n===I-2?f+=24/e.n:e.n===I-3&&(f+=6/e.n):1===e.t?e.n<I-1?e.n===I-2?f+=18/e.n:e.n===I-3&&(f+=6/e.n):f+=40/e.n:2===e.t?e.n===I?f+=1e3/e.n:e.n===I-1?f+=40/e.n:e.n===I-2&&(f+=6/e.n):3===e.t?e.n===I?f+=1e3/e.n:e.n===I-1?f+=40/e.n:e.n===I-2&&(f+=3/e.n):4===e.t?e.n===I&&(f+=1e3/e.n):5===e.t&&(e.n<I-1||(f+=40/e.n)):0===e.t?e.n===I?g-=1e3/e.n:e.n===I-1?g-=80/e.n:e.n===I-2?g-=24/e.n:e.n===I-3&&(g-=6/e.n):1===e.t?e.n<I-1?e.n===I-2?g-=18/e.n:e.n===I-3&&(g-=6/e.n):g-=40/e.n:2===e.t?e.n===I?g-=1e3/e.n:e.n===I-1?g-=40/e.n:e.n===I-2&&(g-=6/e.n):3===e.t?e.n===I?g-=1e3/e.n:e.n===I-1?g-=40/e.n:e.n===I-2&&(g-=3/e.n):4===e.t?e.n===I&&(g-=1e3/e.n):5===e.t&&(e.n<I-1||(g-=40/e.n))})}),u=(G-t)%2===1?i[3].reduce(function(n,t){return n+Math.floor(t.n)},0):-i[3].reduce(function(n,t){return n+Math.floor(t.n)},0),o=l(i).length<10?{p:+e.p,c:r,h:d(n-1,t),s:u,s2:f,s3:g}:{p:+e.p,c:r,h:[],s:u,s2:f,s3:g},y(h),o}):[]}function h(n){var t=[];return n.forEach(function(n){var e=h(n.h);e.length>0?e.forEach(function(e){t.push([[n.p].concat(e[0]),n.s+e[1],n.s2+e[2],n.s3+e[3]])}):t.push([[n.p],n.s,n.s2,n.s3])}),t}function u(){if(!Y){if(1===G)t(Math.floor(J/2),Math.floor($/2));else{for(var n=h(d(6)).sort(function(n,t){return t[3]-n[3]||t[2]-n[2]||t[1]-n[1]}),e={},r=[],o=0;o<n.length&&w(n[o][3])+w(n[o][2])<=w(n[0][3])+w(n[0][2])+2;o++)e[n[o][0][0]]=(e[n[o][0][0]]||0)+1;Object.keys(e).reduce(function(n,t){return e[t]>n?(r=[t],e[t]):(e[t]===n&&r.push(t),n)},0);var a=+r[Math.min(Math.floor(Math.random()*r.length),r.length-1)],i=a%J,c=(a-i)/J;t(i,c)}L(),C(),U()}}function f(){u(),S&&u()}function g(n){Y=!0,P=n,console.log("Player",n+1,"wins.")}function v(){Y=!0,console.log("Tie")}function b(){return JSON.stringify({w:J,h:$,d:Array.prototype.slice.call(Q,0,G-1)})}function m(n){try{var e=JSON.parse(n);k(e.w,e.h);for(var r=0;r<e.d.length;r++){var o=e.d[r]%e.w,a=(e.d[r]-o)/e.w;t(o,a)}}catch(i){console.log(i)}}function x(){var n={};return n.cur=G,n.end=Y,n.wp=P,n.hist=new Uint16Array(q),n.hist.set(Q),n.map=new Uint16Array(q),n.map.set(K),n.cm=new Uint16Array(q),n.cm.set(V),n.pps={},Object.keys(X).forEach(function(t){n.pps[t]=[],X[t].forEach(function(e){n.pps[t].push({t:e.t,n:e.n,p:e.p.slice(),d:e.d})})}),n}function y(n){G=n.cur,Y=n.end,P=n.wp,Q=n.hist,K=n.map,V=n.cm,X=n.pps,n=null}function E(){var n=Array.prototype.slice.call(Q,0,Math.max(G-(S?3:2),0));k(J,$);for(var e=0;e<n.length;e++){var r=n[e]%J,o=(n[e]-r)/J;t(r,o)}}function k(n,t){n=isFinite(n)?+n:H,t=isFinite(t)?+t:z,J=I+2>n?I+2:n>256?256:n,$=I+2>t?I+2:t>256?256:t,q=J*$,G=1,K=new Uint16Array(q),Q=new Uint16Array(q),V=new Uint16Array(q),X={},P=void 0,Y=!1}function M(){for(var n=document.getElementsByClassName("hint");n.length;)n[0].title="",n[0].className="point"}function w(n){return n=Math.floor(n),400>n?160>n?64>n?42>n?36>n?28>n?24>n?14>n?10>n?0>n?0:10:9:8:7:6:5:4:3:2:1}function N(){M();for(var n,t=p(),e=document.getElementsByClassName("point"),r=(Math.min.apply(null,t[3].map(function(n){return w(n.n)||1/0})),11),o=0;o<t[3].length;o++)n=w(t[3][o].n),n>0&&r>n?(e[t[3][o].p].className="point hint r"+n,e[t[3][o].p].title="R"+w(t[3][o].n)+"("+Math.floor(t[3][o].n)+")"):e[t[3][o].p].className="point hint";for(var o=0;o<t[0].length;o++)n=w(t[0][o].n),r>n&&(e[t[0][o].p].className+=" def");for(var o=0;o<t[1].length;o++)n=w(t[1][o].n),r>n&&(e[t[1][o].p].className+=" atk")}function C(){for(var n=document.getElementsByClassName("last");n.length>0;)n[0].className=n[0].className.replace(/(?:^|\s+)last(?:\s+|$)/g,"")}function U(){var n=document.getElementsByClassName("point");G>1&&(n[Q[G-2]].className+=" last")}function L(){for(var n=document.getElementsByClassName("point"),t=0;t<n.length;t++){var e=n[t].dataset.p;K[e]>0?(n[e].className="point p"+((K[e]-1)%2+1),n[e].title=K[e],n[e].removeEventListener("click",j)):(n[e].className="point",n[e].title="",n[e].addEventListener("click",j)),n[t].firstChild.className=V[e]>0?"cir c"+Math.min(V[e],5):"cir",Y&&n[t].removeEventListener("click",j)}Y?(document.getElementById("dg_"+R).className="",alert(void 0===P?"It`s a tie.":"Player "+(P+1)+" wins.")):document.getElementById("dg_"+R).className="active p"+((G-1)%2+1)}function _(n){n.removeEventListener("click",j),n.className="point p"+((G-1)%2+1),n.title=G,t(+n.dataset.x,+n.dataset.y);for(var e=document.getElementsByClassName("point"),r=0;r<e.length;r++){var o=e[r].dataset.p;e[r].firstChild.className=V[o]>0?"cir c"+Math.min(V[o],5):"cir",Y&&e[r].removeEventListener("click",j)}return n}function j(n){0===n.button&&(n.preventDefault(),_(this),M(),C(),U(),Y?(document.getElementById("dg_"+R).className="",alert(void 0===P?"It`s a tie.":"Player "+(P+1)+" wins.")):(document.getElementById("dg_"+R).className="active p"+((G-1)%2+1),S&&setTimeout(u,100)))}function A(n,t,e){k(t,e);var r=O(),o=document.getElementById("dg_"+R);o&&o.parentNode.removeChild(o),n instanceof HTMLElement?n.appendChild(r):document.body.appendChild(r),D()}function F(){k();var n=O(),t=document.getElementById("dg_"+R),e=t?t.parentNode:document.body;t&&t.parentNode.removeChild(t),e.appendChild(n),D()}function O(){var n=document.createElement("div");n.id="dg_"+R;for(var t=0;$>t;t++){for(var e=document.createElement("div"),r=0;J>r;r++){var o=document.createElement("div");o.dataset.p=r+t*J,o.className="point",o.dataset.x=r,o.dataset.y=t,o.addEventListener("click",j),o.appendChild(document.createElement("div")),o.firstChild.className="cir",o.appendChild(document.createElement("div")),o.lastChild.className="bo"+(0===r||0===t?"":" l1"),o.appendChild(document.createElement("div")),o.lastChild.className="bo"+(r===J-1||0===t?"":" l2"),o.appendChild(document.createElement("div")),o.lastChild.className="bo"+(0===r||t===$-1?"":" l3"),o.appendChild(document.createElement("div")),o.lastChild.className="bo"+(r===J-1||t===$-1?"":" l4"),e.appendChild(o)}e.appendChild(document.createElement("div")),e.lastChild.style.clear="both",n.appendChild(e)}return n.className="active p1",n.onmousedown=function(n){n.preventDefault()},n}function D(){var n=document.getElementById("gs_"+R),t=Math.min(T,W),e=t/5;n&&n.parentNode.removeChild(n),s=document.createElement("style"),s.id="gs_"+R,s.innerHTML="#dg_"+R+" { width: "+J*(T+2)+"px; height: "+$*(W+2)+"px; display: inline-block; box-sizing: border-box; } #dg_"+R+".active.p1 .point { background-color: #FFE6E6;}#dg_"+R+".active.p2 .point { background-color: #E6E6FF;}.point { background-color: #EEE; width: "+T+"px; height: "+W+"px; float: left; line-height: "+W+"px; padding: 1px; position: relative; overflow: hidden; } .point > .cir { width: "+t+"px; height: "+t+"px; border-radius: "+t/2+"px; z-index: 10; position: absolute; top: "+(1+Math.abs(W-t)/2)+"px; left: "+(1+Math.abs(T-t)/2)+"px; } .active.p1 .point > .cir:hover,.active.p1 .point.hint > .cir:hover { background-color: #FF1010; cursor: pointer; box-shadow: inset 0 0 "+t/2+"px rgba(0, 0, 0, 0.3); } .active.p2 .point > .cir:hover,.active.p2 .point.hint > .cir:hover { background-color: #1010FF; cursor: pointer; box-shadow: inset 0 0 "+t/2+"px rgba(0, 0, 0, 0.3); } .p1 > .cir,.active .p1.point > .cir:hover { background-color: #E6A1A1; cursor: default; box-shadow: inset 0 0 "+(t+2)+"px rgba(200, 40, 40, 0.6); } .p2 > .cir,.active .p2.point > .cir:hover { background-color: #A1A1E6; cursor: default; box-shadow: inset 0 0 "+(t+2)+"px rgba(40, 40, 200, 0.6); } .bo { display: none; position: absolute; width: "+(T/2+e+1)+"px; height: "+(W/2+e+1)+"px; box-shadow: inset 0 0 "+e/2+"px #111; } .l1 { display: block; top: -"+e+"px; left: -"+e+"px; } .l2 { display: block; top: -"+e+"px; right: -"+e+"px; } .l3 { display: block; bottom: -"+e+"px; left: -"+e+"px; } .l4 { display: block; bottom: -"+e+"px; right: -"+e+"px; } .p1.point > .cir.c3,.active .p1.point > .cir.c3:hover { background-color: #E65C5C; } .p1.point > .cir.c4,.active .p1.point > .cir.c4:hover { background-color: #E62E2E; } .p1.point > .cir.c5,.active .p1.point > .cir.c5:hover { background-color: #FE0101; } .p2.point > .cir.c3,.active .p2.point > .cir.c3:hover { background-color: #5C5CE6; } .p2.point > .cir.c4,.active .p2.point > .cir.c4:hover { background-color: #2E2EE6; } .p2.point > .cir.c5,.active .p2.point > .cir.c5:hover { background-color: #0101FE; }.active .point.hint > .cir { box-sizing: border-box; border: 1px solid rgba(255,255,255,0); }.active .point.hint.def > .cir { border: 1px solid rgba(50,200,200,0.8); box-shadow: inset 0 0 "+t/2+"px rgba(50, 200, 200, 0.2); }.active .point.hint.atk > .cir { border: 1px solid rgba(200,200,50,0.8); box-shadow: inset 0 0 "+t/2+"px rgba(200, 200, 50, 0.2); }.active .point.hint.def.atk > .cir { border: 1px solid rgba(0,100,0,0.95); box-shadow: inset 0 0 "+t+"px rgba(0, 200, 0, 0.8); }.active .point.hint.r1 > .cir { background-color: rgba(0,0,0,0.95); }.active .point.hint.r2 > .cir { background-color: rgba(33,33,33,0.9); }.active .point.hint.r3 > .cir { background-color: rgba(66,66,66,0.85); }.active .point.hint.r4 > .cir { background-color: rgba(100,100,100,0.8); }.active .point.hint.r5 > .cir { background-color: rgba(125,125,125,0.75); }.active .point.hint.r6 > .cir { background-color: rgba(150,150,150,0.7); }.active .point.hint.r7 > .cir { background-color: rgba(175,175,175,0.65); }.active .point.hint.r8 > .cir { background-color: rgba(200,200,200,0.6); }.active .point.hint.r9 > .cir { background-color: rgba(225,225,225,0.55); }.active .point.hint.r10 > .cir { background-color: rgba(250,250,250,0.5); }.active .point.last.p1 > .cir,.active .point.last.p1 > .cir:hover { box-sizing: border-box; border: 1px solid rgba(100, 0, 0, 0.6); box-shadow: inset 0 0 "+(t+2)+"px rgba(200, 0, 0, 1); }.active .point.last.p2 > .cir,.active .point.last.p2 > .cir:hover { box-sizing: border-box; border: 1px solid rgba(0, 0, 100, 0.6); box-shadow: inset 0 0 "+(t+2)+"px rgba(0, 0, 200, 1); }",document.body.appendChild(s)}function B(n){if("string"==typeof n)switch(n){case"auto":return S;case"col":return J;case"row":return $;case"vp":return I;case"pointWidth":return T;case"pointHeight":return W}else{var t=!1,e=!1;if(n.hasOwnProperty("autoFitScreen")){var r=screen.availWidth,o=screen.availHeight,a=Math.min(r,o);1600>a?1200>a?1e3>a?900>a?700>a?600>a?400>a?360>a?300>a||(W=T=18,H=z=15):(W=T=21,H=z=16):(W=T=22,H=z=16):(W=T=23,H=z=21):(W=T=23,H=z=25):(W=T=26,H=z=25):(W=T=30,H=z=24):(W=T=42,H=z=25):(W=T=50,H=z=25),t=!0,e=!0}n.hasOwnProperty("auto")&&(S=!!n.auto),n.hasOwnProperty("pointHeight")&&(W=Math.min(Math.max(+n.pointHeight,16),80),t=!0),n.hasOwnProperty("pointWidth")&&(T=Math.min(Math.max(+n.pointWidth,16),80),t=!0),n.hasOwnProperty("col")&&(H=Math.min(Math.max(+n.col,2*I+1),127),e=!0),n.hasOwnProperty("row")&&(z=Math.min(Math.max(+n.row,2*I+1),127),e=!0),t&&D(),e&&F()}}n=void 0===n?{}:{oldP5g:n};var P,R=Math.round(1e7*Math.random()),I=5,H=23,z=23,T=25,W=25,S=!1,J=H,$=z,q=J*$,G=1,K=new Uint16Array(q),Q=new Uint16Array(q),V=new Uint16Array(q),X={},Y=!1,Z={U:{x:0,y:-1},UR:{x:1,y:-1},R:{x:1,y:0},RD:{x:1,y:1},D:{x:0,y:1},DL:{x:-1,y:1},L:{x:-1,y:0},LU:{x:-1,y:-1}},nt=["LU","L","UR","U"],tt=["RD","R","DL","D"],et=nt.concat(tt);return Z.U.r=Z.D,Z.UR.r=Z.DL,Z.R.r=Z.L,Z.RD.r=Z.LU,Z.D.r=Z.U,Z.DL.r=Z.UR,Z.L.r=Z.R,Z.LU.r=Z.RD,n.pps=function(){return X},n.current=function(){return G},n.end=function(){return Y},Object.defineProperty(n,"id",{value:"dg_"+R}),n.hint=p,n.reset=k,n.save=b,n.load=m,n.redo=E,n.refresh_dom=L,n.refresh_hint=N,n.clear_hint=M,n.clear_last=C,n.last_hint=U,n.create_dom=A,n.config=B,n.auto_place=f,n}(P5g);