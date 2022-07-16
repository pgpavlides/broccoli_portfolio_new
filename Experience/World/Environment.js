import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap"
import GUI from 'lil-gui'

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({ container: document.querySelector( '.hero-main' )});
        // this.obj = {
        //     colorObj: {r: 0, g: 0, b: 0},
        //     intensity: 3,

        // };
 

        this.setSunlight();
        this.setSunlight2();

     
        // this.setGUI()
    }

    // setGUI(){
    //     // Arrow function to keep the context
    //     this.gui.addColor(this.obj, "colorObj").onChange(()=>{
    //         this.sunLight.color.copy(this.obj.colorObj)
    //         this.sunLight2.color.copy(this.obj.colorObj)
    //         console.log(this.obj.colorObj)
    //     });

    //     this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
    //         this.sunLight.intensity = this.obj.intensity
    //         this.sunLight2.intensity = this.obj.intensity
    //     });
    // }



    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#fdedad", 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.15;
        
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);

        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

    }

    setSunlight2() {
        this.sunLight2 = new THREE.AmbientLight( "#ffffff", 1 );
       
        this.scene.add(this.sunLight2);

    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.19215686274509805,
                g: 0.17647058823529413,
                b: 0.984313725490196,
            });
            GSAP.to(this.sunLight2.color, {
                r: 0.19215686274509805,
                g: 0.17647058823529413,
                b: 0.984313725490196,
            });

            GSAP.to(this.sunLight, {
                intensity: 0.78,
            })

            GSAP.to(this.sunLight2, {
                intensity: 0.78,
            })

        }else{
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight2.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 2,
            })

            GSAP.to(this.sunLight2, {
                intensity: 2,
            })
        }
    }

 
    
    resize(){

    }

    update(){
        
    }

}