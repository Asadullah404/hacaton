// Upload Product Functionality
const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productCategory = document.getElementById('product-category').value;
    const productQuantity = document.getElementById('product-quantity').value;
    const productImage = document.getElementById('product-image').files[0];

    const storageRef = firebase.storage().ref(`product_images/${productImage.name}`);
    const uploadTask = storageRef.put(productImage);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Optional: Handle upload progress
        }, 
        (error) => {
            alert('Error uploading image: ' + error.message);
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection('products').add({
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    quantity: productQuantity,
                    imageUrl: downloadURL
                }).then(() => {
                    alert('Product uploaded successfully!');
                    productForm.reset();
                }).catch((error) => {
                    alert('Error saving product: ' + error.message);
                });
            });
        }
    );
});
