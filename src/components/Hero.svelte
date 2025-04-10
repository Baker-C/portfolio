<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Hero content and style variables
  const heroContent = {
    titleFirstWord: "SOFTWARE",
    titleRotatingWords: [
      "DEVELOPER", 
      "ENGINEER", 
      "CONSULTANT", 
      "PERFECTIONIST"
    ],
    greetingtext: "Hi, it's great to meet you!", 
    subtext: "I am a developer and engineer based in San Francisco. While I specialize in building (and occasionally designing) exceptional digital experiences and systems, my love lies in creating ways to make knowledge more accessible.",
    funsubtext: "& snowboarding & dumplings & my cats",
    buttons: [{ 
        text: "Look at my past projects", 
        class: "btn-light" 
      },{ 
        text: "Available for hire starting", 
        class: "btn-light" 
    }]
  };

  // Background image variable
  const heroBackground = "/assets/bg-image.jpg";

  // Color variables
  const heroColors = {
    backgroundColor: "black",
    textColor: "white"
  };
  
  // Variables for title animation
  let currentWordIndex = 0;
  let nextWordIndex = 1;
  let isAnimating = false;
  let intervalId;
  let intervalDelay = 3000;
  let animationDuration = 1000;

  // Add these to your existing variables
  const buttonSettings = {
    arrowSize: "48px",           // Size of the arrow icon
    arrowRotation: "0deg",       // Default rotation angle
    arrowMargin: "0 0 0 10px",   // Margin around the arrow (top, right, bottom, left)
    primaryArrowRotation: "45deg", // Rotation for first button's arrow
    secondaryArrowRotation: "90deg" // Rotation for second button's arrow
  };
  
  // Font variables - NEW
  const fontSettings = {
    titleFirstWordFont: "'Inter', sans-serif",
    titleRotatingWordFont: "'PT Serif', sans-serif",
    subtextFont: "'Inter', sans-serif",
    greetingTextFont: "'Inter', sans-serif",
    funTextFont: "'Inter', italic, sans-serif",
    buttonFont: "'Space Grotesk', sans-serif",
    
    // Font weights
    titleFirstWordWeight: "600",
    titleRotatingWordWeight: "300",
    subtextWeight: "400",
    greetingTextWeight: "500",
    funTextWeight: "300",
    buttonWeight: "500",
    
    // Font sizes (you can adjust these or keep your existing sizes)
    titleFirstWordSize: "5.2rem",
    titleRotatingWordSize: "5.7rem",
    subtextSize: "1.2rem",
    greetingTextSize: "0.9rem",
    funTextSize: "0.6rem",
    buttonSize: "0.9rem"
  };
  
  function scrollToBottom() {
    if (typeof window !== 'undefined') {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      
      window.scrollTo({
        top: documentHeight,
        behavior: 'smooth'
      });
    }
  }
  // Function to rotate words with animation
  function rotateWords() {
    if (isAnimating) return;
    
    isAnimating = true;
    console.log("Rotating to:", heroContent.titleRotatingWords[nextWordIndex]);
    
    // Update indices
    nextWordIndex = (currentWordIndex + 1) % heroContent.titleRotatingWords.length;
    
    // After animation completes
    setTimeout(() => {
      currentWordIndex = nextWordIndex;
      nextWordIndex = (nextWordIndex + 1) % heroContent.titleRotatingWords.length;
      isAnimating = false;
    }, animationDuration); // This should match the CSS animation duration
  }
  
  onMount(() => {
    console.log("Component mounted, current word:", heroContent.titleRotatingWords[currentWordIndex]);
    // Start rotation interval with a delay
    setTimeout(() => {
      intervalId = setInterval(rotateWords, intervalDelay);
    }, intervalDelay);
  });
  
  onDestroy(() => {
    // Clear interval on component destruction
    if (intervalId) clearInterval(intervalId);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
</svelte:head>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: start;
    justify-content: space-between;
    color: var(--text-color);
    padding: 20px;
    padding-top: 100px;
    height: 140vh;
    overflow: hidden;
  }
  
  .hero-background {
    position: fixed; /* Make background sticky */
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center center;
    z-index: -2;
  }

  .hero-content {
    width: 100%;
    gap: 0%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title-section {
    position: relative;
    margin-right: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  .content-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 500px;
  }

  /* Title animation styles */
  .hero-title {
    font-size: 5.5rem;
    margin: 0;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    align-items: end;
    justify-content: start;
    margin-top: 30px;
  }
  
  .title-first-word {
    font-family: var(--title-first-word-font);
    font-weight: var(--title-first-word-weight);
    font-size: var(--title-first-word-size);
    margin-left: 5px;
    margin-right: 0.5rem;
    white-space: nowrap;
    line-height: 80%;
  }
  
  .title-rotating-container {
    font-family: var(--title-rotating-word-font);
    font-weight: var(--title-rotating-word-weight);
    font-size: var(--title-rotating-word-size);
    position: relative;
    font-style: italic;
    overflow: hidden;
    line-height: 80%;
    height: 4.2rem; /* Slightly larger than font size to accommodate overflow */
    display: inline-block;
    min-width: 34rem;
    width: fit-content; /* Ensure container has width */
    letter-spacing: -0.11em;
  }
  
  .title-word {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  
  /* Animation classes */
  .animate-out {
    animation: slideUpFade var(--rotation-animation-duration) forwards;
  }
  
  .animate-in {
    animation: slideInFade var(--rotation-animation-duration) forwards;
  }
  
  @keyframes slideUpFade {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    30% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  
  @keyframes slideInFade {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    30% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .hero-subtext {
    font-family: var(--subtext-font);
    font-weight: var(--subtext-weight);
    font-size: var(--subtext-size);
    margin: 10px 0;
  }

  .hero-greetingtext {
    font-family: var(--greeting-text-font);
    font-weight: var(--greeting-text-weight);
    font-size: var(--greeting-text-size);
    margin: 0;
    font-style: italic;
  }

  .hero-funsubtext {
    font-family: var(--fun-text-font);
    font-weight: var(--fun-text-weight);
    font-size: var(--fun-text-size);
    margin: 0;
    color: var(--text-color);
    padding: 0 20px;
    font-style: italic;
  }

  .btn-light {
    font-family: var(--button-font);
    font-weight: var(--button-weight);
    font-size: var(--button-size);
    background: none;
    color: var(--button-text-color);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  }

  .title-button {
    margin-top: 15px;
  }

  .content-button {
    position: absolute;
    bottom: -40px;
    right: 0;
  }
  
  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      align-items: center;
    }
    
    .hero-content {
      max-width: 100%;
      flex-direction: column;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .title-section, .content-section {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }

    .content-button {
      position: absolute;
      margin-top: 20px;
      top: 100px;
    }
    
    .hero-title {
      justify-content: center;
    }
  }

  /* Add this to your existing styles */
  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow-icon {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .btn-light:hover .arrow-icon {
    transform: rotate(45deg); /* Rotate on hover effect */
  }
</style>

<div 
  class="hero" 
  style="
    --text-color: {heroColors.textColor};
    --rotation-animation-duration: {animationDuration}ms;
    
    /* Font family variables */
    --title-first-word-font: {fontSettings.titleFirstWordFont};
    --title-rotating-word-font: {fontSettings.titleRotatingWordFont};
    --subtext-font: {fontSettings.subtextFont};
    --greeting-text-font: {fontSettings.greetingTextFont};
    --fun-text-font: {fontSettings.funTextFont};
    --button-font: {fontSettings.buttonFont};
    
    /* Font weight variables */
    --title-first-word-weight: {fontSettings.titleFirstWordWeight};
    --title-rotating-word-weight: {fontSettings.titleRotatingWordWeight};
    --subtext-weight: {fontSettings.subtextWeight};
    --greeting-text-weight: {fontSettings.greetingTextWeight};
    --fun-text-weight: {fontSettings.funTextWeight};
    --button-weight: {fontSettings.buttonWeight};
    
    /* Font size variables */
    --title-first-word-size: {fontSettings.titleFirstWordSize};
    --title-rotating-word-size: {fontSettings.titleRotatingWordSize};
    --subtext-size: {fontSettings.subtextSize};
    --greeting-text-size: {fontSettings.greetingTextSize};
    --fun-text-size: {fontSettings.funTextSize};
    --button-size: {fontSettings.buttonSize};
  "
>

  <div class="hero-background" style="background-image: url({heroBackground});"></div>
  
  <div class="hero-content">
    <div class="title-section">
      <button class="btn-light title-button" on:click={scrollToBottom} >
        <span class="button-content">
          {heroContent.buttons[0].text}
          <span class="arrow-icon" style="
            width: {buttonSettings.arrowSize}; 
            height: {buttonSettings.arrowSize}; 
            margin: {buttonSettings.arrowMargin};
            transform: rotate({buttonSettings.primaryArrowRotation});
          ">
            <img src="/assets/loop-arrow.png" alt="Arrow" width="100%" height="100%" />
          </span>
        </span>
      </button>
      <h1 class="hero-title">
        <span class="title-first-word">{heroContent.titleFirstWord}</span>
        <span class="title-rotating-container">
          <!-- Fixed positioning of current word -->
          <span class="title-word {isAnimating ? 'animate-out' : ''}">
            {heroContent.titleRotatingWords[currentWordIndex]}
          </span>
          
          <!-- Only show the next word during animations -->
          {#if isAnimating}
            <span class="title-word animate-in" style="transform: translateY(100%);">
              {heroContent.titleRotatingWords[nextWordIndex]}
            </span>
          {/if}
        </span>
      </h1>
    </div>
    
    <div class="content-section">
      <p class="hero-greetingtext">{heroContent.greetingtext}</p>
      <p class="hero-subtext">{heroContent.subtext}<span class="hero-funsubtext">{heroContent.funsubtext}</span></p>
      <button class="btn-light content-button">{heroContent.buttons[1].text}</button>
    </div>
  </div>
</div>