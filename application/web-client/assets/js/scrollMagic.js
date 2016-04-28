var fadein_tween = TweenMax.to('#fadein-trigger > div', 1.375,{ opacity: 1 });
var fadeout_tween = TweenMax.to('#fadein-trigger > div', .375,{ opacity: 0 });

var controller = new ScrollMagic.Controller();

var fadein_scene = new ScrollMagic.Scene({
  triggerElement: '#fadein-trigger',
  reverse: true
})
.setTween(fadein_tween)
.addTo(controller);

var fadeout_scene = new ScrollMagic.Scene({
  triggerElement: '#fadeout-trigger',
  reverse: true
})
.setTween(fadeout_tween)
.addTo(controller);

var fadein_tween_work = TweenMax.to('#fadein-trigger-work > div', 1.375,{ opacity: 1 });
var fadeout_tween_work = TweenMax.to('#fadein-trigger-work > div', .375,{ opacity: 0 });

var controller_work = new ScrollMagic.Controller();

var fadein_scene_work = new ScrollMagic.Scene({
  triggerElement: '#fadein-trigger-work',
  reverse: true
})
.setTween(fadein_tween_work)
.addTo(controller_work);

var fadeout_scene_work = new ScrollMagic.Scene({
  triggerElement: '#fadeout-trigger-work',
  reverse: true
})
.setTween(fadeout_tween_work)
.addTo(controller_work);