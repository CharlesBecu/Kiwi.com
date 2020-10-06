function test() {
    for (let i = 0; i < 15; i++) {
        $(jobAd()).insertAfter('.loading');
    }
}

$(function() {
    ///TEST
    test();
    setJobAdMoreClick(4);
    ///FIN TEST
    $('#search').submit(function(e) {
        e.preventDefault();
        let champsA = $('#search-A').val();
        let champsB = $('#search-B').val();
        searchForAd(champsA, champsB);
    });
    spinnRefresh(4);
    headerPopover();
});