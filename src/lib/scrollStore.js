import { writable } from 'svelte/store';

// Create a writable store with initial value 0
export const scrollY = writable(0);

// Only set up the scroll listener in the browser
if (typeof window !== 'undefined') {
    // Update the store value when the page scrolls
    window.addEventListener('scroll', () => {
        scrollY.set(window.scrollY);
    });
}