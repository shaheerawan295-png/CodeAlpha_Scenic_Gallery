const images = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filters button");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let currentIndex = 0;

function getVisibleImages() {
    return Array.from(images).filter((image) => image.style.display !== "none");
}

images.forEach((image) => {
    image.addEventListener("click", () => {
        const visibleImages = getVisibleImages();
        currentIndex = visibleImages.indexOf(image);
        showImage();
        lightbox.style.display = "flex";
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function showImage() {
    const visibleImages = getVisibleImages();
    if (!visibleImages.length) return;

    if (currentIndex < 0) currentIndex = visibleImages.length - 1;
    if (currentIndex >= visibleImages.length) currentIndex = 0;

    lightboxImage.src = visibleImages[currentIndex].src;
    lightboxImage.alt = visibleImages[currentIndex].alt;
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    showImage();
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    showImage();
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
});

function filterImages(category) {
    images.forEach((image) => {
        const matches = category === "all" || image.dataset.category === category;
        image.style.display = matches ? "block" : "none";
    });

    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === category);
    });

    currentIndex = 0;
    showImage();
}