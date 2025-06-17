# 🎃 Halloween Pumpkin Glow Animation

Create your own spooky animated pumpkin with custom text and Halloween glow color!  
Made with Rive and JavaScript.

## ✨ Features

- 🔤 Custom animated text around the pumpkin  
- 🎨 Color picker to control the Halloween glow  
- ⚙️ Built using Rive’s state machine & canvas API  

## 🧪 Handy Snippet

```js
const r = new rive.Rive({
  src: 'color_mixing.riv',
  canvas: animationPattern,
  artboard: 'Pumpkin color mixing',
  stateMachines: ['Haloween pumpkin'],
  autoplay: true,
  onLoad: () => {
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
      redColor.value = parseInt(color.slice(1, 3), 16);
      greenColor.value = parseInt(color.slice(3, 5), 16);
      blueColor.value = parseInt(color.slice(5, 7), 16);
    }
  }
});
