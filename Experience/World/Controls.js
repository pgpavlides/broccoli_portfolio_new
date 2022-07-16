import * as THREE from "three"

import Experience from "../Experience.js";
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
                // console.log(this.rectLight)
            }
            
        });

        this.circleFirst = this.experience.world.floor.circleFirst
        this.circleSecond = this.experience.world.floor.circleSecond
        this.circleThird = this.experience.world.floor.circleThird

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
       

           
      
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.06,
            disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize); 
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            
            "(min-width: 969px)": () => {
                // console.log("fired Desktop")
                this.room.scale.set(1,1,1)
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.5;

               
                //First Section --------------------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position, {
                  x: () => {
                    return this.sizes.width * 0.0014;
                  }  
                });

                //Second Section --------------------------------------------------------------------------

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                });
                
                this.secondMoveTimeline.to(this.room.position, {
                  x: () => {
                    return 0.5
                  },
                  
                  z: () => {
                    return this.sizes.height * 0.0032;
                  } 
                }, "same");

                this.secondMoveTimeline.to(this.room.scale, {
                   x: 3,
                   y: 3,
                   z: 3,
                }, "same");
                
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.4 * 3,
                    height: 0.4 * 3,

                }, "same");
                
                 
                 //Third Section --------------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                })
                
                .to(this.camera.orthographicCamera.position, {
                    x: -3.1,  
                    y: -3.3,
                    z: 1.5,
                });
            }, 
            
            //Mobile-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-

            "(max-width: 968px)": () => {
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.3; 
                // console.log("fired Mobile")
                
                this.room.scale.set(0.9,0.9,0.9)
                this.room.position.set(0,0,0);
                
                //First Section --------------------------------------------------------------------------
                  this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                },"same").to(this.room.scale,{
                    x: 3,
                    y: 3,
                    z: 3,
                    
                    
                },"same").to(this.camera.orthographicCamera.position,{
                    x: -2,
                    y: 3,
                    z: 1,
                    
                    
                },"same").to(this.rectLight, {
                    width: 0.4 * 3,
                    height: 0.4 * 3,

                }, "same");  
                 //Second Section --------------------------------------------------------------------------

                 this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position,{
                    x: 0.2,
                    y: 6.9,
                    z: 1,
                });
                 //Third Section --------------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.2,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position,{
                    x: -1.2,
                    y: -2.5,
                    z: 1,
                });           

            },

            all: ()=> {

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                
                                scrub: 0.6,
                            }, 
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                
                                scrub: 0.6,
                            }, 
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                
                                scrub: 0.6,
                            }, 
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                
                                scrub: 0.6,
                            }, 
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    });
                });

            // Circle animations ==+================================================!^&%#(^#(%)*&#^&@()%*&@#%)
            
            //First Section --------------------------------------------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.2,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleFirst.scale, {
                x: 3,
                y: 3,
                z: 3,
            })
            

            //Second Section --------------------------------------------------------------------------

            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.2,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleSecond.scale, {
                x: 3,
                y: 3,
                z: 3,
            })
            
          
            
             
             //Third Section --------------------------------------------------------------------------
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.2,
                    invalidateOnRefresh: true,
                },
            }).to(this.circleThird.scale, {
                x: 3,
                y: 3,
                z: 3,
            })
            
            



                //Mini Platforms animations.
            //    console.log(this.room.children)
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                        
                        
                    }
                })
                
                this.room.children.forEach(child=> {
                    if( child.name === "PLATFORM_MAIN"){
                        child.scale.set(1,1,1);
                        this.first = GSAP.to(child.position, {
                                                        
                            x: -0.376684,
                            z: 1.70752,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }
                    if( child.name === "PLATFORM_MINISCREEN"){
                        this.second = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }

                    if( child.name === "PLATFORM_ALARM"){
                        this.third = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }
                    if( child.name === "PLATFORM_TILE_01"){
                        this.forth = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }
                    if( child.name === "PLATFORM_TILE_02"){
                        this.fifth = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }
                    if( child.name === "PLATFORM_TILE_03"){
                        this.sixth = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        })
                    }
                    if( child.name === "PLATFORM_POULI"){
                        this.seventh = GSAP.to(child.scale, {
                           
                            x: 1,
                            y: 1,
                            z: 1,
                            duration: 0.37,
                            ease: "back.out(2)",
                        });
                    }
                });

                this.secondPartTimeline.add(this.first)
                this.secondPartTimeline.add(this.second)
                this.secondPartTimeline.add(this.third)
                this.secondPartTimeline.add(this.forth, "-=0.2")
                this.secondPartTimeline.add(this.fifth, "-=0.2")
                this.secondPartTimeline.add(this.sixth, "-=0.2")
                this.secondPartTimeline.add(this.seventh)
                
            },
        });
    
       
    }
      
    resize(){

    }

    update(){
               
    }

}