import Experience from "./Experience.js";
import { EventEmitter} from "events";
import GSAP from "gsap"
import convert from "./Utils/convertDivsToSpans.js";
import * as THREE from "three"


export default class Preloader extends EventEmitter {
    constructor() {
        super();
        
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.room = this.experience.room;
        this.room2 = this.resources.items.room;
        this.actualRoom = this.room2

        this.roomChildren

        // GSAP.registerPlugin(convert);

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
            // this.setAnimation();

        })
    } 

    setAssets(){ 
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))
       this.room = this.experience.world.room.actualRoom;
       this.roomChildren = this.experience.world.room.roomChildren;
       this.rectLight =  this.experience.world.room.rectLight;
    //    console.log(this.roomChildren)
    }

    firstIntro(){

        return new Promise ((resolve)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent:100});
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: ()=>{
                    document.querySelector(".preloader",).classList.add("hidden");
                }
            })
             

        if(this.device === "desktop"){

            

            this.timeline.to(this.roomChildren.main_animation_cube.scale, {
                x: 0.1,
                y: 0.1,
                z: 0.1,
                ease: "back.out(2.5)",
                duration: 0.7,
            })
            .to(this.room.position, {
                x: -1,
                ease: "power1.out",
                duration: 0.7,
                onComplete: resolve,
            })
       
        }else{
           
            this.timeline.to(this.roomChildren.main_animation_cube.scale, {
                x: 0.1,
                y: 0.1,
                z: 0.1,
                ease: "back.out(2.5)",
                duration: 0.7,
                
            }).to(this.room.position, {
                z: -1,
                ease: "power1.out",
                duration: 0.7,
            });

        } 

        this.timeline
        .to(".intro-text .animatedis", {
            yPercent: 0,
            stagger: 0.05,
            ease: "back.out(1.2)",
            
            
        })
        .to(".arrow-svg-wrapper", {
            opacity: 1,
            
        }, "arrowsvg")
        .to(".toggle-bar", {
            opacity: 1,
            onComplete: resolve,
        }, "arrowsvg")
    }) 

            
}

    secondIntro(){

        return new Promise ((resolve)=>{
            this.secondTimeline = new GSAP.timeline();

    
                this.secondTimeline
                .to(".intro-text .animatedis", {
                    yPercent: 100,
                    stagger: 0.07,
                    ease: "back.in(1.7)",
                    
                }, "fadeout")
                .to(".arrow-svg-wrapper", {
                    opacity: 0,
                    
                }, "fadeout")
                .to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                }, "same")
                .to(this.roomChildren.main_animation_cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 4,
                    duration: 1,
                }, "same")
                .to(this.roomChildren.main_animation_cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1,

                }, "same")
                .to(this.camera.orthographicCamera.position,{
                    y: 1, 
                    duration: 1,
                    ease: "power1.out",

                }, "same")
                .to(this.roomChildren.main_animation_cube.position,{
                    y: 1.33902,
                    z: -0.016085,
                    x: 0.002201,
                    duration: 1,
                    ease: "power1.out",

                }, "same")
                .set(this.roomChildren.main_animation_cube.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(this.roomChildren.main_animation_cube.scale,{
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power3.easeOut",
                    duration: 1,
                }, "arxicube")
                .to(this.roomChildren.main_scene_walls.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "power3.easeOut",
                    duration: 1,
                }, "arxicube")
                .to(this.roomChildren.main_scene_woodfloor.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "power0.easeNone",
                    duration: 0.7,
               
                },">-0.3")
                .to(this.roomChildren.window_all.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "power1.easeOut",
                    duration: 0.5,
                },">-0.2")
                .to(this.roomChildren.light_switch.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "power1.easeOut",
                    duration: 0.5,
                },">-0.2")
                .to(".hero-main-title .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    onComplete: resolve,
                    
                },">-0.9")
                .to(".hero-main-description .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    onComplete: resolve,
                    
                },">-1")
                .to(".first-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    onComplete: resolve,
                    
                },">-1.2")
                .to(".second-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    onComplete: resolve,
                    
                },">-1.4")
                .to(this.roomChildren.fishtank_base.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.55,
                
                },">-0.9")
                .to(this.rectLight.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.55,
                
                },">-0.2")
                .to(this.roomChildren.fishtank_house.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.75,
                },">-0.4")
                .to(this.roomChildren.fishtank_coral_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.55,
                },">-0.4")
                .to(this.roomChildren.fishtank_coral_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.55,
                },">-0.4")
                .to(this.roomChildren.seaweedarmature.scale,{
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    ease: "back.out(2.2)",
                    duration: 0.2,
                },">-0.2")
                .to(this.roomChildren.fishtank_fish.scale,{
                    x: 0.02,
                    y: 0.02,
                    z: 0.02,
                    ease: "back.out(2.2)",
                    duration: 0.2,
                    
                },">-0.2")
                .to(this.roomChildren.seaweedarmature001.scale,{
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    ease: "back.out(2.2)",
                    duration: 0.2,
                },">-0.4")
                .to(this.roomChildren.seaweedarmature002.scale,{
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                    ease: "back.out(2.2)",
                    duration: 0.2,
                },">-0.4")
                .to(this.roomChildren.psigiaki_main.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.5")
                .to(this.roomChildren.psigiaki_glass.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.5")
                .to(this.roomChildren.desk_main.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_monitor.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_monitor_panel.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_mousepad.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                
                .to(this.roomChildren.desk_keyboard.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.pc_mouse.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_speaker_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_speaker_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_pen_holder_main.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_box.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_book.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_gaming_chair.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.desk_mousepad.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_main.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.8")
                .to(this.roomChildren.room_shelves_book_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_3.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_4.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_5.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_6.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_7.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_8.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_9.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_10.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_11.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_book_12.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_animated_shpere.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_camera.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_plant_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_plant_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_rubik.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_solo_plant.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_shelves_statue.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_painting.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_corner_shelve_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_drone.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_corner_shelve_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_corner_shelve_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octane.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_corner_shelve_3.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.w_box.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_7.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_5.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_6.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_3.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.octagone_lights_4.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_main.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_pillow_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_pillow_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_pillow_3.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_pillow_4.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.sofa_pillow_5.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_table.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_table_teacup_1.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_table_teacup_2.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },">-0.4")
                .to(this.roomChildren.room_camera_stand.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                    onComplete: resolve,
                },">-0.4")
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    
                })
                           
            
        });
             
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListener();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY
        if(difference> 0){
            console.log('swiped up')
            this.removeEventListener();
            this.playSecondIntro();
        }
        this.initialY = null;
    } 

    removeEventListener(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro(){
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro(){
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols")
    }
    
    move(){
       if(this.device === "desktop"){
        this.room.position.set(-1,0,0);
       } else { 
        this.room.position.set(0,0,-1);
       }
    }

    scale() {
        if(this.device === "desktop"){
            this.room.scale.set(1,1,1);
           } else { 
            this.room.scale.set(0.5,0.5,0.5);
           }
    }

    update(){

        // this.mixer.update(this.time.delta * 0.0007);

        if(this.moveFlag){
            this.move();
        }

        if(this.scaleFlag){
            this.scale();
        }
        
    }
} 