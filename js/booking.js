document.addEventListener('DOMContentLoaded', function () {
    const bookingSteps = document.querySelectorAll('.booking-step');
    const stepIndicators = document.querySelectorAll('.step');
    let currentStep = 1;

    // Initialize Calendar
    function initCalendar() {
        // Add calendar implementation here
        // You can use libraries like FullCalendar or build a custom one
    }

    // Handle Space Selection
    const spaceOptions = document.querySelectorAll('.space-option');
    spaceOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove previous selection
            spaceOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selection to clicked option
            this.classList.add('selected');
            // Enable next step button
            document.querySelector('[data-next]').disabled = false;
        });
    });

    // Navigation between steps
    function goToStep(step) {
        bookingSteps.forEach(s => s.classList.add('hidden'));
        stepIndicators.forEach(s => s.classList.remove('active'));

        document.querySelector(`[data-step="${step}"]`).classList.remove('hidden');
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');

        currentStep = step;
    }

    // Initialize booking system
    function initBooking() {
        initCalendar();
        goToStep(1);
    }

    // Handle form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add booking submission logic here
            alert('Booking submitted successfully!');
        });
    }

    // Initialize
    initBooking();
});