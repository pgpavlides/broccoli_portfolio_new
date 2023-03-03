import * as THREE from "three"

import Experience from "../Experience.js";

import GSAP from "gsap"
import GUI from 'lil-gui'

import{RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene
        // this.actualRoom.rotation.y = Math.PI;
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }; 
        
        // this.gui = new GUI({ container: document.querySelector( '.hero-main' )});
        

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        // this.setGUI();
    }

    setModel() {

        this.actualRoom.children.forEach (child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach ((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }



            // console.log(this.actualRoom.children)

            if(child.name ==="FISHTANK_GLASS_1"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x60e3ff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
            if(child.name ==="FISHTANK_GLASS_2"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x60e3ff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
            if(child.name ==="FISHTANK_GLASS_3"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x60e3ff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
            if(child.name ==="FISHTANK_GLASS_4"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x60e3ff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            // if(child.name === "PSIGIAKI_GLASS"){
            //     child.material = new THREE.MeshPhysicalMaterial();
            //     child.material.roughness = 1;
            //     child.material.color.set(0xffffff);
            //     child.material.ior = 1;
            //     child.material.transmission = 1;
            //     child.material.opacity = 1;
            // }

            if(child.name === "DESK_MONITOR_PANEL"){
                child.material = new THREE.MeshBasicMaterial({
                    
                    map : this.resources.items.screen,
                    wireframe: true,
                 });
            }
            //     // child.material = new THREE.MeshBasicMaterial({color: 0xff00ff});
            //     // console.log(this.resources.items);

                
            //     child.children[1].material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen,
                    
            //         // color: 0xff00ff,
                  
            //     });
                
            //     // child.material.color = "#ffee00"
            //     // console.log(this.resources.items.screen)              
            // }
            // ------------------------------------------ RESETS --------------------------------------------------------
            if(child.name === "PLATFORM_MAIN"){
                child.position.x = -0.014344;
                child.position.z = 1.34544;
            }

            // console.log(this.roomChildren)

            // if(child.name === "PLATFORM_MINISCREEN" ||
            // child.name === "PLATFORM_ALARM" || 
            // child.name === "PLATFORM_TILE_01" || 
            // child.name === "PLATFORM_TILE_02" || 
            // child.name === "PLATFORM_TILE_03" ||
            // child.name === "PLATFORM_POULI"
            // ){
            //     child.scale.set(0, 0, 0)   
            // }
            child.scale.set(0, 0, 0)   
            if(child.name === "MAIN_ANIMATION_CUBE"){
                // child.scale.set(0.1, 0.1, 0.1);
                child.position.set(0,0.1, 0)
                child.rotation.y = Math.PI / 4
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });

        
        this.rectLight = new THREE.RectAreaLight( 0xe85fcf, 3,  0.4, 0.4 );
        this.rectLight.position.set( 0, 0.86, -1.39 );
        this.rectLight.rotation.x = -Math.PI / 2;
        this.rectLight.rotation.z = -Math.PI / 4;
        this.actualRoom.add( this.rectLight )

        this.roomChildren[this.rectLight] = this.rectLight;
        this.rectLight.scale.set(0, 0, 0)


        // const rectLightHelper = new RectAreaLightHelper( this.rectLight );
        // this.rectLight.add( rectLightHelper );   
        
        const rectLightDesk = new THREE.RectAreaLight( 0xff8812, 20,  0.02, 1 );
        rectLightDesk.position.set( -1, 0.9, -0.7 );
        rectLightDesk.rotation.x = -Math.PI / 2;
        rectLightDesk.rotation.z = -Math.PI / 4;
        // rectLightDesk.rotation.y = -Math.PI / 4;
        // this.actualRoom.add( rectLightDesk )

        // const rectLightHelper2 = new RectAreaLightHelper( rectLightDesk );
        // rectLightDesk.add( rectLightHelper2 );

        // console.log(this.video)
        // console.log(this.resources.items.screen)
 
        this.scene.add(this.actualRoom)
        
    }

    // setGUI(){
    //     this.gui.add( this.rectLight.position, "x" , -5, 5, 0.01 ).listen().decimals( 4 );
    //     this.gui.add( this.rectLight.position, "y" , -5, 5, 0.01 ).listen().decimals( 4 );
    //     this.gui.add( this.rectLight.position, "z" , -5, 5, 0.01 ).listen().decimals( 4 );
        
    // }

   setAnimation() {
        
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.arm1 = this.mixer.clipAction(this.room.animations[1]);
        this.arm2 = this.mixer.clipAction(this.room.animations[2]);
        this.arm3 = this.mixer.clipAction(this.room.animations[3]);
        // console.log(this.mixer)
        
        
        // this.swim.play();
        this.arm1.play();
        this.arm2.play();
        this.arm3.play();
    //   
        // console.log(this.room);
    }

    
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }
    
    resize(){

    }

    update(){
        
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        // this.mixer.update(this.time.delta * 0.0007);
    }

}