/**
 * Name: jquery.hoverBomb.js
 * Description: Explode text on hover
 * Copyright (c) 2015 Jun Ishibashi
 * Version: 0.0.5
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */ 
(function ($) {

	$.fn.hoverBomb = function (options) {
		
		var defaults = {
			direction         : "all",
			diameter          : 100,
			shakeStep         : 1,
			shakeRotate       : 45,
			shakeLimit        : 10,
			growSpeed         : 100,
			explosionMomentum : 50,
			afterEffect       : "fade", // "fade" or "animate"
			afterAnimationTime: 500
		};
		
		var HoverBomb = function (elem) {
			this.elem = elem;
			this.config = $.extend({}, defaults, options);
			this.radius = this.config.diameter * 0.5;
			this.shakeRadius = 0;
			this.loop = null;
			this.growLoop = null;
			this.explodeLoop = null;
			this.exploded = false,
			this.longest = 0;
			this.fps = 1000 / 30;
		};
		
		HoverBomb.prototype = {
			explode: function () {
				var self = this;
				
				this.exploded = true;
				this.shakeRadius = 0;
				this.longest = 0;
				
				clearInterval(this.loop);
				clearInterval(this.growLoop);
				
				this.explodeLoop = setInterval(function() { self.explodeFunc(); }, this.fps);
			},
			explodeFunc: function () {
				var self = this,
					op = this.config,
					spans = this.elem.children("span"),
					targetCoordinate = new Array(spans.length),
					xDist, yDist,
					length, maxLength = 0;
				
				spans.each(function(index, element) {
					targetCoordinate[index] = {x: Random(-self.radius, self.radius), y: Random(-self.radius, self.radius)};
					xDist = targetCoordinate[index].x - parseInt($(element).css("left"));
					yDist = targetCoordinate[index].y - parseInt($(element).css("top"));
					length = xDist * xDist + yDist * yDist;
					
					if (maxLength < length) {
						self.longest = index;
						maxLength = length;
					}
				});
				
				spans.each(function(index, element) {
					var top = parseInt($(element).css("top")),
						left = parseInt($(element).css("left")),
						dx = targetCoordinate[index].x - left,
						dy = targetCoordinate[index].y - top,
						radian = Math.atan2(dy, dx),
						ax = Math.cos(radian) * op.explosionMomentum,
						ay = Math.sin(radian) * op.explosionMomentum,
						px = dx / targetCoordinate[index].x,
						py = dy / targetCoordinate[index].y,
						vx = ax * px,
						vy = ay * py,
						x  = left + vx,
						y  = top + vy;
						
					$(element).css({"top" : y, "left": x});
					
					if (index === self.longest && (px >= 1.0 || py >= 1.0)) {
						clearInterval(self.explodeLoop);
						
						if (op.afterEffect === "animate") {
							setTimeout(function () { self.animationEffect(); }, op.afterAnimationTime);
						} else if (op.afterEffect === "fade") {
							self.fadeEffect();
						}
						
						return false;
					}
				});
			},
			animationEffect: function () {
				var self = this;
				
				this.elem.children("span").each(function(index, element) {
					if (index !== self.longest) {
						$(element).animate({
							top : 0,
							left: 0
						}, self.config.callbackAnimationSpeed);
					} else {
						self.elem.children("span").eq(self.longest).animate({
							top : 0,
							left: 0
						}, self.config.callbackAnimationSpeed, function () {
							self.elem.children("span").each(function (index, element) {
								$(element).css({
									"-webkit-transform": "rotate(" + 0 + "deg)", 
									   "-moz-transform": "rotate(" + 0 + "deg)", 
									    "-ms-transform": "rotate(" + 0 + "deg)",
									     "-o-transform": "rotate(" + 0 + "deg)", 
									        "transform": "rotate(" + 0 + "deg)"
								})
							})
							
							self.exploded = false;
						})
					}
				});
			},
			fadeEffect: function () {
				var self = this,
					spans = this.elem.children("span"),
					last = spans.length - 1,
					lastElem = spans.eq(last);
				
				spans.each(function (index, element) {
					if (index !== last) $(element).fadeOut(500);
					else return false;
				});
				
				lastElem.fadeOut(500, function () {
					spans.each(function (index, element) {
						if (index === last) return false;
						
						initCSS($(element));
						$(element).show(500);
					});
							
					initCSS(lastElem);
					lastElem.show(500, function () { self.exploded = false; });
				});
			},
			preExplode: function () {
				var self = this,
					op = this.config;
				
				this.loop = setInterval(function () {
					self.elem.children("span").each(function(index, element) {
						$(element).css({
							              "top":             Random(-self.shakeRadius, self.shakeRadius),
							             "left":             Random(-self.shakeRadius, self.shakeRadius),
							"-webkit-transform": "rotate(" + Random(-op.shakeRotate, op.shakeRotate) + "deg)", 
							   "-moz-transform": "rotate(" + Random(-op.shakeRotate, op.shakeRotate) + "deg)", 
							    "-ms-transform": "rotate(" + Random(-op.shakeRotate, op.shakeRotate) + "deg)",
							     "-o-transform": "rotate(" + Random(-op.shakeRotate, op.shakeRotate) + "deg)", 
							        "transform": "rotate(" + Random(-op.shakeRotate, op.shakeRotate) + "deg)"
						});
					});
				}, this.fps);
				
				this.growLoop = setInterval(function () {
					self.shakeRadius += op.shakeStep;
					
					if (self.shakeRadius > op.shakeLimit) self.explode();
				}, op.growSpeed);
			},
			cancelExplode: function () {
				if (!this.exploded) {
					clearInterval(this.loop);
					clearInterval(this.growLoop);
					
					this.shakeRadius = 0;
					
					this.elem.children("span").each(function (index, element) {
						initCSS($(element));
					})
				}
			}
		};
		
		return this.each(function () {
			var self = $(this),
				spans = explodeWithSpan(self.text()),
				HB = new HoverBomb(self);

			self.html(spans);
			
			self.on("mouseenter", function () {
				HB.preExplode();
			});
			
			self.on("mouseleave", function () {
				HB.cancelExplode();
			});
		});
		
	};
	
	var explodeWithSpan = function (content) {
		var i = 0,
			len = content.length,
			exploded = "";
			
		for (; i < len; i++) {
			exploded += "<span style='position: relative;'>" + (content[i] == " " ? "&nbsp;" : content[i]) + "</span>";
		}
		
		return exploded;
	};
	
	var Random = function (min, max, isFloat) {
		if (!min) {
			return Math.random();
		} else if (!max) {
			return Math.round(Math.random() * min);
		} else {
			if (!isFloat) {
				return Math.round((Math.random() * (max - min)) + min);
			} else {
				return (Math.random() * (max - min)) + min;
			}
		}
	};
	
	var initCSS = function (elem) {
		elem.css({
			              "top":             0,
			             "left":             0,
			"-webkit-transform": "rotate(" + 0 + "deg)", 
			   "-moz-transform": "rotate(" + 0 + "deg)", 
			    "-ms-transform": "rotate(" + 0 + "deg)",
			     "-o-transform": "rotate(" + 0 + "deg)", 
			        "transform": "rotate(" + 0 + "deg)"
		});
	};

})(jQuery);