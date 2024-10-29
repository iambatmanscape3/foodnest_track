document.addEventListener('DOMContentLoaded', fetchNumbers);



function fetchNumbers() {
    console.log('started')
    fetch('https://e08b-157-245-105-67.ngrok-free.app/web/numbers',{
        headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Data ${data}`)
            const dropdown = document.getElementById('existingNumbers');
            dropdown.innerHTML = '<option value="" disabled selected>Select a number to view</option>';
            data.Phone.forEach(item => {
                let option = document.createElement('option');
                option.value = item.Phone; // Assuming Phone is unique
                option.textContent = item.Phone;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching numbers:', error));
}

function addNumber() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber) {
        fetch('https://e08b-157-245-105-67.ngrok-free.app/web/numbers/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "phone number": phoneNumber })
        })
        .then(response => response.json())
        .then(() => {
            alert('Number added successfully!');
            fetchNumbers();
            document.getElementById('phoneNumber').value = '';
        })
        .catch(error => console.error('Error adding number:', error));
    } else {
        alert('Please enter a phone number');
    }
}

function removeNumber() {
    const dropdown = document.getElementById('existingNumbers');
    const selectedPhone = dropdown.value;
    if (selectedPhone) {
        fetch('https://e08b-157-245-105-67.ngrok-free.app/web/numbers/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "phone number": selectedPhone })
        })
        .then(response => response.json())
        .then(() => {
            alert('Number removed successfully!');
            fetchNumbers();
        })
        .catch(error => console.error('Error deleting number:', error));
    } else {
        alert('Please select a number to remove');
    }
}
