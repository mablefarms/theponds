// The Ponds at Mable Farms Website Design by Tyler Kinney | thePonds_slideshowScript.js v1.1.2 | 02.04.2023 : 06.05.2023
// ** NOTE ** Images for the slides need to be at least 775px wide and 475px tall in order to avoid image edges inside canvas
// Defining main function for assembling slideshow
function slideshow(canvasID, parentID, vendorName, vendorInfo, vendorIcon, images, toggler){
	// Declaring local variables
	var canvas, ctx, cWidth, cHeight, parent, vName, vInfo, vIcon, loaded, imgs, imgArr, init, i;
	// Creating new canvas element to append to designated parent
	parent = document.getElementById(parentID);
	canvas = document.createElement('canvas');
	canvas.style.backgroundColor = '#FF00FF';
	canvas.style.border = '1px solid #000000';
	cHeight = 350, cWidth = 525;
	canvas.height = cHeight;
	canvas.width = cWidth;
	canvas.id = canvasID;
	parent.appendChild(canvas);
	parent.appendChild(document.createElement('br'));
	parent.appendChild(document.createElement('br'));
	ctx = canvas.getContext('2d');
	// Defining local variables related to vendor
	vName = vendorName, vInfo = vendorInfo;
	loaded = 0;
	vIcon = new Image();
	vIcon.onload = function(){ loaded++;};
	vIcon.src = vendorIcon;
	// Defining local variables related to slideshow images
	imgArr = [];
	imgs = images.replaceAll(' ', '');
	imgs = imgs.split(',');
	init = true;
	for(i = 0; i < imgs.length; i++) {
		imgArr[i] = new Image();
		imgArr[i].onload = function(){ loaded++;};
		imgArr[i].src = imgs[i];
		ctx.clearRect(0, 0, cWidth, cHeight);
	}
	// Defining helper functions for drawing on canvas
	// Defining local variables related to drawSlides function
	var aX, aY, bX, bY, sAlpha, toggle, j, k, l, kMax;
	function drawSlides(){
		if(init == true){
			if(!toggler){
				aX = 0, aY = 0, bX = cWidth - imgArr[1].width, bY = cHeight - imgArr[1].height;
				toggle = 'left';
			} else {
				switch(toggler){
					case "left":
						aX = 0, aY = 0, bX = cWidth - imgArr[1].width, bY = cHeight - imgArr[1].height;
						toggle = 'left';
						break;
					case "right":
						bX = 0, bY = 0, aX = cWidth - imgArr[0].width, aY = cHeight - imgArr[0].height;
						toggle = 'right';
						break;
					default:
						aX = 0, aY = 0, bX = cWidth - imgArr[1].width, bY = cHeight - imgArr[1].height;
						toggle = 'left';
						break;
				}
			}
			kMax = 250, sAlpha = 100;
			j = 0, l = 1, k = kMax;
			init = false;
		}
		// Drawing slides
		ctx.clearRect(0, 0, cWidth, cHeight);
		ctx.globalAlpha = 1;
		ctx.drawImage(imgArr[l], bX, bY);
		ctx.globalAlpha = 0.01 * sAlpha;
		ctx.drawImage(imgArr[j], aX, aY);
		// Switching cases for toggle
		switch(toggle){
			case "left":
				aX -= 1;
				aY -= 0.5;
				if(k > 0 && k < 50) sAlpha -= 2, bX += 1, bY += 0.5;
				if(k == 0) {
					aX = bX, aY = bY;
					bX = 0, bY = 0;
					sAlpha = 100, j++, l++;
					toggle = "right";
					k = kMax;					
				}
				k--;
				break;
			case "right":
				aX += 1;
				aY += 0.5;
				if(k > 0 && k < 50) sAlpha -= 2, bX -= 1, bY -= 0.5;
				if(k == 0) {
					aX = bX, aY = bY;
					if(l + 1 == imgArr.length) bX = cWidth - imgArr[0].width, bY = cHeight - imgArr[0].height;
					else bX = cWidth - imgArr[l + 1].width, bY = cHeight - imgArr[l + 1].height;
					sAlpha = 100, j++, l++;
					toggle = "left";
					k = kMax;
				}				
				k--;
				break;
			default:
				window.console.log('Something definately went wrong, boss...');
				break;
		}
		if(l >= imgArr.length) l = 0;
		if(j >= imgArr.length) j = 0;
	}
	function drawStyling(){
		// Drawing border
		ctx.globalAlpha = 1;
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
		ctx.strokeRect(0, 0, cWidth, cHeight);
		ctx.lineWidth = 1;
		ctx.strokeRect(2.5, 2.5, cWidth - 5, cHeight - 5);
		ctx.strokeRect(4.5, 4.5, 3, 3);
		ctx.strokeRect(cWidth - 7.5, 4.5, 3, 3);
		ctx.strokeRect(4.5, cHeight - 7.5, 3, 3);
		ctx.strokeRect(cWidth - 7.5, cHeight - 7.5, 3, 3);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
		ctx.fillRect(5, 5, 2, 2);
		ctx.fillRect(cWidth - 7, 5, 2, 2);
		ctx.fillRect(5, cHeight - 7, 2, 2);
		ctx.fillRect(cWidth - 7, cHeight - 7, 2, 2);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
		ctx.strokeRect(1.5, 1.5, cWidth - 3, cHeight - 3);
		// Drawing icon shadow and border
		ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
		ctx.fillRect(15, 16, 77, 77);
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.strokeRect(14.5, 14.5, 76, 76);
	}
	function drawIcon(){
		ctx.globalAlpha = 1;
		ctx.drawImage(vIcon, 15, 15);
	}
	function drawText(){
		ctx.globalAlpha = 1;
		ctx.font = '24px Times New Roman';
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 1;
		ctx.strokeText (vName, 100, 39);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
		ctx.fillText(vName, 102, 41);
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(vName, 100, 39);
		ctx.font = '16px Times New Roman';
		ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
		ctx.strokeText(vInfo, 100, 59);
		ctx.fillText(vInfo, 102, 61);
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText(vInfo, 100, 59);

	}
	// Defining function for handling animation
	function animateSlideshow(){
		drawSlides();
		drawStyling();
		drawIcon();
		drawText();
	}
	// I had to add this to make sure the images were loaded before I tried to draw them! > _ <
	var imgInterval = setInterval(imgCheck, 30);
	function imgCheck(){
		if(loaded == imgArr.length + 1) {
			var start = setInterval(animateSlideshow, 30);
			clearInterval(imgInterval);
		}
	}
}