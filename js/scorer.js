/* © 2026 AusPropertyIQ. All rights reserved. */
function scoreVacancy(vac){return vac<1.0?15:vac<1.5?12:vac<2.0?9:vac<2.5?5:0;}
function scoreDSR(dsr){return dsr>=70?15:dsr>=63?12:dsr>=58?9:dsr>=55?5:dsr>=52?2:0;}
function scoreInfraJobs(infraJobs){switch(infraJobs){case'major':return 15;case'strong':return 12;case'moderate':return 9;case'weak':return 5;default:return 0;}}
function scoreCycle(cycle){switch(cycle){case'Early':return 15;case'Early-Mid':return 12;case'Mid':return 9;case'Late':return 3;case'Peak':return 0;default:return 9;}}
function scoreYield(y){return y>=6.5?10:y>=6.0?9:y>=5.5?7:y>=5.0?5:y>=4.5?2:0;}
function scoreYieldQuality(y,vac){if(y>=6.0&&vac<1.0)return 10;if(y>=5.5&&vac<1.5)return 8;if(y>=5.0&&vac<2.0)return 5;if(y>=4.5)return 3;return 0;}
function scoreOwnerOcc(dsr,vac){if(dsr>=65&&vac<0.5)return 10;if(dsr>=60&&vac<1.0)return 8;if(dsr>=55&&vac<1.5)return 5;if(dsr>=52&&vac<2.0)return 2;return 0;}
function scoreCycleRisk(cycle){switch(cycle){case'Early':return 5;case'Early-Mid':return 4;case'Mid':return 3;case'Late':return 1;case'Peak':return 0;default:return 3;}}
function scoreVacRisk(vac){return vac<0.5?5:vac<1.0?4:vac<2.0?3:vac<3.0?1:0;}
function scoreMasterSuburb(s){const sc={};sc.vacancy=scoreVacancy(s.vac);sc.dsr=scoreDSR(s.dsr);sc.infraJobs=scoreInfraJobs(s.infraJobs);sc.cycle=scoreCycle(s.cycle);sc.yield_=scoreYield(s.yield);sc.yieldQual=scoreYieldQuality(s.yield,s.vac);sc.ownerOcc=scoreOwnerOcc(s.dsr,s.vac);sc.cycleRisk=scoreCycleRisk(s.cycle);sc.vacRisk=scoreVacRisk(s.vac);sc.demandSupply=sc.vacancy+sc.dsr;sc.growthDrivers=sc.infraJobs+sc.cycle;sc.cashFlow=sc.yield_+sc.yieldQual;sc.ownerOccTotal=sc.ownerOcc;sc.riskControl=sc.cycleRisk+sc.vacRisk;sc.total=sc.demandSupply+sc.growthDrivers+sc.cashFlow+sc.ownerOccTotal+sc.riskControl;return sc;}
function getGrade(total){if(total>=90)return{grade:'A+',label:'Elite Buy',cls:'g-aplus',chipSuffix:'aplus'};if(total>=80)return{grade:'A',label:'Strong Buy',cls:'g-a',chipSuffix:'a'};if(total>=70)return{grade:'B',label:'Good Opportunity',cls:'g-b',chipSuffix:'b'};if(total>=60)return{grade:'C',label:'Watchlist',cls:'g-c',chipSuffix:'c'};return{grade:'D',label:'Reject',cls:'g-d',chipSuffix:'d'};}
function scoreColor(pts,max){const pct=pts/max;if(pct>=0.8)return'#27b389';if(pct>=0.6)return'#3d8ef0';if(pct>=0.4)return'#e08c2a';return'#e04a4a';}
function totalScoreColor(total){if(total>=90)return'var(--grade-aplus)';if(total>=80)return'var(--grade-a)';if(total>=70)return'var(--grade-b)';if(total>=60)return'var(--grade-c)';return'var(--grade-d)';}