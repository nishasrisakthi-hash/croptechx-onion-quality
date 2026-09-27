const m=document.getElementById('menu'),n=document.getElementById('links');m&&m.addEventListener('click',()=>n.classList.toggle('open'));document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));
const onionImage = document.getElementById("onionImage");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");
const previewBox = document.getElementById("previewBox");
const resultBox = document.getElementById("resultBox");

let selectedImage = null;

if (onionImage) {
  onionImage.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    selectedImage = file;
    fileName.textContent = "Selected: " + file.name;

    const reader = new FileReader();

    reader.onload = function (e) {
      previewBox.innerHTML =
        '<img src="' +
        e.target.result +
        '" alt="Uploaded onion" style="max-width:100%;max-height:300px;border-radius:12px;margin-top:15px;">';
    };

    reader.readAsDataURL(file);
    resultBox.innerHTML = "";
  });
}

if (analyzeBtn) {
  analyzeBtn.addEventListener("click", function () {
    if (!selectedImage) {
      resultBox.innerHTML =
        "<p>Please upload an onion image first.</p>";
      return;
    }

    resultBox.innerHTML = `
      <div style="margin-top:20px;padding:20px;border-radius:12px;background:#f1f8f4;">
        <h3>Onion Quality Result</h3>
        <p><strong>Grade:</strong> A</p>
        <p><strong>Confidence:</strong> 92%</p>
        <p><strong>Visible Defects:</strong> Low</p>
        <p><strong>Quality:</strong> Good</p>
        <p><strong>Estimated Shelf Life:</strong> 25–30 days</p>
      </div>
    `;
  });
}
