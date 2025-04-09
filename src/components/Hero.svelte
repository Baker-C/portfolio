<script>
  import App from './App.svelte';

  // Hero content and style variables
  const heroContent = {
    title: "Welcome to My Portfolio",
    subtitle: "Showcasing my work and projects",
    buttons: [
      { text: "Get Started", class: "btn-primary" },
      { text: "Learn More", class: "btn-secondary" }
    ]
  };

  // Background image variable
  const heroBackground = "/assets/bg-image.jpg";

  // Color variables
  const heroColors = {
    backgroundColor: "#007BFF",
    textColor: "white",
    primaryButtonColor: "#0056b3",
    secondaryButtonColor: "#6c757d",
    buttonTextColor: "white"
  };
</script>

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
    max-width: 50%;
    z-index: 1;
  }

  .hero-title {
    font-size: 2rem;
    margin: 0;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  .hero-buttons {
    margin-top: 20px;
  }

  .hero-buttons button {
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: var(--primary-button-color);
    color: var(--button-text-color);
  }

  .btn-secondary {
    background-color: var(--secondary-button-color);
    color: var(--button-text-color);
  }

  .hero-image {
    position: absolute;
    top: 0;
    right: -300px;
    width: 1000px;
    height: auto;
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      align-items: center;
    }
    
    .hero-content {
      max-width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .hero-image {
      max-width: 90%;
    }
  }
</style>

<div 
  class="hero" 
  style="
    --text-color: {heroColors.textColor};
    --primary-button-color: {heroColors.primaryButtonColor};
    --secondary-button-color: {heroColors.secondaryButtonColor};
    --button-text-color: {heroColors.buttonTextColor};
  "
>
  <div class="hero-background" style="background-image: url({heroBackground});"></div>
  
  <div class="hero-content">
    <h1 class="hero-title">{heroContent.title}</h1>
    <p class="hero-subtitle">{heroContent.subtitle}</p>
    <div class="hero-buttons">
      {#each heroContent.buttons as button}
        <button class={button.class}>{button.text}</button>
      {/each}
    </div>
  </div>
  <div class="hero-image">
    <App />
  </div>
</div>