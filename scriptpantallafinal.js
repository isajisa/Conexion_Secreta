document.addEventListener('DOMContentLoaded', function () {
    const puntosfinal = localStorage.getItem('puntosfinal');
    const parcorrectafinal = localStorage.getItem('parcorrectafinal');
    const porcaciertofinal = localStorage.getItem('porcaciertofinal');
    const rachaMaxima = localStorage.getItem('rachaMaxima');
    const ganarPerder = localStorage.getItem('ganadoperdido');

    // Mostrar los valores en la página
    document.getElementById('puntosfinal').textContent = puntosfinal;
    document.getElementById('parcorrectafinal').textContent = parcorrectafinal;
    document.getElementById('porcaciertofinal').textContent = porcaciertofinal;
    document.getElementById('rachaMaxima').textContent = rachaMaxima;
    document.getElementById('ganadoperdido').textContent = ganarPerder;
});