var main,logo,quarks,quarksElements,quarksContainer,quarkyLogoContainer,quarkyTextPath,interactiveTextPath,interactiveLetters,quarkyLogoPath,bgLogo,ball,reserved;
var blueQuark,redQuark,yellowQuark;
var contentAbout,footerSocial,socialImg;
var home,about,container,aboutLogo;
var r,w,h,wM,hM;
var speed = 3;
var middlePct = .25;
var started = false;
var paused = false;

function setup()
{
	var randomAngle = Math.random()*360;
	main 			= document.querySelector(".main");
	home 			= document.querySelector(".home");
	about 			= document.querySelector(".about");
	container 		= document.querySelector(".main .container");
	logo 			= document.querySelector(".logo");
	quarksElements  = document.querySelectorAll(".quark");
	quarksContainer = document.querySelector(".quarks-container");
	quarkyLogoContainer = document.querySelector("#quarky-logo-container");
	quarkyTextPath	= document.querySelector("#quarky-text-path");
	interactiveTextPath = document.querySelector("#interactive-text-path");
	interactiveLetters = document.querySelectorAll(".letter");
	quarkyLogoPath	= document.querySelector("#quarky-logo-path");
	blueQuark 		= document.querySelector("#blue-quark");
	redQuark 		= document.querySelector("#red-quark");
	yellowQuark 	= document.querySelector("#yellow-quark");
	bgLogo 			= document.querySelector("#bg-logo");
	whiteBall		= document.querySelectorAll(".whiteBall");
	reserved		= document.querySelector("#reserved");
	footerSocial 	= document.querySelector("footer .social");
	socialImg		= document.querySelectorAll(".social a img");
	contentAbout 	= document.querySelector(".about .content");
	aboutLogo		= document.querySelector(".about header img");
	quarks = [
		{element:quarksElements[0], A:degreeToRadian(45), B:degreeToRadian(0), angleB:90+randomAngle},
		{element:quarksElements[1], A:degreeToRadian(0), B:degreeToRadian(0), angleB:randomAngle},
		{element:quarksElements[2], A:degreeToRadian(-45), B:degreeToRadian(0), angleB:180+randomAngle}
	];

	removeClass(main,"hide");
	//main.classList.remove("hide");

	TweenMax.set(yellowQuark,{scale:0,transformOrigin:"top right"});
	TweenMax.set(redQuark,{scale:0,transformOrigin:"0% 50%"});
	TweenMax.set(blueQuark,{scale:0,transformOrigin:"bottom right"});

	TweenMax.set(bgLogo,{scale:0,transformOrigin:"40% 50%"});
	TweenMax.set([whiteBall,reserved],{scale:0,transformOrigin:"50% 50%"});

	TweenMax.set([quarkyTextPath,interactiveLetters],{y:20,scaleY:0,alpha:0,transformOrigin:"0% 100%"});


	// yellowQuark.classList.add("hide");
	// redQuark.classList.add("hide");
	// blueQuark.classList.add("hide");

	TweenMax.set(quarksElements,{scale:0,transformOrigin:"top left"});
	TweenMax.set(window,{r:0});

	window.animationFrame = (function(){
	    return  window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(/* function */ callback, /* DOMElement */ element){
	            window.setTimeout(callback, 1000 / 60);
	        };
	})();

	window.addEventListener('resize', resize);

	
}

function degreeToRadian(angle)
{
	return ((Math.PI*angle)/180);
}

function render()
{
	if(!paused)
	{
		for(var i in quarks){
			var quark = quarks[i];

			//quark.A = ((Math.PI*90)/180);
			quark.B = ((Math.PI*quark.angleB)/180);

			var x = r*Math.cos(quark.A)*Math.sin(quark.B);
			var y = r*Math.sin(quark.A)*Math.sin(quark.B);
			var z = r*Math.cos(quark.B);

			// //console.log(x,y,z);

			x += wM;
			y += hM;
			z -= r;
			
			TweenMax.set(quark.element,{x:x,y:y,z:z});

			quark.angleB+=speed;
		}

	    animationFrame (render); 
	}
}

function getRadius()
{
	return (w>h?h:w)*0.5;
}

