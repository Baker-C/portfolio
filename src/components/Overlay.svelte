<script>
    import { onMount, onDestroy } from 'svelte';

    // Cursor gradient variables
    const cursor = {
        size: 270,                        // Size of the circle in pixels
        color: "rgba(0, 73, 205, 0.3)",  // Circle gradient color
        followSpeed: 0.15,                // Follow speed (0-1), lower = smoother
        blurAmount: 30,                   // Blur in pixels
        gradientStop: 0.3                 // Where the gradient stops (0-1)
    };

    // Scroll tracking variables
    let scrollY = 0;
    let heroElement;
    let heroHeight = 0;
    let windowHeight = 0;
    let overlayOpacity = 0;

    // Mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    // Overlay variables
    const overlay = {
        color: "rgba(0, 20, 30, 1)",      // Blue overlay color with alpha
        startFade: 0,                     // When to start fading (0 = top of viewport)
        endFade: 0.9,                     // When to reach full opacity (0.9 = 90% of viewport height)
    };

    // Calculate overlay opacity based on scroll
    function updateOverlayOpacity() {
        if (!heroElement) return;

        // Get hero dimensions
        const heroRect = heroElement.getBoundingClientRect();
        heroHeight = heroRect.height;

        // Calculate how far we've scrolled relative to viewport height
        const scrollProgress = (scrollY / windowHeight);

        // Calculate overlay opacity based on scroll progress
        // Clamp between 0 and 1
        overlayOpacity = Math.min(1, Math.max(0, 
            (scrollProgress - overlay.startFade) / 
            (overlay.endFade - overlay.startFade)
        ));
    }
  
    // Scroll event handler
    function handleScroll() {
        scrollY = window.scrollY;
        updateOverlayOpacity();
    }
  
    // Resize event handler
    function handleResize() {
        windowHeight = window.innerHeight;
        updateOverlayOpacity();
    }
    
    // Mouse move handler
    function handleMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    
    // Animation frame for smooth mouse following
    function animateCircle() {
        // Calculate the distance between current position and target
        const dx = mouseX - circleX + cursor.size / 5;
        const dy = mouseY - circleY + cursor.size / 5;
        
        // Move circle position based on follow speed
        circleX += dx * cursor.followSpeed;
        circleY += dy * cursor.followSpeed;
        
        // Request next animation frame
        requestAnimationFrame(animateCircle);
    }
  
    onMount(() => {
        // Set initial window height
        windowHeight = window.innerHeight;
        
        // Set initial mouse position
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        circleX = mouseX;
        circleY = mouseY;
        
        // Set up event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        
        // Start animation loop
        requestAnimationFrame(animateCircle);
        
        // Initial calculation
        setTimeout(updateOverlayOpacity, 80);
    });
  
    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    });
</script>

<style>
    .hero-overlay {
        position: fixed; /* Make overlay sticky */
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--overlay-base-color);
        opacity: var(--overlay-opacity);
        z-index: -1;
        transition: opacity 0.1s ease-out;
    }
    
    .cursor-gradient {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
        opacity: var(--overlay-opacity);
        transition: opacity 0.1s ease-out;
        mix-blend-mode: screen;
    }
</style>

<div 
    class="hero-overlay"
    bind:this={heroElement}
    style="
        --overlay-base-color: {overlay.color};
        --overlay-opacity: {overlayOpacity};
    "
></div>

<div 
    class="cursor-gradient"
    style="
        --overlay-opacity: {overlayOpacity};
        background: radial-gradient(
            circle at {circleX}px {circleY}px, 
            {cursor.color} 0%, 
            transparent {cursor.gradientStop * 100}%
        );
        filter: blur({cursor.blurAmount}px);
        width: calc(100% + {cursor.blurAmount * 2}px);
        height: calc(100vh + {cursor.blurAmount * 2}px);
        margin-left: -{cursor.blurAmount}px;
        margin-top: -{cursor.blurAmount}px;
    "
></div>