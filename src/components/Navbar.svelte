<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { scrollY } from '$lib/scrollStore';  // Import the store

    // Dimension and animation variables
    export let navbarHeight = "60px"; // Variable for navbar height
    export let transitionDuration = "0.3s"; // Control transition speed
    export let navbarVisibilityThreshold = 500; // Scroll threshold for navbar visibility
    
    // Font size variables
    export let logoFontSize = "1rem";
    export let roleFontSize = "1rem";
    export let linksFontSize = "1rem";
    export let mobileFontSizeLogo = "0.8rem";
    export let mobileFontSizeRole = "1rem";
    export let mobileFontSizeLinks = "0.9rem";

    // Line variables
    export let lineColor = "white";
    export let lineWidth = "90%";
    export let lineHeight = "1px";

    // Color variables - NEW
    export let logoTextColor = "white";  // Color for the logo text
    export let roleTextColor = "white";  // Color for the role text
    export let navLinksColor = "white";  // Color for navigation links
    export let navLinksHoverColor = "#111111";  // Color for navigation links on hover

    // Content variables
    const logo = "Charles Baker"; // Logo text or image
    const role = "Software Developer"; 

    const links = [
        { name: "About", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" }
    ];

    // Blur amount and previous scroll tracking
    let blurAmount = 0;
    let blurStartOffset = 0; // Start offset for blur effect
    let blurFullOffset = 200; // Full offset for blur effect
    let maxBlur = 4; // Maximum blur amount in pixels
    let prevScrollY = 0;
    let isNavbarVisible = true;
    
    // Subscribe to the scrollY store
    const unsubscribe = scrollY.subscribe(value => {
        if (browser) {
            const currentScrollY = value;
            
            // Update blur
            updateBlur(currentScrollY);
            
            // Update navbar visibility
            if (currentScrollY > prevScrollY && currentScrollY > navbarVisibilityThreshold) {
                isNavbarVisible = false;
            } else {
                isNavbarVisible = true;
            }
            
            prevScrollY = currentScrollY;
        }
    });
    
    // Update blur based on scroll position
    function updateBlur(currentScrollY = 0) {
        if (!browser) return;
        
        // Calculate blur amount based on scroll position
        if (currentScrollY <= blurStartOffset) {
            blurAmount = 0;
        } else if (currentScrollY >= blurFullOffset) {
            blurAmount = maxBlur;
        } else {
            // Linear interpolation between 0 and maxBlur
            const scrollProgress = (currentScrollY - blurStartOffset) / (blurFullOffset - blurStartOffset);
            blurAmount = maxBlur * scrollProgress;
        }
    }

    function scrollToTop() {
        if (browser) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    onMount(() => {
        if (!browser) return;
        
        // Initial blur calculation
        updateBlur(0);
    });
    
    onDestroy(() => {
        // Clean up the store subscription
        unsubscribe();
    });
</script>

<style>
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        transition: transform var(--transition-duration) ease-in-out;
    }
    
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--navbar-height);
        padding: 0 60px;
        box-sizing: border-box;
        backdrop-filter: blur(var(--blur-amount)); /* Blurred background */
        -webkit-backdrop-filter: blur(var(--blur-amount)); /* For Safari */
        position: relative; /* For positioning the line */
    }

    .navbar-line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: var(--line-width);
        height: var(--line-height);
        background-color: var(--line-color);
    }

    .logo {
        font-size: var(--logo-font-size);
        font-weight: bold;
        padding: 0;
        color: var(--logo-text-color);
        font-family: inherit;
        line-height: 70%;
    }
    
    .role {
        font-size: var(--role-font-size);
        padding: 0;
        color: var(--role-text-color);
        font-family: inherit;
        line-height: 70%;
    }

    .nav-links {
        display: flex;
        gap: 30px;
    }

    .nav-links a {
        text-decoration: none;
        color: var(--nav-links-color);
        font-size: var(--links-font-size);
        transition: color 0.3s;
    }

    .nav-links a:hover {
        color: var(--nav-links-hover-color); /* Blue hover effect */
    }
    
    .logo-container {
        border: none;
        display: flex;
        align-items: center;
        text-align: center;
        gap: 30px;
        padding: 20px 0;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .logo-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
        }
        
        .logo {
            font-size: var(--mobile-logo-font-size);
        }
        
        .role {
            font-size: var(--mobile-role-font-size);
        }
        
        .navbar {
            height: var(--navbar-height);
            padding: 15px 30px;
        }
        
        .nav-links a {
            font-size: var(--mobile-links-font-size);
        }
    }
</style>

<div 
    class="navbar-container" 
    style="
        --navbar-height: {navbarHeight}; 
        --transition-duration: {transitionDuration};
        --logo-font-size: {logoFontSize};
        --role-font-size: {roleFontSize};
        --links-font-size: {linksFontSize};
        --mobile-logo-font-size: {mobileFontSizeLogo};
        --mobile-role-font-size: {mobileFontSizeRole};
        --mobile-links-font-size: {mobileFontSizeLinks};
        --line-color: {lineColor};
        --line-width: {lineWidth};
        --line-height: {lineHeight};
        --logo-text-color: {logoTextColor};
        --role-text-color: {roleTextColor};
        --nav-links-color: {navLinksColor};
        --nav-links-hover-color: {navLinksHoverColor};
        --blur-amount: {blurAmount}px;
        transform: translateY({isNavbarVisible ? '0' : `-${navbarHeight}`});
    "
>
    <div class="navbar">
        <button class="logo-container" on:click={scrollToTop}>
            <span class="logo" >{logo}</span>
            <span class="role" >{role}</span>
        </button>
        <nav class="nav-links">
            {#each links as link}
                <a href={link.href}>{link.name}</a>
            {/each}
        </nav>
        <div class="navbar-line"></div>
    </div>
</div>