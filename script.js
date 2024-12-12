const colorPicker = document.getElementById("color-picker");
const animationPattern = document.getElementById("animation-pattern");
const buttons = document.querySelectorAll("button");
const texts = document.querySelectorAll("text");

// rgb to HEX code conversion
function rgbToHex(r,g,b) {
    // Ensure the values are within the 0-255 range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    
    // Convert each component to a two-digit hexadecimal value
    const redHex = r.toString(16).padStart(2, '0');
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');
    
    // Combine all three hexadecimal values into one string
    return `#${redHex}${greenHex}${blueHex}`;
}

const r = new rive.Rive({
    src: 'color_mixing.riv', // Replace with your Rive file path
    canvas: animationPattern,
    artboard: 'Pumpkin color mixing', // Replace with your artboard name
    stateMachines: ['Haloween pumpkin'], // Replace with your state machine name
    autoplay: true,
    onLoad: () => {
        // Retrieve state machine inputs after the Rive file loads
        const inputs = r.stateMachineInputs('Haloween pumpkin');
        const redColor = inputs.find(input => input.name === 'Red');
        const greenColor = inputs.find(input => input.name === 'Green');
        const blueColor = inputs.find(input => input.name === 'Blue');

        if (!redColor || !greenColor || !blueColor) {
            console.error("State machine inputs not found!");
            return;
        }


        function calculate(){
            const color = colorPicker.value;

            // Parse color values
            const red = parseInt(color.slice(1, 3), 16);
            const green = parseInt(color.slice(3, 5), 16);
            const blue = parseInt(color.slice(5, 7), 16);

            // Update Rive inputs
            redColor.value = red;
            greenColor.value = green;
            blueColor.value = blue;

            /*/update btn color to user input color
            buttons.forEach(button => {
                button.style.background = `${rgbToHex(red, green, blue)}`;
                button.style.color = `#000`;
            })*/

            document.documentElement.style.setProperty('--primary-color', color);

            for (let button of buttons){
                button.style.background = `${color}`;
                button.style.color = `#000`;
            }
            
            /*
            for (let text of texts){
                text.style.fill = `${color}`;
            }*/

        }

        // Add an event listener to the color picker
        colorPicker.addEventListener('input', calculate);
    },
});





//curved line text animation

    const textPath = document.getElementById('curve-text');
    const path = document.getElementById('curve');
    const pathLength = path.getTotalLength(); // Get the total length of the path
        
    const tickerText = document.getElementById('ticker-text');
        
    function updateText() {
        const updateText = tickerText.value;
        // Update only the text content of the existing <textPath>
        textPath.textContent = duplicateTextPath.textContent = updateText || "Featured Product Featured Product Featured Product";
    
    }
        
    tickerText.addEventListener('input', updateText);
        
    let offset = 50; // Starting position of the text along the path
    const speed = 2; // Adjust this value to change the speed of movement
        
    function animateText() {
        offset += speed; // Move the text backward along the path
        if (offset > pathLength) {
            offset = 0; // Reset the offset when the text finishes one loop
        }
        
    // Update the startOffset dynamically to move the text
        textPath.setAttribute('startOffset', `${offset}px`);

        // Place a duplicate text slightly ahead of the original to create seamless looping
        duplicateTextPath.setAttribute('startOffset', `${offset - pathLength}px`);
        
        requestAnimationFrame(animateText); // Recursively call for the next frame
    }
        
    animateText(); // Start the animation
        

