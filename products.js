// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ1GL6GMxH8vwZL02dp2dFGhm0PR1rqXo",
    authDomain: "hackaton-de376.firebaseapp.com",
    projectId: "hackaton-de376",
    storageBucket: "hackaton-de376.appspot.com",
    messagingSenderId: "547286971895",
    appId: "1:547286971895:web:2aa3b177638e0698afeaf2"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Display Products Functionality
const productsContainer = document.getElementById('products-container');

db.collection('products').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const product = doc.data();

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2 style="font-weight: bold; font-size: 1.5em;">${product.name}</h2>
        <p style="font-weight: bold; font-size: 1.2em;">Rs.${product.price}</p>
        <p>Category: ${product.category}</p>
        <p style="font-size: 0.9em;">Quantity: ${product.quantity}</p>
    `;
    

        productsContainer.appendChild(productDiv);
    });
}).catch((error) => {
    alert('Error getting products: ' + error.message);
});
