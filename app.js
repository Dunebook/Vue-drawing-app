const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    const message = ref("Drawing App");
    const painting = ref(false);
    const canvas = ref(null);
    const ctx = ref(null);
    const colors = ref(["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]);

    const changeColor = (color) => {
        ctx.value.strokeStyle = color;
      };
  
      const clearCanvas = () => {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      };
  
      const startPainting = (e) => {
        painting.value = true;
        draw(e);
      };
  
      const finishedPainting = () => {
        painting.value = false;
        ctx.value.beginPath();
      };
  
      const draw = (e) => {
        if (!painting.value) return;
  
        ctx.value.lineWidth = 10;
        ctx.value.lineCap = "round";
  
        ctx.value.lineTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop);
        ctx.value.stroke();
  
        ctx.value.beginPath();
        ctx.value.moveTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop);
      };
  
      onMounted(() => {
        canvas.value = document.getElementById("canvas");
        ctx.value = canvas.value.getContext("2d");
  
        // Set default stroke color
        ctx.value.strokeStyle = colors.value[0];
  
        // Resize canvas
        canvas.value.height = window.innerHeight * 0.6;
        canvas.value.width = window.innerWidth * 0.8;
      });
  
      return {
        message,
        painting,
        canvas,
        ctx,
        colors,
        changeColor,
        clearCanvas,
        startPainting,
        finishedPainting,
        draw,
      };
    },
  }).mount("#app");
  