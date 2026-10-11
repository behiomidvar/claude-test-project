/* Jalali (Shamsi) calendar math — SHARED INTERNAL HELPER, not a public component.
   The jalaali-js algorithm: a genuine Shamsi calendar, not a relabelled Gregorian one.
   This file has no sibling .d.ts on purpose, so the compiler treats it as a plain
   module rather than registering a second date component. It used to be duplicated
   between ShamsiDatePicker (now retired) and DateOfBirthFieldGroup.
   Gregorian conversion exists ONLY for age math and never surfaces to the user. */
const faDigits=(v)=>String(v).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[+d]);
function div(a,b){return ~~(a/b);}
function mod(a,b){return a-~~(a/b)*b;}
function jalCalLeap(jy){
  const bl=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
  let bi=bl.length,jp=bl[0],jm,jump=0,leap,n,i;
  for(i=1;i<bi;i+=1){jm=bl[i];jump=jm-jp;if(jy<jm)break;jp=jm;}
  n=jy-jp;
  if(jump-n<6)n=n-jump+div(jump+4,33)*33;
  leap=mod(mod(n+1,33)-1,4);
  if(leap===-1)leap=4;
  return leap;
}
function isLeap(jy){return jalCalLeap(jy)===0;}
function jMonthLen(jy,jm){if(jm<=6)return 31;if(jm<=11)return 30;return isLeap(jy)?30:29;}
function g2d(gy,gm,gd){
  let d=div((gy+div(gm-8,6)+100100)*1461,4)+div(153*mod(gm+9,12)+2,5)+gd-34840408;
  d=d-div(div(gy+100100+div(gm-8,6),100)*3,4)+752;return d;
}
function jalCalMarch(jy){
  const gy=jy+621;
  const bl=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
  let bi=bl.length,jp=bl[0],jm,jump=0,leapJ=-14,n,i;
  for(i=1;i<bi;i+=1){jm=bl[i];jump=jm-jp;if(jy<jm)break;leapJ=leapJ+div(jump,33)*8+div(mod(jump,33),4);jp=jm;}
  n=jy-jp;
  leapJ=leapJ+div(n,33)*8+div(mod(n,33)+3,4);
  if(mod(jump,33)===4&&jump-n===4)leapJ+=1;
  const leapG=div(gy,4)-div((div(gy,100)+1)*3,4)-150;
  return 20+leapJ-leapG;
}
function j2g(jy,jm,jd){
  const gy=jy+621, march=jalCalMarch(jy);
  const jdn=g2d(gy,3,march)+(jm-1)*31-div(jm,7)*(jm-7)+jd-1;
  return d2g(jdn);
}
function d2g(jdn){
  let j=4*jdn+139361631;
  j=j+div(div(4*jdn+183187720,146097)*3,4)*4-3908;
  const i=div(mod(j,1461),4)*5+308;
  const gd=div(mod(i,153),5)+1, gm=mod(div(i,153),12)+1, gy=div(j,1461)-100100+div(8-gm,6);
  return {gy,gm,gd};
}
function g2j(gy,gm,gd){
  const jdn=g2d(gy,gm,gd);
  let jy=gy-621, march=jalCalMarch(jy);
  const jdn1=g2d(jy+621,3,march);
  let k=jdn-jdn1, jm, jd;
  if(k>=0){ if(k<=185){jm=1+div(k,31);jd=mod(k,31)+1;return{jy,jm,jd};} k-=186; }
  else { jy-=1; k+=isLeap(jy)?180:179; }
  jm=7+div(k,30); jd=mod(k,30)+1; return{jy,jm,jd};
}
/** day-of-week for a Jalali date, 0=Saturday … 6=Friday. */
function jDow(jy,jm,jd){const g=j2g(jy,jm,jd);const wd=new Date(g.gy,g.gm-1,g.gd).getDay();return (wd+1)%7;}

const MONTHS=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
/** Format a {jy,jm,jd} value as a Persian string, e.g. "۱۲ خرداد ۱۳۷۵". */
function formatShamsi(v){ if(!v)return ''; return `${faDigits(v.jd)} ${MONTHS[v.jm-1]} ${faDigits(v.jy)}`; }
export { div, mod, isLeap, jMonthLen, g2d, jalCalMarch, d2g, j2g, g2j, jDow, MONTHS, formatShamsi, faDigits };
