var P5g=function(n){n=void 0===n?{}:{oldP5g:n};var t,e=Math.round(1e7*Math.random()),r=5,o=23,a=23,i=25,c=25,p=!1,l=o,h=a,d=l*h,u=1,f=new Uint16Array(d),g=new Uint16Array(d),v=new Uint16Array(d),b={},m=!1,x={U:{x:0,y:-1},UR:{x:1,y:-1},R:{x:1,y:0},RD:{x:1,y:1},D:{x:0,y:1},DL:{x:-1,y:1},L:{x:-1,y:0},LU:{x:-1,y:-1}},y=["LU","L","UR","U"],k=y.concat(["RD","R","DL","D"]);function M(n,e){if(isFinite(n)&&isFinite(e)&&n>=0&&n<l&&e>=0&&e<h){var o=n+e*l;m?void 0===t?B():j(t):0===f[o]?(f[o]=u,g[u-1]=o,function(){if(u>d)B();else{var n=g[u-1],t=n%l,e=(n-t)/l;C(t,e),v[n]>=r?j((u-1)%2):u===d&&B()}}(),(u+=1)>d&&(m=!0)):console.log("Unavailable placement.")}else console.log("Unavailable placement.")}function w(n,t,e){if(isFinite(n)&&isFinite(t)&&isFinite(e)&&n>=0&&n<l&&t>=0&&t<h&&e>=0&&e<k.length){for(var o,a=n+t*l,i=x[k[e]],c=Math.min(2*r,1===i.x?l-n:-1===i.x?n+1:1/0,1===i.y?h-t:-1===i.y?t+1:1/0),p=i.x+i.y*l,s=[],d=[],u=-1,g=-1,v=-1,b={o:0,j:0,d:0},m=1;m<c;m++)if(0===f[o=a+p*m]){if(-1!==u)break;if(u=m,-1!=g)break}else if(Math.abs(f[o]-f[a])%2==0){if(-1!==g){v=m;break}-1===u?s.push(o):d.push(o)}else if(Math.abs(f[o]-f[a])%2==1){if(-1!==u){d.length>0&&(g=m);break}d.push(o),-1===g&&(g=m)}return m===c&&(-1==u?-1==g?g=m:v=m:d.length>0&&(g=m)),-1!==v?(b.b=1,b.d=1):d.length>0?-1!=g?u>g?b.d=1:(b.o=1,b.j=1,b.b=1):(b.j=1,b.o=1):-1!==g?b.d=1:b.o=1,{p:a,n:s,n2:d,f:b}}}function E(n,t,e){var o,a=w(n,t,e),i=w(n,t,e+4),c=a.n.length+i.n.length+1,p=[a.p].concat(a.n).concat(i.n),l=[];return c>=r?l.push({t:0,n:c,p:p,d:e}):a.f.o&&i.f.o?a.f.j&&i.f.j?(2!==(o=a.n2.length>i.n2.length?1:a.n2.length<i.n2.length?2:0)&&(a.f.b?l.push({t:3,n:c+a.n2.length,p:p.concat(a.n2),d:e}):l.push({t:1,n:c+a.n2.length,p:p.concat(a.n2),d:e})),1!==o&&(i.f.b?l.push({t:3,n:c+i.n2.length,p:p.concat(i.n2),d:e}):l.push({t:1,n:c+i.n2.length,p:p.concat(i.n2),d:e}))):a.f.j?a.f.b?l.push({t:3,n:c+a.n2.length,p:p.concat(a.n2),d:e}):l.push({t:1,n:c+a.n2.length,p:p.concat(a.n2),d:e}):i.f.j?i.f.b?l.push({t:3,n:c+i.n2.length,p:p.concat(i.n2),d:e}):l.push({t:1,n:c+i.n2.length,p:p.concat(i.n2),d:e}):l.push({t:0,n:c,p:p,d:e}):a.f.o?a.f.j?a.f.b?l.push({t:5,n:c+a.n2.length,p:p.concat(a.n2),d:e}):l.push({t:3,n:c+a.n2.length,p:p.concat(a.n2),d:e}):l.push({t:2,n:c,p:p,d:e}):i.f.o?i.f.j?i.f.b?l.push({t:5,n:c+i.n2.length,p:p.concat(i.n2),d:e}):l.push({t:3,n:c+i.n2.length,p:p.concat(i.n2),d:e}):l.push({t:2,n:c,p:p,d:e}):l.push({t:4,n:c,p:p,d:e}),l}function N(n,t){var e=n+t*l,o=0;b[e]=[];for(var a=0;a<y.length;a++)E(n,t,a).forEach(function(n){n.n>=r?n.t%2?(b[e].push(n),o=Math.max(o,r-1)):(b[e].push(n),o=r):n.n===r-1?4!==n.t&&(b[e].push(n),o=Math.max(o,r-1)):n.n===r-2?n.t<2?(b[e].push(n),o=Math.max(o,r-2)):n.n<4&&b[e].push(n):n.n===r-3&&n.t<4&&b[e].push(n)});return b[e].length>0?b[e].sort(function(n,t){return t.n-n.n||n.t-t.t}):delete b[e],o}function C(n,t){for(var e,o,a,i=n+t*l,c=0;c<k.length;c++)for(var p=x[k[c]],s=Math.min(r,1===p.x?l-n:-1===p.x?n+1:1/0,1===p.y?h-t:-1===p.y?t+1:1/0),d=p.x+p.y*l,u=0,g=0,b=1;b<s;b++)if(e=i+d*b,o=n+p.x*b,a=t+p.y*b,0===f[e]){if(g)break;g=b}else if(Math.abs(f[e]-f[i])%2==0){if(u)break;v[e]=N(o,a)}else Math.abs(f[e]-f[i])%2==1&&(u||(u=b),v[e]=N(o,a));v[i]=N(n,t)}function F(n,t){for(var e=n%l,r=Math.max(e-t,0),o=Math.min(e+1+t,l),a=(n-e)/l,i=Math.max(a-t,0),c=Math.min(a+1+t,h),p=[],s=i;s<c;s++)for(var d=r;d<o;d++)p.push({p:d+s*l,dx:Math.abs(d-e),dy:Math.abs(s-a)});return p}function U(){for(var n=Object.keys(b),t=n.length,e=[],o=[],a={},i={},c={},p={},s=0;s<t;s++)(u-f[n[s]])%2==1?o.push({p:n[s],n:b[n[s]]}):e.push({p:n[s],n:b[n[s]]});for(o.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),e.sort(function(n,t){return t.n.n-n.n.n||n.n.t-t.n.t}),s=0;s<o.length;s++)for(var d=0;d<o[s].n.length;d++){o[s].n[d].p.sort(function(n,t){return n-t});var v=x[k[o[s].n[d].d]],m=o[s].n[d].t,y=o[s].n[d].n,M=v.x+v.y*l,w=o[s].n[d].p[o[s].n[d].p.length-1]-M,E=o[s].n[d].p[o[s].n[d].p.length-1]%l-v.x,N=(o[s].n[d].p[o[s].n[d].p.length-1]-E-v.x)/l-v.y,C=o[s].n[d].p[0]+M,U=o[s].n[d].p[0]%l+v.x,_=(o[s].n[d].p[0]-U+v.x)/l+v.y,A=w-M,L=E-v.x,j=N-v.y,B=C+M,O=U+v.x,D=_+v.y,P=A-M,R=L-v.x,I=j-v.y,H=B+M,z=O+v.x,T=D+v.y,W=R-v.x,S=I-v.y,J=z+v.x,$=T+v.y;if(m%2)for(var q=1;q<o[s].n[d].p.length;q++)if(o[s].n[d].p[q]-o[s].n[d].p[q-1]>-M){V=C-M*(q+1);break}(W<0||W>=l||S<0||S>=h)&&(-1,(R<0||R>=l||I<0||I>=h)&&(P=-1,(L<0||L>=l||j<0||j>=h)&&(A=-1,(E<0||E>=l||N<0||N>=h)&&(w=-1)))),(J<0||J>=l||$<0||$>=h)&&(-1,(z<0||z>=l||T<0||T>=h)&&(H=-1,(O<0||O>=l||D<0||D>=h)&&(B=-1,(U<0||U>=l||_<0||_>=h)&&(C=-1)))),0===m?y===r-1?(a[w]=(a[w]||0)+160/y,a[C]=(a[C]||0)+160/y):y===r-2?-1!==A&&0===f[A]&&-1!==B&&0===f[B]?(a[w]=(a[w]||0)+40/y,a[C]=(a[C]||0)+40/y):-1!==B&&0===f[B]?(a[C]=(a[C]||0)+40/y,a[w]=(a[w]||0)+10/y):-1!==A&&0===f[A]?(a[w]=(a[w]||0)+40/y,a[C]=(a[C]||0)+12/y):(a[w]=(a[w]||0)+12/y,a[C]=(a[C]||0)+12/y):y===r-3&&(-1!==A&&0===f[A]&&-1!==B&&0===f[B]?(a[w]=(a[w]||0)+12/y,a[A]=(a[A]||0)+12/y,a[C]=(a[C]||0)+12/y,a[B]=(a[B]||0)+12/y):-1!==B&&0===f[B]?(a[C]=(a[C]||0)+10/y,a[B]=(a[B]||0)+10/y):-1!==A&&0===f[A]&&(a[w]=(a[w]||0)+10/y,a[A]=(a[A]||0)+10/y)):1===m?y>=r-1?a[V]=(a[V]||0)+160/y:y===r-2?(a[V]=(a[V]||0)+40/y,-1!==A&&0===f[A]&&-1!==B&&0===f[B]?1===X?(a[w]=(a[w]||0)+24/y,a[C]=(a[C]||0)+12/y):(a[w]=(a[w]||0)+12/y,a[C]=(a[C]||0)+24/y):-1!==A&&0===f[A]?-1!==B&&(u-f[B])%2==1?a[C]=(a[C]||0)+2/y:a[w]=1===X?(a[w]||0)+24/y:(a[w]||0)+12/y:-1!==B&&0===f[B]&&(-1!==A&&(u-f[A])%2==1?a[w]=(a[w]||0)+2/y:a[C]=1===X?(a[C]||0)+12/y:(a[C]||0)+24/y)):y===r-3&&(-1!==A&&0===f[A]&&-1!==B&&0===f[B]?(a[V]=(a[V]||0)+12/y,a[w]=(a[w]||0)+10/y,a[A]=(a[A]||0)+10/y,a[C]=(a[C]||0)+10/y,a[B]=(a[B]||0)+10/y):-1!==B&&0===f[B]?(a[V]=(a[V]||0)+10/y,a[C]=(a[C]||0)+10/y):-1!==A&&0===f[A]?(a[V]=(a[V]||0)+10/y,a[w]=(a[w]||0)+10/y):a[V]=(a[V]||0)+2/y):2===m?y===r-1?(-1!==w&&0===f[w]&&(a[w]=(a[w]||0)+160/y),-1!==C&&0===f[C]&&(a[C]=(a[C]||0)+160/y)):y===r-2?(-1!==w&&0===f[w]&&-1!==A&&0===f[A]&&(a[w]=(a[w]||0)+12/y,a[A]=(a[A]||0)+12/y),-1!==C&&0===f[C]&&-1!==B&&0===f[B]&&(a[C]=(a[C]||0)+12/y,a[B]=(a[B]||0)+12/y)):y===r-3&&(-1!==w&&0===f[w]&&-1!==A&&0===f[A]&&-1!==P&&0!==f[P]&&(u-f[P])%2==1&&(a[w]=(a[w]||0)+12/y,a[A]=(a[A]||0)+12/y),-1!==C&&0===f[C]&&-1!==B&&0===f[B]&&-1!==H&&0!==f[H]&&(u-f[H])%2==1&&(a[C]=(a[C]||0)+12/y,a[B]=(a[B]||0)+12/y)):3===m?y>=r-1?a[V]=(a[V]||0)+160/y:y===r-2?(a[V]=(a[V]||0)+12/y,-1!==w&&0===f[w]&&(-1===A||0===f[A]||(u-f[A])%2!=0?a[w]=(a[w]||0)+12/y:a[w]=(a[w]||0)+2/y),-1!==C&&0===f[C]&&(-1===B||0===f[B]||(u-f[B])%2!=0?a[C]=(a[C]||0)+12/y:a[C]=(a[C]||0)+2/y)):y===r-3&&(-1!==C&&0===f[C]&&-1!==B&&0!==f[B]&&(u-f[B])%2==1?(a[V]=(a[V]||0)+12/y,a[C]=(a[C]||0)+12/y):-1!==w&&0===f[w]&&-1!==A&&0!==f[A]&&(u-f[A])%2==1&&(a[V]=(a[V]||0)+12/y,a[w]=(a[w]||0)+12/y)):5===m&&y>=r-1&&(a[V]=(a[V]||0)+160/y)}var G=Object.keys(a),K=G.length,Q=new Array(K);for(s=0;s<K;s++)Q[s]={p:G[s],n:a[G[s]]},p[G[s]]=a[G[s]];for(Q.sort(function(n,t){return t.n-n.n||n.p-t.p}),s=0;s<e.length;s++)for(d=0;d<e[s].n.length;d++){e[s].n[d].p.sort(function(n,t){return n-t});var V,X;v=x[k[e[s].n[d].d]],m=e[s].n[d].t,y=e[s].n[d].n,M=v.x+v.y*l,w=e[s].n[d].p[e[s].n[d].p.length-1]-M,E=e[s].n[d].p[e[s].n[d].p.length-1]%l-v.x,N=(e[s].n[d].p[e[s].n[d].p.length-1]-E-v.x)/l-v.y,C=e[s].n[d].p[0]+M,U=e[s].n[d].p[0]%l+v.x,_=(e[s].n[d].p[0]-U+v.x)/l+v.y,A=w-M,L=E-v.x,j=N-v.y,B=C+M,O=U+v.x,D=_+v.y,P=A-M,R=L-v.x,I=j-v.y,H=B+M,z=O+v.x,T=D+v.y,W=R-v.x,S=I-v.y,J=z+v.x,$=T+v.y;if(m%2)for(q=1;q<e[s].n[d].p.length;q++)if(e[s].n[d].p[q]-e[s].n[d].p[q-1]>-M){V=C-M*(q+1),X=q;break}(W<0||W>=l||S<0||S>=h)&&(-1,(R<0||R>=l||I<0||I>=h)&&(P=-1,(L<0||L>=l||j<0||j>=h)&&(A=-1,(E<0||E>=l||N<0||N>=h)&&(w=-1)))),(J<0||J>=l||$<0||$>=h)&&(-1,(z<0||z>=l||T<0||T>=h)&&(H=-1,(O<0||O>=l||D<0||D>=h)&&(B=-1,(U<0||U>=l||_<0||_>=h)&&(C=-1)))),0===m?y===r-1?(i[w]=(i[w]||0)+400/y,i[C]=(i[C]||0)+400/y):y===r-2?(-1!==A?0===f[A]?(i[w]=(i[w]||0)+50/y,i[A]=(i[A]||0)+24/y):(u-f[A])%2==1&&(i[w]=(i[w]||0)+24/y):i[w]=(i[w]||0)+24/y,-1!==B?0===f[B]?(i[C]=(i[C]||0)+50/y,i[B]=(i[B]||0)+24/y):(u-f[B])%2==1&&(i[C]=(i[C]||0)+24/y):i[C]=(i[C]||0)+24/y):y===r-3&&(-1!==A&&0!==f[A]&&-1!==B&&0!==f[B]||(-1!==A&&(0===f[A]?-1!==P&&(0===f[P]?(i[w]=(i[w]||0)+14/y,i[A]=(i[A]||0)+12/y):(u-f[P])%2==0?(i[w]=(i[w]||0)+46/y,i[A]=(i[A]||0)+42/y):i[w]=(i[w]||0)+12/y):i[w]=(i[w]||0)+2/y),-1!==B&&(0===f[B]?-1!==H&&(0===f[H]?(i[C]=(i[C]||0)+14/y,i[B]=(i[B]||0)+12/y):(u-f[H])%2==0?(i[C]=(i[C]||0)+46/y,i[B]=(i[B]||0)+42/y):i[C]=(i[C]||0)+12/y):i[C]=(i[C]||0)+2/y))):1===m?y>=r-1?i[V]=(i[V]||0)+400/y:y===r-2?(i[V]=(i[V]||0)+50/y,-1!==A&&0===f[A]&&-1!==B&&0===f[B]?1===X?(i[w]=(i[w]||0)+42/y,i[C]=(i[C]||0)+18/y):(i[w]=(i[w]||0)+18/y,i[C]=(i[C]||0)+42/y):-1!==A&&0===f[A]?1===X?(i[w]=(i[w]||0)+42/y,i[C]=(i[C]||0)+2/y):(i[w]=(i[w]||0)+18/y,i[C]=(i[C]||0)+2/y):-1!==B&&0===f[B]?1===X?(i[w]=(i[w]||0)+2/y,i[C]=(i[C]||0)+18/y):(i[w]=(i[w]||0)+2/y,i[C]=(i[C]||0)+42/y):(i[w]=(i[w]||0)+2/y,i[C]=(i[C]||0)+2/y)):y===r-3&&(-1!==A&&0===f[A]&&-1!==B&&0===f[B]?(i[V]=(i[V]||0)+14/y,i[w]=(i[w]||0)+12/y,i[C]=(i[C]||0)+12/y):-1!==A&&0===f[A]?(i[V]=(i[V]||0)+12/y,-1!==B&&(u-f[B])%2==0?(i[V]=(i[V]||0)+1/y,i[C]=(i[C]||0)+42/y):i[w]=(i[w]||0)+6/y,i[C]=(i[C]||0)+2/y):-1!==B&&0===f[B]?(i[V]=(i[V]||0)+12/y,i[w]=(i[w]||0)+2/y,-1!==A&&(u-f[A])%2==0?(i[V]=(i[V]||0)+1/y,i[w]=(i[w]||0)+42/y):i[C]=(i[C]||0)+6/y):(i[V]=(i[V]||0)+2/y,-1!==B&&(u-f[B])%2==0&&(i[V]=(i[V]||0)+2/y,i[C]=(i[C]||0)+42/y),-1!==A&&(u-f[A])%2==0&&(i[V]=(i[V]||0)+2/y,i[w]=(i[w]||0)+42/y))):2===m?y===r-1?(-1!==w&&0===f[w]&&(i[w]=(i[w]||0)+400/y),-1!==C&&0===f[C]&&(i[C]=(i[C]||0)+400/y)):y===r-2?(-1!==w&&0===f[w]&&-1!==A&&0===f[A]&&(i[w]=(i[w]||0)+42/y,i[A]=(i[A]||0)+42/y),-1!==C&&0===f[C]&&-1!==B&&0===f[B]&&(i[C]=(i[C]||0)+42/y,i[B]=(i[B]||0)+42/y)):y===r-3&&(-1!==A&&0!==f[A]&&-1!==B&&0!==f[B]||(0===f[w]&&-1!==A&&(0===f[A]?-1!==P&&(0===f[P]?(i[w]=(i[w]||0)+2/y,i[A]=(i[A]||0)+1/y):(u-f[P])%2==0?(i[w]=(i[w]||0)+46/y,i[A]=(i[A]||0)+42/y):i[w]=(i[w]||0)+2/y):i[w]=(i[w]||0)+2/y),0===f[C]&&-1!==B&&(0===f[B]?-1!==H&&(0===f[H]?(i[C]=(i[C]||0)+2/y,i[B]=(i[B]||0)+1/y):(u-f[H])%2==0?(i[C]=(i[C]||0)+46/y,i[B]=(i[B]||0)+42/y):i[C]=(i[C]||0)+2/y):i[C]=(i[C]||0)+2/y))):3===m?y>=r-1?i[V]=(i[V]||0)+400/y:y===r-2?(i[V]=(i[V]||0)+42/y,0===f[w]&&(-1!==A?0===f[A]?i[w]=(i[w]||0)+18/y:(u-f[A])%2==1&&(i[w]=(i[w]||0)+2/y):i[w]=(i[w]||0)+2/y),0===f[C]&&(-1!==B?0===f[B]?i[C]=(i[C]||0)+18/y:(u-f[B])%2==1&&(i[C]=(i[C]||0)+2/y):i[C]=(i[C]||0)+2/y)):y===r-3&&(-1!==w&&0===f[w]&&-1!==A&&0!==f[A]&&(u-f[A])%2==0&&(i[V]=(i[V]||0)+10/y,i[w]=(i[w]||0)+10/y),-1!==C&&0===f[C]&&-1!==B&&0!==f[B]&&(u-f[B])%2==0&&(i[V]=(i[V]||0)+10/y,i[C]=(i[C]||0)+10/y)):5===m&&y>=r-1&&(i[V]=(i[V]||0)+400/y)}var Y=Object.keys(i),Z=Y.length,nn=new Array(Z);for(s=0;s<Z;s++)nn[s]={p:Y[s],n:i[Y[s]]},p[Y[s]]=(p[Y[s]]||0)+i[Y[s]];for(nn.sort(function(n,t){return t.n-n.n||n.p-t.p}),s=u-3;s>=0;s-=2){var tn,en,rn,on=F(g[s],2);for(q=0;q<on.length;q++)tn=on[q].p,en=on[q].dx,rn=on[q].dy,0===f[tn]?1===en&&1===rn?c[tn]=(c[tn]||0)+.1:rn+en===1?c[tn]=(c[tn]||0)+.2:rn+en===2?c[tn]=(c[tn]||0)+.02:rn+en===3&&(c[tn]=(c[tn]||0)+.05):(u-f[tn])%2&&F(tn,2).forEach(function(n){0===f[n.p]&&(1===n.dx&&1===n.dy?c[n.p]=(c[n.p]||0)+.05:n.dy+n.dx===1&&(c[n.p]=(c[n.p]||0)+.05))})}var an=Object.keys(c),cn=an.length,pn=new Array(cn);for(s=0;s<cn;s++)pn[s]={p:an[s],n:c[an[s]]},c[an[s]]>0&&(p[an[s]]=(p[an[s]]||0)+c[an[s]]);pn.sort(function(n,t){return t.n-n.n||n.p-t.p});var ln=Object.keys(p),sn=ln.length,hn=[];for(0===sn&&(F(g[u-2],2).forEach(function(n){0===f[n.p]&&(1===n.dx&&1===n.dy?p[n.p]=(p[n.p]||0)+.2:n.dy+n.dx===1?p[n.p]=(p[n.p]||0)+.5:n.dy+n.dx===2?p[n.p]=(p[n.p]||0)+.01:n.dy+n.dx===3&&(p[n.p]=(p[n.p]||0)+.02))}),sn=(ln=Object.keys(p)).length),s=0;s<sn;s++)p[ln[s]]>0&&hn.push({p:ln[s],n:p[ln[s]]});return hn.sort(function(n,t){return t.n-n.n||n.p-t.p}),[Q,nn,pn,hn]}function _(n){var t=void 0===n?U():n,e=[];if(t[3].length>0){e.push(t[3][0]);for(var r=1;r<t[3].length&&Math.floor(t[3][r].n)>=Math.floor(e[0].n);r++)e.push(t[3][r])}return e}function A(n,e){return e=void 0===e?u:e,n>0&&!m?_().map(function(o){-1==o.p&&console.log(g);var a,i,c,p=+o.p%l,s=(+o.p-p)/l,h=O(),x=0,y=0,k=0;return f[+o.p]=u,g[u-1]=+o.p,C(p,s),u+=1,c=U(),v[+o.p]>=r&&(t=(u-1)%2,m=!0),u===d&&(m=!0),a=O(),Object.keys(b).forEach(function(n){b[n].forEach(function(t){Math.abs(e-f[n])%2==0?0===t.t?t.n===r?y+=1e3/t.n:t.n===r-1?y+=80/t.n:t.n===r-2?y+=24/t.n:t.n===r-3&&(y+=6/t.n):1===t.t?t.n>=r-1?y+=40/t.n:t.n===r-2?y+=18/t.n:t.n===r-3&&(y+=6/t.n):2===t.t?t.n===r?y+=1e3/t.n:t.n===r-1?y+=40/t.n:t.n===r-2&&(y+=6/t.n):3===t.t?t.n===r?y+=1e3/t.n:t.n===r-1?y+=40/t.n:t.n===r-2&&(y+=3/t.n):4===t.t?t.n===r&&(y+=1e3/t.n):5===t.t&&t.n>=r-1&&(y+=40/t.n):0===t.t?t.n===r?k-=1e3/t.n:t.n===r-1?k-=80/t.n:t.n===r-2?k-=24/t.n:t.n===r-3&&(k-=6/t.n):1===t.t?t.n>=r-1?k-=40/t.n:t.n===r-2?k-=18/t.n:t.n===r-3&&(k-=6/t.n):2===t.t?t.n===r?k-=1e3/t.n:t.n===r-1?k-=40/t.n:t.n===r-2&&(k-=6/t.n):3===t.t?t.n===r?k-=1e3/t.n:t.n===r-1?k-=40/t.n:t.n===r-2&&(k-=3/t.n):4===t.t?t.n===r&&(k-=1e3/t.n):5===t.t&&t.n>=r-1&&(k-=40/t.n)})}),x=(u-e)%2==1?c[3].reduce(function(n,t){return n+Math.floor(t.n)},0):-c[3].reduce(function(n,t){return n+Math.floor(t.n)},0),i=_(c).length<10?{p:+o.p,c:a,h:A(n-1,e),s:x,s2:y,s3:k}:{p:+o.p,c:a,h:[],s:x,s2:y,s3:k},function(n){u=n.cur,m=n.end,t=n.wp,g=n.hist,f=n.map,v=n.cm,b=n.pps,n=null}(h),i}):[]}function L(){if(!m){if(1===u)M(Math.floor(l/2),Math.floor(h/2));else{for(var n=function n(t){var e=[];return t.forEach(function(t){var r=n(t.h);r.length>0?r.forEach(function(n){e.push([[t.p].concat(n[0]),t.s+n[1],t.s2+n[2],t.s3+n[3]])}):e.push([[t.p],t.s,t.s2,t.s3])}),e}(A(6)).sort(function(n,t){return t[3]-n[3]||t[2]-n[2]||t[1]-n[1]}),t={},e=[],r=0;r<n.length&&R(n[r][3])+R(n[r][2])<=R(n[0][3])+R(n[0][2])+2;r++)t[n[r][0][0]]=(t[n[r][0][0]]||0)+1;Object.keys(t).reduce(function(n,r){return t[r]>n?(e=[r],t[r]):(t[r]===n&&e.push(r),n)},0);var o=+e[Math.min(Math.floor(Math.random()*e.length),e.length-1)],a=o%l;M(a,(o-a)/l)}z(),I(),H()}}function j(n){m=!0,t=n,console.log("Player",n+1,"wins.")}function B(){m=!0,console.log("Tie")}function O(){var n={};return n.cur=u,n.end=m,n.wp=t,n.hist=new Uint16Array(d),n.hist.set(g),n.map=new Uint16Array(d),n.map.set(f),n.cm=new Uint16Array(d),n.cm.set(v),n.pps={},Object.keys(b).forEach(function(t){n.pps[t]=[],b[t].forEach(function(e){n.pps[t].push({t:e.t,n:e.n,p:e.p.slice(),d:e.d})})}),n}function D(n,e){n=isFinite(n)?+n:o,e=isFinite(e)?+e:a,d=(l=n<r+2?r+2:n>256?256:n)*(h=e<r+2?r+2:e>256?256:e),u=1,f=new Uint16Array(d),g=new Uint16Array(d),v=new Uint16Array(d),b={},t=void 0,m=!1}function P(){for(var n=document.getElementsByClassName("hint");n.length;)n[0].title="",n[0].className="point"}function R(n){return(n=Math.floor(n))>=400?1:n>=160?2:n>=64?3:n>=42?4:n>=36?5:n>=28?6:n>=24?7:n>=14?8:n>=10?9:n>=0?10:0}function I(){for(var n=document.getElementsByClassName("last");n.length>0;)n[0].className=n[0].className.replace(/(?:^|\s+)last(?:\s+|$)/g,"")}function H(){var n=document.getElementsByClassName("point");u>1&&(n[g[u-2]].className+=" last")}function z(){for(var n=document.getElementsByClassName("point"),r=0;r<n.length;r++){var o=n[r].dataset.p;f[o]>0?(n[o].className="point p"+((f[o]-1)%2+1),n[o].title=f[o],n[o].removeEventListener("click",T)):(n[o].className="point",n[o].title="",n[o].addEventListener("click",T)),v[o]>0?n[r].firstChild.className="cir c"+Math.min(v[o],5):n[r].firstChild.className="cir",m&&n[r].removeEventListener("click",T)}m?(document.getElementById("dg_"+e).className="",void 0===t?alert("It`s a tie."):alert("Player "+(t+1)+" wins.")):document.getElementById("dg_"+e).className="active p"+((u-1)%2+1)}function T(n){0===n.button&&(n.preventDefault(),function(n){n.removeEventListener("click",T),n.className="point p"+((u-1)%2+1),n.title=u,M(+n.dataset.x,+n.dataset.y);for(var t=document.getElementsByClassName("point"),e=0;e<t.length;e++){var r=t[e].dataset.p;v[r]>0?t[e].firstChild.className="cir c"+Math.min(v[r],5):t[e].firstChild.className="cir",m&&t[e].removeEventListener("click",T)}}(this),P(),I(),H(),m?(document.getElementById("dg_"+e).className="",void 0===t?alert("It`s a tie."):alert("Player "+(t+1)+" wins.")):(document.getElementById("dg_"+e).className="active p"+((u-1)%2+1),p&&setTimeout(L,100)))}function W(){var n=document.createElement("div");n.id="dg_"+e;for(var t=0;t<h;t++){for(var r=document.createElement("div"),o=0;o<l;o++){var a=document.createElement("div");a.dataset.p=o+t*l,a.className="point",a.dataset.x=o,a.dataset.y=t,a.addEventListener("click",T),a.appendChild(document.createElement("div")),a.firstChild.className="cir",a.appendChild(document.createElement("div")),a.lastChild.className="bo"+(0===o||0===t?"":" l1"),a.appendChild(document.createElement("div")),a.lastChild.className="bo"+(o===l-1||0===t?"":" l2"),a.appendChild(document.createElement("div")),a.lastChild.className="bo"+(0===o||t===h-1?"":" l3"),a.appendChild(document.createElement("div")),a.lastChild.className="bo"+(o===l-1||t===h-1?"":" l4"),r.appendChild(a)}r.appendChild(document.createElement("div")),r.lastChild.style.clear="both",n.appendChild(r)}return n.className="active p1",n.onmousedown=function(n){n.preventDefault()},n}function S(){var n=document.getElementById("gs_"+e),t=Math.min(i,c),r=t/5;n&&n.parentNode.removeChild(n),s=document.createElement("style"),s.id="gs_"+e,s.innerHTML="#dg_"+e+" { width: "+l*(i+2)+"px; height: "+h*(c+2)+"px; display: inline-block; box-sizing: border-box; } #dg_"+e+" .point { background-color: #BBBBBB;}#dg_"+e+".active.p1 .point { background-color: #AAAAAA;}#dg_"+e+".active.p2 .point { background-color: #CCCCCC;}.point { background-color: #EEE; width: "+i+"px; height: "+c+"px; float: left; line-height: "+c+"px; padding: 1px; position: relative; overflow: hidden; } .point > .cir { width: "+t+"px; height: "+t+"px; border-radius: "+t/2+"px; z-index: 10; position: absolute; top: "+(1+Math.abs(c-t)/2)+"px; left: "+(1+Math.abs(i-t)/2)+"px; } .active.p1 .point > .cir:hover,.active.p1 .point.hint > .cir:hover { background-color: #F4F4F4; cursor: pointer; box-shadow: inset 0 0 "+t/2+"px rgba(0, 0, 0, 0.3); } .active.p2 .point > .cir:hover,.active.p2 .point.hint > .cir:hover { background-color: #666666; cursor: pointer; box-shadow: inset 0 0 "+t/2+"px rgba(0, 0, 0, 0.3); } .p1 > .cir,.active .p1.point > .cir:hover { background-color: #F4F4F4; cursor: default; box-shadow: inset 0 0 "+(t+2)+"px rgba(255, 255, 255, 0.1); } .p2 > .cir,.active .p2.point > .cir:hover { background-color: #666666; cursor: default; box-shadow: inset 0 0 "+(t+2)+"px rgba(30, 30, 30, 0.6); } .bo { display: none; position: absolute; width: "+(i/2+r+1)+"px; height: "+(c/2+r+1)+"px; box-shadow: inset 0 0 "+r/2+"px #111; } .l1 { display: block; top: -"+r+"px; left: -"+r+"px; } .l2 { display: block; top: -"+r+"px; right: -"+r+"px; } .l3 { display: block; bottom: -"+r+"px; left: -"+r+"px; } .l4 { display: block; bottom: -"+r+"px; right: -"+r+"px; } .p1.point > .cir.c3,.active .p1.point > .cir.c3:hover { background-color: #F0F0F0; } .p1.point > .cir.c4,.active .p1.point > .cir.c4:hover { background-color: #F6F6F6; } .p1.point > .cir.c5,.active .p1.point > .cir.c5:hover { background-color: #FFFFFF; } .p2.point > .cir.c3,.active .p2.point > .cir.c3:hover { background-color: #555555; } .p2.point > .cir.c4,.active .p2.point > .cir.c4:hover { background-color: #444444; } .p2.point > .cir.c5,.active .p2.point > .cir.c5:hover { background-color: #333333; }.active .point.hint > .cir { box-sizing: border-box; border: 1px solid rgba(255,255,255,0); }.active .point.hint.def > .cir { border: 1px solid rgba(50,200,200,0.8); box-shadow: inset 0 0 "+t/2+"px rgba(50, 200, 200, 0.2); }.active .point.hint.atk > .cir { border: 1px solid rgba(200,200,50,0.8); box-shadow: inset 0 0 "+t/2+"px rgba(200, 200, 50, 0.2); }.active .point.hint.def.atk > .cir { border: 1px solid rgba(0,100,0,0.95); box-shadow: inset 0 0 "+t+"px rgba(0, 200, 0, 0.8); }.active .point.hint.r1 > .cir { background-color: rgba(0,0,0,0.95); }.active .point.hint.r2 > .cir { background-color: rgba(33,33,33,0.9); }.active .point.hint.r3 > .cir { background-color: rgba(66,66,66,0.85); }.active .point.hint.r4 > .cir { background-color: rgba(100,100,100,0.8); }.active .point.hint.r5 > .cir { background-color: rgba(125,125,125,0.75); }.active .point.hint.r6 > .cir { background-color: rgba(150,150,150,0.7); }.active .point.hint.r7 > .cir { background-color: rgba(175,175,175,0.65); }.active .point.hint.r8 > .cir { background-color: rgba(200,200,200,0.6); }.active .point.hint.r9 > .cir { background-color: rgba(225,225,225,0.55); }.active .point.hint.r10 > .cir { background-color: rgba(250,250,250,0.5); }.active .point.last.p1 > .cir,.active .point.last.p1 > .cir:hover { box-sizing: border-box; border: 1px solid rgba(10, 10, 10, 0.6); box-shadow: inset 0 0 "+(t+2)+"px rgba(255, 255, 255, 1); }.active .point.last.p2 > .cir,.active .point.last.p2 > .cir:hover { box-sizing: border-box; border: 1px solid rgba(240, 240, 240, 0.6); box-shadow: inset 0 0 "+(t+2)+"px rgba(50, 50, 50, 1); }",document.body.appendChild(s)}return x.U.r=x.D,x.UR.r=x.DL,x.R.r=x.L,x.RD.r=x.LU,x.D.r=x.U,x.DL.r=x.UR,x.L.r=x.R,x.LU.r=x.RD,n.pps=function(){return b},n.current=function(){return u},n.end=function(){return m},Object.defineProperty(n,"id",{value:"dg_"+e}),n.hint=U,n.reset=D,n.save=function(){return JSON.stringify({w:l,h:h,d:Array.prototype.slice.call(g,0,u-1)})},n.load=function(n){try{var t=JSON.parse(n);D(t.w,t.h);for(var e=0;e<t.d.length;e++){var r=t.d[e]%t.w;M(r,(t.d[e]-r)/t.w)}}catch(n){console.log(n)}},n.redo=function(){var n=Array.prototype.slice.call(g,0,Math.max(u-(p?3:2),0));D(l,h);for(var t=0;t<n.length;t++){var e=n[t]%l;M(e,(n[t]-e)/l)}},n.refresh_dom=z,n.refresh_hint=function(){P();for(var n,t=U(),e=document.getElementsByClassName("point"),r=(Math.min.apply(null,t[3].map(function(n){return R(n.n)||1/0})),0);r<t[3].length;r++)(n=R(t[3][r].n))>0&&n<11?(e[t[3][r].p].className="point hint r"+n,e[t[3][r].p].title="R"+R(t[3][r].n)+"("+Math.floor(t[3][r].n)+")"):e[t[3][r].p].className="point hint";for(r=0;r<t[0].length;r++)(n=R(t[0][r].n))<11&&(e[t[0][r].p].className+=" def");for(r=0;r<t[1].length;r++)(n=R(t[1][r].n))<11&&(e[t[1][r].p].className+=" atk")},n.clear_hint=P,n.clear_last=I,n.last_hint=H,n.create_dom=function(n,t,r){D(t,r);var o=W(),a=document.getElementById("dg_"+e);a&&a.parentNode.removeChild(a),n instanceof HTMLElement?n.appendChild(o):document.body.appendChild(o),S()},n.config=function(n){if("string"==typeof n)switch(n){case"auto":return p;case"col":return l;case"row":return h;case"vp":return r;case"pointWidth":return i;case"pointHeight":return c}else{var t=!1,s=!1;if(n.hasOwnProperty("autoFitScreen")){var d=document.body.clientWidth,u=Math.min(document.body.clientHeight,screen.availHeight),f=Math.min(d,u);f>=1600?(c=i=50,o=a=25):f>=1200?(c=i=42,o=a=25):f>=1e3?(c=i=30,o=a=24):f>=900?(c=i=26,o=a=25):f>=700?(c=i=23,o=a=25):f>=600?(c=i=23,o=a=21):f>=400?(c=i=22,o=a=16):f>=360?(c=i=21,o=a=16):f>=320?(c=i=18,o=a=15):f>=300?(c=i=17,o=a=14):f>=250?(c=i=16,o=a=12):f>=200?(c=i=14,o=a=10):f>=160?(c=i=12,o=a=9):f>=100?(c=i=10,o=a=7):f>=0&&(c=i=5,o=a=5),t=!0,s=!0}n.hasOwnProperty("auto")&&(p=!!n.auto),n.hasOwnProperty("pointHeight")&&(c=Math.min(Math.max(+n.pointHeight,16),80),t=!0),n.hasOwnProperty("pointWidth")&&(i=Math.min(Math.max(+n.pointWidth,16),80),t=!0),n.hasOwnProperty("col")&&(o=Math.min(Math.max(+n.col,2*r+1),127),s=!0),n.hasOwnProperty("row")&&(a=Math.min(Math.max(+n.row,2*r+1),127),s=!0),t&&S(),s&&function(){D();var n=W(),t=document.getElementById("dg_"+e),r=t?t.parentNode:document.body;t&&t.parentNode.removeChild(t),r.appendChild(n),S()}()}},n.auto_place=function(){L(),p&&L()},n}(P5g);