function start()
{
	render();

	TweenMax.to(quarksElements,1,{scale:1,transformOrigin:"top left",ease:Quad.easeInOut,delay:.5});
	TweenMax.to(window,1,{r:getRadius(),ease:Quad.easeInOut,delay:.5});

	TweenMax.to(window,2,{speed:5,delay:3,ease:Quad.easeInOut});
	TweenMax.to(window,2,{r:getRadius()*2.5,ease:Quad.easeInOut,onComplete:function(){
		TweenMax.to(quarksElements,1,{scale:0.1,transformOrigin:"top left",ease:Back.easeIn});
		TweenMax.to(window,1,{r:0,ease:Back.easeIn,onComplete:function(){
			removeClass(quarkyLogoPath,'hide');
			addClass(quarksContainer,'hide');
			removeClass(quarkyLogoContainer,'hide');
			removeClass(interactiveTextPath,'hide');
			removeClass(logo.parentElement,"preserve3d");
			//quarkyLogoPath.classList.remove('hide');
			//quarksContainer.classList.add('hide');
			//quarkyLogoContainer.classList.remove('hide');
			//interactiveTextPath.classList.remove('hide');
			TweenMax.to(yellowQuark,1,{scale:1,transformOrigin:"top right",ease:Elastic.easeOut.config(5, 0.5),delay:.2});
			TweenMax.to(redQuark,1,{scale:1,transformOrigin:"0% 50%",ease:Elastic.easeOut.config(5, 0.5),delay:.1});
			TweenMax.to(blueQuark,1,{scale:1,transformOrigin:"bottom right",ease:Elastic.easeOut.config(5, 0.5)});
			TweenMax.to(bgLogo,1,{scale:1,transformOrigin:"40% 50%",ease:Elastic.easeOut});
			TweenMax.to(whiteBall[0],1,{scale:1,transformOrigin:"50% 50%",ease:Elastic.easeOut,delay:.5});
			TweenMax.to(whiteBall[1],1,{scale:1,transformOrigin:"50% 50%",ease:Elastic.easeOut,delay:.6});
			TweenMax.to(whiteBall[2],1,{scale:1,transformOrigin:"50% 50%",ease:Elastic.easeOut,delay:.7});
			//TweenMax.to(quarkyTextPath,.75,{scaleY:1,y:0,alpha:1,transformOrigin:"0% 100%",ease:Elastic.easeOut.config(0.4, 0.3),delay:.5});

			TweenMax.to(quarkyTextPath,1,{y:0,transformOrigin:"0% 100%",ease:Elastic.easeOut.config(0.75, 0.3),delay:.5});
			TweenMax.to(quarkyTextPath,.2,{scaleY:1,alpha:1,transformOrigin:"0% 100%",ease:Quad.easeOut,delay:.5});
			
			for(var i=0;i<interactiveLetters.length;i++)
			{
				var letter = interactiveLetters[i];
				var random = Math.random()*.25;
				TweenMax.to(letter,1,{y:0,transformOrigin:"0% 100%",ease:Elastic.easeOut.config(0.75, 0.3),delay:.75+random});
				TweenMax.to(letter,.2,{scaleY:1,alpha:1,transformOrigin:"0% 100%",ease:Quad.easeOut,delay:.75+random});
			}

			TweenMax.to(reserved,.5,{scale:1,transformOrigin:"0% 50%",ease:Back.easeOut,delay:1.25});

			var box 		= logo.getBoundingClientRect();
			//var logoWidth 	= box.right-box.left;
			var logoHeight 	= box.bottom-box.top;

			middlePct = .5;
			TweenMax.to(logo,2,{y:Math.round(hM-logoHeight*middlePct),ease:Quart.easeInOut,onComplete:function(){

				TweenMax.delayedCall(1,function(){
					//fechar
					// TweenMax.to(whiteBall[0],.25,{scale:0,transformOrigin:"50% 50%",ease:Quad.easeOut,delay:.1});
					// TweenMax.to(whiteBall[1],.25,{scale:0,transformOrigin:"50% 50%",ease:Quad.easeOut,delay:.05});
					// TweenMax.to(whiteBall[2],.25,{scale:0,transformOrigin:"50% 50%",ease:Quad.easeOut});

					TweenMax.to("#yellowBall",.3,{scale:0,transformOrigin:"top right",ease:Back.easeIn,easeParams:[4],delay:.1});
					TweenMax.to("#redBall",.3,{scale:0,transformOrigin:"0% 50%",ease:Back.easeIn,easeParams:[4],delay:.05});
					TweenMax.to("#blueBall",.3,{scale:0,transformOrigin:"bottom right",ease:Back.easeIn,easeParams:[4]});
					TweenMax.to("#bg-logo",.3,{scale:0,transformOrigin:"40% 50%",ease:Back.easeIn,easeParams:[2],delay:.15,onComplete:startAbout});

					TweenMax.to(quarkyTextPath,.3,{scaleY:0,alpha:0,transformOrigin:"0% 100%",ease:Back.easeIn,easeParams:[2],delay:.1});
					TweenMax.to("#interactive-text-path",.3,{scaleY:0,alpha:0,transformOrigin:"0% 100%",ease:Back.easeIn,easeParams:[2],delay:.1});
				});

			}});

		}});
	},delay:3});
}

