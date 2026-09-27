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
    const img = new Image();

img.onload = function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 300;
  canvas.height = 300;

  ctx.drawImage(img, 0, 0, 300, 300);

  const data = ctx.getImageData(0, 0, 300, 300).data;

  let onionPixels = 0;
  let darkPixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isOnionColor =
      r > 100 &&
      r > g * 1.15 &&
      r > b * 1.25 &&
      g > 40;

    if (isOnionColor) {
      onionPixels++;

      if (r < 120 || g < 65 || b < 45) {
        darkPixels++;
      }
    }
  }

  if (onionPixels === 0) {
    resultBox.innerHTML =
      "<p>Unable to detect an onion in this image. Please upload a clear onion image.</p>";
    return;
  }

  const defectRatio = darkPixels / onionPixels;

  let grade;
  let confidence;
  let defects;
  let quality;
  let shelfLife;

  if (defectRatio < 0.08) {
    grade = "A";
    confidence = 90;
    defects = "Low";
    quality = "Good";
    shelfLife = "25–30 days";
  } else if (defectRatio < 0.18) {
    grade = "B";
    confidence = 84;
    defects = "Moderate";
    quality = "Acceptable";
    shelfLife = "15–24 days";
  } else {
    grade = "C";
    confidence = 78;
    defects = "High";
    quality = "Needs attention";
    shelfLife = "7–14 days";
  }

  resultBox.innerHTML = `
    <div style="margin-top:20px;padding:20px;border-radius:12px;background:#f1f8f4;">
      <h3>Onion Quality Result</h3>
      <p><strong>Grade:</strong> ${grade}</p>
      <p><strong>Confidence:</strong> ${confidence}%</p>
      <p><strong>Visible Defects:</strong> ${defects}</p>
      <p><strong>Quality:</strong> ${quality}</p>
      <p><strong>Estimated Shelf Life:</strong> ${shelfLife}</p>
    </div>
  `;

  URL.revokeObjectURL(img.src);
};

img.src = URL.createObjectURL(selectedImage);
  });
}
