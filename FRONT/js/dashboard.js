$(function() {
    ///TEST
    (function test() {
        let a = $('.jobAd').first();
        for (let i = 0; i < 15; i++) {
            a.clone().insertBefore('.search');
        }
    })();
})