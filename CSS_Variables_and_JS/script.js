const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
    console.log(this.id);
   const suffix = this.dataset.sizing || '';
   if (this.id === "opacity") {
       document.documentElement.style.setProperty(`--${this.name}`, this.value/100)
   } else document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));