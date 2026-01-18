<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

    let container: any;

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.2
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const dir = new THREE.Vector3(x, y, z);

        const origin = new THREE.Vector3(0, 0, 0);
        const length = 1;
        const color = 0xffff00;

        const arrowHelper = new THREE.ArrowHelper(
            dir, 
            origin, 
            length, 
            color, 
            0.2,
            0.1
        );

        scene.add(arrowHelper);

        const lineRadius = 1.01;
        const segments = 64;
        const circleGeometry = new THREE.BufferGeometry().setFromPoints(
            new THREE.Path().absarc(0, 0, lineRadius, 0, Math.PI * 2).getPoints(segments)
        );

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x000000, 
        });

        const lines = [];
        for (let i = 0; i < 3; i++) {
            const line = new THREE.LineLoop(circleGeometry, lineMaterial);
  
            if (i === 0) line.rotation.x = Math.PI / 2;
            if (i === 1) line.rotation.y = Math.PI / 2;
            if (i === 2) line.rotation.z = Math.PI / 4;

            scene.add(line);
            lines.push(line);
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 2;

        const controls = new OrbitControls(camera, renderer.domElement);
        
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        container.appendChild(labelRenderer.domElement);

        const points = [
            { text: '<span>|</span>0<span>&rangle;</span>', pos: [0, 1.1, 0] },
            { text: '<span>|</span>1<span>&rangle;</span>', pos: [0, -1.1, 0] },
            { text: '<span>1</span>', pos: [1.1, 0, 0] },
            { text: '<span>0</span>', pos: [-1.1, 0, 0] },
            { text: '<span>i</span>', pos: [0, 0, 1.1] },
            { text: '<span>-i</span>', pos: [0, 0, -1.1] },
        ];

        points.forEach(p => {
            const div = document.createElement('div');
            div.className = 'label';
            div.innerHTML = p.text;
            div.style.color = 'white';
            div.style.fontFamily = 'monospace';
            div.style.fontSize = '1.2rem';
        
            const label = new CSS2DObject(div);
            label.position.set(...p.pos);
            scene.add(label);
        });
        
        let frame: number;
        function animate() {
            frame = requestAnimationFrame(animate);
    
            controls.update();

            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        }
        animate();

        return () => {
            cancelAnimationFrame(frame);
            renderer.dispose();
            if (container) container.removeChild(renderer.domElement);
        };
    });

    const {x, y, z} = $props();
    const theta = Math.acos(z);
    const phi = Math.atan2(y, x);
</script>

<div class="data">
    <div class="canvas-wrapper" bind:this={container}></div>
    <span>&theta;={theta}</span>
    <span>&phi;={phi}</span>
</div>

<style>
    .data {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-left: auto;
        text-align: left;
    }

    .canvas-wrapper {
        position: relative;
        width: 10em;
        height: 10em;
        background: #111;
    }

    :global(.label) {
        background: rgba(0, 0, 0, 0.6);
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
        user-select: none;
    }
</style>
