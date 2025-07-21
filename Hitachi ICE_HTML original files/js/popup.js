var winSet = 'toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,';

var w_SVGA = 'width=800,height=600';
var w_SVGA_H = 'width=1000,height=750';

var w_1 = 'width=450,height=450';
var w_2 = 'width=500,height=600';
var w_3 = 'width=600,height=600';
var w_4 = 'width=650,height=700';
var w_5 = 'width=750,height=850';
var w_6 = 'width=850,height=900';
var w_7 = 'width=750,height=750';

var w_V1 = 'width=400,height=600';
var w_V2 = 'width=700,height=950';
var w_V3 = 'width=900,height=1100';
var w_V4 = 'width=400,height=700';

function openBlkWin(url,winname) {newwin = window.open(url, winname, winSet + w_SVGA); newwin.focus();}
function openBlkWinSV(url,winname) {newwin = window.open(url, winname, winSet + w_SVGA_H); newwin.focus();}

function openBlkWinH1(url,winname) {newwin = window.open(url, winname, winSet + w_1); newwin.focus();}
function openBlkWinH2(url,winname) {newwin = window.open(url, winname, winSet + w_2); newwin.focus();}
function openBlkWinH3(url,winname) {newwin = window.open(url, winname, winSet + w_3); newwin.focus();}
function openBlkWinH4(url,winname) {newwin = window.open(url, winname, winSet + w_4); newwin.focus();}
function openBlkWinH5(url,winname) {newwin = window.open(url, winname, winSet + w_5); newwin.focus();}
function openBlkWinH6(url,winname) {newwin = window.open(url, winname, winSet + w_6); newwin.focus();}
function openBlkWinH7(url,winname) {newwin = window.open(url, winname, winSet + w_7); newwin.focus();}

function openBlkWinV1(url,winname) {newwin = window.open(url, winname, winSet + w_V1); newwin.focus();}
function openBlkWinV2(url,winname) {newwin = window.open(url, winname, winSet + w_V2); newwin.focus();}
function openBlkWinV3(url,winname) {newwin = window.open(url, winname, winSet + w_V3); newwin.focus();}
function openBlkWinV4(url,winname) {newwin = window.open(url, winname, winSet + w_V4); newwin.focus();}


function openBlkWinSP1(url,winname) {newwin = window.open(url, winname, winSet + 'screen.width-30,screen.width-30'); newwin.focus();}
function openBlkWinSP2(imageurl,wid,hei){newwin = window.open (imageurl, "largeImage", winSet + 'width=' + wid + ',height=' + hei); newwin.focus();}



function yearnow() { document.write("-" + (new Date()).getFullYear());}

