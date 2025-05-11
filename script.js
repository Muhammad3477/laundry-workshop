// Script untuk menangani form penjemputan
document.addEventListener('DOMContentLoaded', function () {
    // Form Penjemputan
    const pickupForm = document.getElementById('pickup-form');
    const submitButton = pickupForm ? pickupForm.querySelector('button[type="submit"]') : null;

    if (pickupForm && submitButton) {
        pickupForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Mencegah form submit normal

            const name = document.getElementById('pickup-name').value.trim();
            const address = document.getElementById('pickup-address').value.trim();
            const area = document.getElementById('pickup-area').value;
            const date = document.getElementById('pickup-date').value;
            const time = document.getElementById('pickup-time').value;

            if (name && address && area && date && time) {
                // Tambahkan spinner dan ubah tombol
                submitButton.disabled = true;
                submitButton.innerHTML = `<span class="spinner"></span> Sedang mengirim...`;

                // Fade out form
                pickupForm.style.opacity = "0.5";

                setTimeout(function () {
                    // Reset semua
                    pickupForm.reset();
                    pickupForm.style.opacity = "1";
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Jadwalkan Penjemputan';

                    // Tampilkan toast notification modern dengan emoji
                    showToast('Penjemputan berhasil dijadwalkan! 🚚✅');
                }, 2000);

            } else {
                // Tampilkan toast notification error
                showToast('Mohon lengkapi semua data terlebih dahulu. ⚠️❌', true);
            }
        });
    }

    // Script Toggle Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Script Navbar Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Function untuk Toast Notification Modern
    function showToast(message, isError = false) {
        const toastContainer = document.getElementById('toast-container') || createToastContainer();
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) {
            toast.classList.add('error');
            toast.innerHTML = `❌ ${message}`;
        } else {
            toast.innerHTML = `✅ ${message}`;
        }
        toastContainer.appendChild(toast);

        // Animasi muncul
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // Klik untuk tutup manual
        toast.addEventListener('click', () => {
            hideToast(toast);
        });

        // Toast hilang otomatis setelah 3 detik
        setTimeout(() => {
            hideToast(toast);
        }, 3000);
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    }

    function hideToast(toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }
});

// Script Kirim ke WhatsApp
document.getElementById('pickup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('pickup-name').value;
    const address = document.getElementById('pickup-address').value;
    const area = document.getElementById('pickup-area').value;
    const date = document.getElementById('pickup-date').value;
    const time = document.getElementById('pickup-time').value;

    const message = `Halo LaundryKu,%0ASaya ingin menjadwalkan penjemputan:%0A%0ANama: ${name}%0AAlamat: ${address}%0AArea: ${area}%0ATanggal: ${date}%0AWaktu: ${time}`;

    const whatsappURL = `https://wa.me/6285771306728?text=${message}`;

    window.open(whatsappURL, '_blank');
});
