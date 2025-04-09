<script>
    import { onMount, onDestroy } from 'svelte';
    
    // Section text variables
    export let headerText = "Our Services";
    export let descriptionText = "We offer a wide range of professional services to meet your needs.";
    
    // Section style variables
    export let headerColor = "#333";
    export let lineColor = "#007BFF";
    export let descriptionColor = "#555";
    
    // Indicator style variables
    const indicatorStyles = {
        activeColor: "#007BFF",
        inactiveColor: "#ccc",
        size: "12px",
        spacing: "8px"
    };
    
    // Card style variables
    const cardStyles = {
        borderRadius: "20px",
        gradientStart: "white",
        gradientEnd: "black",
        headingColor: "#fff",
        textColor: "#eee",
        width: "350px",
        height: "233px"  // 1.5x aspect ratio
    };
    
    // Card content - can be expanded as needed
    let services = [
        {
            id: 1,
            title: "Web Development",
            description: "Custom websites built with modern frameworks and responsive design principles."
        },
        {
            id: 2,
            title: "UI/UX Design",
            description: "User-centered design focusing on intuitive interfaces and exceptional user experiences."
        },
        {
            id: 3,
            title: "Digital Marketing",
            description: "Strategic marketing campaigns to increase visibility and drive conversions."
        },
        {
            id: 4,
            title: "Content Creation",
            description: "Engaging and SEO-optimized content that connects with your target audience."
        },
        {
            id: 5,
            title: "Brand Strategy",
            description: "Comprehensive brand development to establish a strong market presence."
        }
    ];
    
    // Carousel state
    let visibleServices = services.slice(0, 3);
    let positions = ['left', 'center', 'right'];
    let rotationInterval = 0;
    
    // Active card index (for indicators)
    let activeCardIndex = 0;
    
    // Touch/swipe handling variables
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    const swipeThreshold = 50; // Minimum distance to count as a swipe
    
    // Set up autorotation
    onMount(() => {
        rotationInterval = setInterval(rotateRight, 10000);
    });
    
    onDestroy(() => {
        clearInterval(rotationInterval);
    });
    
    // Rotate carousel to the left
    function rotateLeft() {
        clearInterval(rotationInterval);
        
        // Get the last service from the array and add it to the beginning
        const lastService = services[services.length - 1];
        services = [lastService, ...services.slice(0, services.length - 1)];
        
        // Update visible services
        visibleServices = services.slice(0, 3);
        
        // Update active card index
        activeCardIndex = (activeCardIndex - 1 + services.length) % services.length;
        
        // Restart auto-rotation
        rotationInterval = setInterval(rotateRight, 10000);
    }
    
    // Rotate carousel to the right
    function rotateRight() {
        clearInterval(rotationInterval);
        
        // Get the first service from the array and add it to the end
        const firstService = services[0];
        services = [...services.slice(1), firstService];
        
        // Update visible services
        visibleServices = services.slice(0, 3);
        
        // Update active card index
        activeCardIndex = (activeCardIndex + 1) % services.length;
        
        // Restart auto-rotation
        rotationInterval = setInterval(rotateRight, 10000);
    }
    
    // Navigate directly to a specific card
    function navigateToCard(index = 0) {
        if (index === activeCardIndex) return;
        
        clearInterval(rotationInterval);
        
        // Calculate how many rotations needed
        let rotations = (index - activeCardIndex + services.length) % services.length;
        
        // Perform rotations
        if (rotations <= services.length / 2) {
            // Rotate right
            for (let i = 0; i < rotations; i++) {
                const firstService = services[0];
                services = [...services.slice(1), firstService];
            }
        } else {
            // Rotate left (shorter path)
            rotations = services.length - rotations;
            for (let i = 0; i < rotations; i++) {
                const lastService = services[services.length - 1];
                services = [lastService, ...services.slice(0, services.length - 1)];
            }
        }
        
        // Update visible services
        visibleServices = services.slice(0, 3);
        
        // Update active card index
        activeCardIndex = index;
        
        // Restart auto-rotation
        rotationInterval = setInterval(rotateRight, 10000);
    }
    
    // Touch/swipe handlers
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        isDragging = true;
    }
    
    function handleTouchMove(event) {
        if (!isDragging) return;
        touchEndX = event.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        if (!isDragging) return;
        
        const swipeDistance = touchEndX - touchStartX;
        
        // If the swipe distance exceeds the threshold, rotate the carousel
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right, rotate left
                rotateLeft();
            } else {
                // Swipe left, rotate right
                rotateRight();
            }
        }
        
        // Reset touch tracking
        isDragging = false;
    }
</script>

<style>
    section {
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        text-align: center;
    }
    
    .carousel-container {
        position: relative;
        height: 300px;
        margin: 3rem auto 1.5rem;
        perspective: 1000px;
        overflow: hidden;
            }
    
    .carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
    }
    
    .card {
        position: absolute;
        width: var(--card-width);
        height: var(--card-height);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        box-sizing: border-box;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        transition: all 0.5s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    .card.left, .card.right {
        transform: scale(0.5);
        filter: brightness(0.7);
        cursor: pointer;
    }
    
    .card.left {
        left: 10%;
        z-index: 1;
    }
    
    .card.center {
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }
    
    .card.right {
        right: 10%;
        z-index: 1;
    }
    
    .card h3 {
        color: var(--heading-color);
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .card p {
        color: var(--text-color);
        margin: 0;
        line-height: 1.5;
    }
    
    /* Indicator styles */
    .indicators {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .indicator {
        width: var(--indicator-size);
        height: var(--indicator-size);
        border-radius: 50%;
        background-color: var(--inactive-color);
        margin: 0 calc(var(--indicator-spacing) / 2);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .indicator.active {
        background-color: var(--active-color);
    }
</style>

<section>
    <h2 style="color: {headerColor};">{headerText}</h2>
    <hr style="width: 50px; height: 4px; background-color: {lineColor}; border: none; margin: 0.5rem auto;" />
    <p style="color: {descriptionColor}; max-width: 600px; margin: 0 auto 2rem;">{descriptionText}</p>
    
    <div class="carousel-container"
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}

    >
        <div class="carousel">
            {#each visibleServices as service, i}
                <div 
                    class="card {positions[i]}"
                    on:click={() => positions[i] === 'left' ? rotateLeft() : positions[i] === 'right' ? rotateRight() : null}
                    style="
                        --border-radius: {cardStyles.borderRadius};
                        --gradient-start: {cardStyles.gradientStart};
                        --gradient-end: {cardStyles.gradientEnd};
                        --heading-color: {cardStyles.headingColor};
                        --text-color: {cardStyles.textColor};
                        --card-width: {cardStyles.width};
                        --card-height: {cardStyles.height};
                    "
                >
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            {/each}
        </div>
    </div>
    
    <!-- Indicator circles -->
    <div class="indicators" style="
        --active-color: {indicatorStyles.activeColor};
        --inactive-color: {indicatorStyles.inactiveColor};
        --indicator-size: {indicatorStyles.size};
        --indicator-spacing: {indicatorStyles.spacing};
    ">
        {#each services as _, i}
            <button 
                class="indicator {i === activeCardIndex ? 'active' : ''}" 
                on:click={() => navigateToCard(i)}
                aria-label="Navigate to service {i + 1}"
            ></button>
        {/each}
    </div>
</section>