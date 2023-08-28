gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



document.querySelectorAll(".page2-part").forEach(function(elem){

    
  var diffrot =0;
  var rotate=0;


  elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;

    diffrot=dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to( elem.querySelector(".page2-part>img"),{
      opacity:1,
      top:diff,
      left:dets.clientX,
      // ease:Power3,
      rotate:gsap.utils.clamp(-10,20,diffrot*.2)
      
    })
  })


  elem.addEventListener("mouseleave",function(dets){
    gsap.to( elem.querySelector(".page2-part>img"),{
      opacity:0,
    
    })
  })
})



var tl=gsap.timeline()

tl.from("#nav",{
  y:20,
  opacity:0,
  duration:1.5,  
})

tl.from("#page1-part1>h1",{
  y:50,
  opacity:0,
  delay:.2
})
tl.from("#page1-part1>h2",{
  y:50,
  opacity:0,
  delay:.2

})
tl.from("#page1-part1>h6",{
  y:-50,
  opacity:0,
  delay:.2

})
tl.from("#sec1>h4",{
  y:-50,
  opacity:0,
  delay:.2

})


let main= document.querySelector("#main")
let cursor =document.querySelector("#cursor")

let imagess = document.querySelector("img")
main.addEventListener("mousemove",function(dets){
  cursor.style.left=dets.x +"px"
  cursor.style.top=dets.y+"px"
})



imagess.addEventListener("mouseenter",function(){
  cursor.style.scale=2.5
})

imagess.addEventListener("mouseleave",function(){
  cursor.style.scale=1
})