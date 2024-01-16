let checkDevice; // checkDevice fonksiyonunu global bir değişkene atıyoruz

export default ({ app }, inject) => {
    if (process.client) {
        if (!checkDevice) {
            checkDevice = () => {
                if (window.innerWidth <= 767) {
                    return true;
                } else {
                    return false;
                }
            };

            // Attach an event listener to update the device status on window resize
            window.addEventListener('resize', checkDevice);
        }

        // Inject the checkDevice function into the Vue instances
        inject('checkDevice', checkDevice);
    }
};