$(function() {
    ///TEST
    (function test() {
        let a = $('.jobAd').first();
        for (let i = 0; i < 15; i++) {
            $(jobAd()).insertBefore('.search');
        }
    })();
    ///FIN TEST
    $('#search').submit(function(e) {
        e.preventDefault();
        let champsA = $('#search-A').val();
        let champsB = $('#search-B').val();
        alert(champsA + '\n' + champsB);
    });
});