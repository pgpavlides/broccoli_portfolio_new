import * as THREE from "three"

import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerpectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
        
        
    }

    createPerpectiveCamera(){
        this.perpectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perpectiveCamera)
    }

    setOrbitControls(){
       this.controls = new OrbitControls(this.perpectiveCamera, this.canvas); 
       this.controls.enableDamping = true;
       this.controls.enableZoom = false;
    }

    createOrthographicCamera(){
        
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -40,
            40
        );

        this.orthographicCamera.position.y = 0.1;   //1.25
        this.orthographicCamera.position.x = 0;
        this.orthographicCamera.rotation.x = -Math.PI / 6 ;

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add (gridHelper);

        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add (axesHelper);

        this.scene.add(this.orthographicCamera)
        this.perpectiveCamera.position.x = 25;
        this.perpectiveCamera.position.y = 16;
        this.perpectiveCamera.position.z = 7;
        
        
        
        
    }

    resizeCamera(){

        // Updating PerspectiveCamera on resize
        this.perpectiveCamera.aspect = this.sizes.aspect
        this.perpectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2
        this.orthographicCamera.top = this.sizes.frustrum/2
        this.orthographicCamera.bottom = -this.sizes.frustrum/2
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
        
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
        // console.log(this.perpectiveCamera.position)

    }


}