<script>
    import { onMount } from 'svelte';

    // Dimension and animation variables
    export let navbarHeight = "60px"; // Variable for navbar height
    export let transitionDuration = "0.3s"; // Control transition speed
    
    // Font size variables
    export let logoFontSize = "1rem";
    export let roleFontSize = "1rem";
    export let linksFontSize = "1rem";
    export let mobileFontSizeLogo = "0.8rem";
    export let mobileFontSizeRole = "1rem";
    export let mobileFontSizeLinks = "0.9rem";

    // Content variables
    const logo = "Charles Baker"; // Logo text or image
    const logoColor = "black"; // Logo color
    const role = "Software Developer"; 

    const links = [
        { name: "About", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Contact", href: "#contact" }
    ];

    // Scroll state variables
    let prevScrollY = 0;
    let isNavbarVisible = true;

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Handle scroll events to show/hide navbar
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY > prevScrollY) {
            // Scrolling down - hide navbar
            isNavbarVisible = false;
        } else {
            // Scrolling up - show navbar
            isNavbarVisible = true;
        }
        
        // Update previous scroll position
        prevScrollY = currentScrollY;
    }

    onMount(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Clean up event listener on component destruction
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
        padding: 0 20px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .logo {
        font-size: var(--logo-font-size);
        font-weight: bold;
        background: none;
        border: none;
        padding: 0;
        color: inherit;
        cursor: pointer;
        font-family: inherit;
        line-height: 70%;
    }
    
    .role {
        font-size: var(--role-font-size);
        line-height: 70%;
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

    .nav-links a {
        text-decoration: none;
        color: black;
        font-size: var(--links-font-size);
        transition: color 0.3s;
    }

    .nav-links a:hover {
        color: #007BFF; /* Blue hover effect */
    }
    
    .logo-container {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 10px;
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
            padding: 15px 15px;
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
        transform: translateY({isNavbarVisible ? '0' : `-${navbarHeight}`});
    "
>
    <div class="navbar">
        <div class="logo-container">
            <button class="logo" on:click={scrollToTop}>{logo}</button>
            <span class="role" style="color: {logoColor};">{role}</span>
        </div>
        <nav class="nav-links">
            {#each links as link}
                <a href={link.href}>{link.name}</a>
            {/each}
        </nav>
    </div>
</div>