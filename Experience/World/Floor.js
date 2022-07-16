import * as THREE from "three"

import Experience from "../Experience.js";

import GSAP from "gsap"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.setFloor();
        this.setCircles();
        
    }
 


    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xe38f25,
            side: THREE.BackSide

        });

        this.plane = new THREE.Mesh(this.geometry , this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = 0;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        
        const geometry = new THREE.CircleGeometry( 5, 32 );
        const material = new THREE.MeshStandardMaterial( { color: 0xe08138 } );
        const material2 = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
        const material3 = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
        
        this.circleFirst = new THREE.Mesh( geometry, material );
        this.circleSecond = new THREE.Mesh( geometry, material2 );
        this.circleThird = new THREE.Mesh( geometry, material3 );
        
        this.circleFirst.position.y = 0.01;
        this.circleSecond.position.y = -0;
        this.circleThird.position.y = -0 ;
        
        
        this.circleFirst.scale.set(0,0,0) 
        this.circleSecond.scale.set(0,0,0) 
        this.circleThird.scale.set(0,0,0) 
        
        this.circleFirst.rotation.x = 
        this.circleSecond.rotation.x = 
        this.circleThird.rotation.x = 
        -Math.PI / 2;
        
        this.circleFirst.receiveShadow =  true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow =  true;
        
        
        this.scene.add( this.circleFirst ); 
        this.scene.add( this.circleSecond ); 
        this.scene.add( this.circleThird ); 
    }
    
    resize(){

    }

    update(){}
        
     
};
