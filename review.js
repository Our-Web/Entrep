
document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star-rating span");
    const ratingInput = document.getElementById("rating");
    const reviewList = document.getElementById("review-list");
    const nameInput = document.getElementById("name");
    const anonymousToggle = document.getElementById("anonymous-toggle");
    const form = document.getElementById("review-form");

    if (!form || !reviewList || !ratingInput || !nameInput || !anonymousToggle) {
        console.error("One or more required elements are missing in HTML.");
        return;
    }

    anonymousToggle.addEventListener("change", function () {
        if (anonymousToggle.checked) {
            nameInput.value = "Anonymous";
            nameInput.setAttribute("disabled", "true");
        } else {
            nameInput.value = "";
            nameInput.removeAttribute("disabled");
        }
    });

    stars.forEach(star => {
        star.addEventListener("click", function () {
            const selectedRating = parseInt(star.getAttribute("data-value"));
            ratingInput.value = selectedRating;

            stars.forEach(s => s.classList.remove("selected"));

            stars.forEach(s => {
                if (parseInt(s.getAttribute("data-value")) <= selectedRating) {
                    s.classList.add("selected");
                }
            });
        });
    });

});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZ-2hFq9hCkRGid0Hm-kYWfbVEMRoFnCg",
  authDomain: "entrep-web-28f06.firebaseapp.com",
  projectId: "entrep-web-28f06",
  storageBucket: "entrep-web-28f06.appspot.com", 
  messagingSenderId: "475681344967",
  appId: "1:475681344967:web:24d9688bfbb54d2f775de2",
  measurementId: "G-4YCZE9ZBP3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value || "Anonymous";
    const rating = parseInt(document.getElementById("rating").value);
    const message = document.getElementById("review-message").value;

    if (!message.trim() || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please provide a valid review with a rating between 1 and 5.");
        return;
    }

    await addDoc(collection(db, "reviews"), {
        name,
        rating,
        message,
        date: new Date().toISOString()
    });

    alert("Review submitted successfully!");
    loadReviews();
});

async function loadReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviewList = document.getElementById("review-list");

    if (!reviewList) {
        console.error("Review list element not found.");
        return;
    }

    reviewList.innerHTML = "";
    let totalStars = 0;
    let totalReviews = 0;
    const starCounts = [0, 0, 0, 0, 0];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalStars += data.rating;
        totalReviews++;
        starCounts[data.rating - 1]++;

        const reviewEntry = document.createElement("div");
        reviewEntry.innerHTML = `<strong>${data.name}</strong> - ${'★'.repeat(data.rating)}<br>${data.message}`;
        reviewEntry.style.marginBottom = "15px";
        reviewList.appendChild(reviewEntry);
    });

    updateStats(totalReviews, totalStars, starCounts);
}

function updateStats(totalReviews, totalStars, starCounts) {
    const totalStarsEl = document.getElementById("total-stars");
    const avgRatingEl = document.getElementById("average-rating");
    const starStatsEl = document.getElementById("star-statistics");

    if (totalStarsEl && avgRatingEl && starStatsEl) {  
        totalStarsEl.textContent = `Total Reviews: ${totalReviews}`;
        avgRatingEl.textContent = `Average Rating: ${(totalStars / totalReviews).toFixed(1) || 0}★`;
        starStatsEl.innerHTML = `
            5★: ${starCounts[4]} | 4★: ${starCounts[3]} | 3★: ${starCounts[2]} |
            2★: ${starCounts[1]} | 1★: ${starCounts[0]}
        `;
    } else {
        console.error("Statistics elements not found in HTML.");
    }
}

loadReviews();