function startAbout()
{
	TweenMax.delayedCall(.1,function(){
		removeClass(about,'hide');
		addClass(home,'hide');
		//about.classList.remove('hide');	
		//home.classList.add('hide');
		resize();

		var splitText = new SplitText(contentAbout,{type:"words"});

		TweenMax.set(socialImg,{alpha:0,transformOrigin:"50% 50%"});
		TweenMax.set(aboutLogo,{y:-aboutLogo.clientHeight*2});

		var colors_arr = ["#3E5EAE","#FAC73B","#F4553E"];

		for(var i=0;i<splitText.words.length;i++){
			var word = splitText.words[i];
			var color = colors_arr[Math.floor(Math.random() * colors_arr.length)];
			TweenMax.set(word,{css:{backgroundColor:color,color:"rgba(0, 0, 0, 0)"}});
			var delay = Math.random()*1.5+.25;
			//TweenMax.killTweensOf(word);
			TweenMax.from(word,.5,{scaleY:0,ease:Quart.easeIn,transformOrigin:"center bottom",delay:delay,onCompleteParams:[word,color],onComplete:function(word,color){
				TweenMax.set(word,{css:{color:color}});
				TweenMax.to(word,.5,{css:{height:0},ease:Quart.easeOut});
				TweenMax.to(word,.5,{css:{color:"#000"},ease:Quad.easeInOut,delay:.5});
			}});
		}

		for(var i=0;i<socialImg.length;i++){
			var tag = socialImg[i];
			var delay = Math.random()*.7+.7;
			TweenMax.to(tag,.7,{alpha:1,ease:Quad.easeInOut,delay:delay});
		}

		TweenMax.to(aboutLogo,1,{y:0,ease:Quad.easeInOut});
	});
}

function resize(e)
{
	//console.log("resize");
	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	wM = w >> 1;
	hM = h >> 1;
	//if(started) r = getRadius();

	var box 		= logo.getBoundingClientRect();
	var logoWidth 	= box.right-box.left;
	var logoHeight 	= box.bottom-box.top;

	var logoWidthM  = logoWidth * .475;
	var logoHeightM = logoHeight * middlePct;

	var logoX = Math.round(wM-logoWidthM);
	var logoY = Math.round(hM-logoHeightM);

	// var footerSocialX = Math.round(wM-(footerSocial.clientWidth>>1));
	// var footerSocialY = Math.round(hM+(logo.clientHeight>>1)+(h*.05));

	var aboutX = Math.round(wM-(contentAbout.clientWidth*.5));
	var aboutY = Math.max(Math.round(hM-(contentAbout.clientHeight*.43)),aboutLogo.clientHeight*2.5);

	TweenMax.set(logo,{x:logoX,y:logoY});
	//TweenMax.set(footerSocial,{x:footerSocialX,y:footerSocialY});
	TweenMax.set(contentAbout,{x:aboutX,y:aboutY});
}

window.onload = function(){
	setup();
	resize();

	var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

	if(!isIE) start();
	else startAbout();
	//startAbout();
}

function removeClass(tag,selector)
{
	var classes = tag.getAttribute("class").split(" ");
	classes.splice(classes.indexOf(selector),1);
	tag.setAttribute("class",classes.join(" "));
}

function addClass(tag,selector)
{
	var classes = tag.getAttribute("class").split(" ");
	if(classes.indexOf(selector)<0)
	{
		classes.push(selector);
		tag.setAttribute("class",classes.join(" "));
	}
}