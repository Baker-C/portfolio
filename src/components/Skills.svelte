<script>
    // Adjustable variables
    export let headerText = "My Skills";
    export let headerLineColor = "#ccc";
    export let cardTextColor = "#000";
    export let cardGradientStart = "#ffffff";
    export let cardGradientEnd = "#000000";
    export let cardBorderRadius = "8px";
    
    // Card size variables (replacing columns/rows)
    export let cardWidth = "200px";
    export let cardHeight = "180px";
    export let minGapBetweenCards = "1rem";

    // Example data for cards
    export let cards = [
        { text: "Skill 1", image: "/path/to/image1.png" },
        { text: "Skill 2", image: "/path/to/image2.png" },
        { text: "Skill 3", image: "/path/to/image3.png" },
        { text: "Skill 4", image: "/path/to/image4.png" },
        { text: "Skill 5", image: "/path/to/image5.png" },
        { text: "Skill 6", image: "/path/to/image6.png" },
        { text: "Skill 7", image: "/path/to/image7.png" },
        { text: "Skill 8", image: "/path/to/image8.png" },
        { text: "Skill 9", image: "/path/to/image9.png" },
        { text: "Skill 10", image: "/path/to/image10.png" }
    ];
</script>

<style>
    section {
        padding: 2rem;
    }

    h2 {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .line {
        width: 50px;
        height: 4px;
        background-color: var(--header-line-color);
        margin: 0 auto 2rem;
    }

    .skills-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--min-gap);
        max-width: 1200px;
        margin: 0 auto;
    }

    /* Flex container to help center cards */
    .card-wrapper {
        display: flex;
        justify-content: center;
        flex-grow: 1;
    }

    .card {
        background: linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end));
        border-radius: var(--card-border-radius);
        padding: 1rem;
        text-align: center;
        color: var(--card-text-color);
        width: var(--card-width);
        height: var(--card-height);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .card img {
        max-width: 100%;
        max-height: 60%;
        object-fit: contain;
        border-radius: var(--card-border-radius);
        margin-bottom: 0.5rem;
    }
    
    /* Media query for smaller screens */
    @media (max-width: 768px) {
        .card {
            width: calc(var(--card-width) * 0.8);
            height: calc(var(--card-height) * 0.8);
        }
    }
</style>

<section id="skills">
    <h2>{headerText}</h2>
    <div class="line" style="--header-line-color: {headerLineColor};"></div>
    <div
        class="skills-grid"
        style="
            --card-gradient-start: {cardGradientStart};
            --card-gradient-end: {cardGradientEnd};
            --card-border-radius: {cardBorderRadius};
            --card-text-color: {cardTextColor};
            --card-width: {cardWidth};
            --card-height: {cardHeight};
            --min-gap: {minGapBetweenCards};
        "
    >
        {#each cards as card}
            <div class="card-wrapper">
                <div class="card">
                    <img src={card.image} alt={card.text} />
                    <p>{card.text}</p>
                </div>
            </div>
        {/each}
    </div>
</section>