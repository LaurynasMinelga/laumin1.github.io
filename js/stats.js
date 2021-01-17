$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(ip) {
    var request = $.get('https://api.astroip.co/'+ip.ip+'?api_key=7a36b76e-3125-4454-80c9-74f519df45e9&userAgent=true', function(data) {
        if (data.status_code == 200){
            initiateTypeWriter(data);
        } else{
            typeWriter("Glad you came by!", 100, 0, true);
        }
    });
    request.fail(function (){
        typeWriter("Glad you came by!", 100, 0, true);
    })
});
async function typeWriter(_txt, speed, _i, _ignore) {
    var txt = _txt;
    var i = _i;
    var ignore = _ignore;
    if (i < txt.length) {
        document.getElementById("stats-marquee").innerHTML += txt.charAt(i);
        i++;
        setTimeout(function(){ typeWriter(txt, speed, i, ignore); }, speed);
    } else if (ignore == 1) {
        return 0;
    } else {
        await sleep(2500);
        await typeDeWriter(70);
        return 0;
    }
}
async function typeDeWriter(speed){
    var line = document.getElementById("stats-marquee").innerHTML;
    if (line.length > 0) {
        document.getElementById("stats-marquee").innerHTML = line.substring(0, line.length-1);
        setTimeout(function(){ typeDeWriter(speed); }, speed);
    } else {
        return 0;
    }
}
async function initiateTypeWriter(data){
    await sleep(2000);
    var txt = [
        ' As you want to know more about me.. ',
        'I have found out a bit about you, too!',
        ' Your date of arrival: '+ data.timezone.date_time.substring(0, 10),
        ' Your IP address: '+ data.ip,
        ' Country: ' + data.geo.country_name,
        ' City: ' + data.geo.city,
        ' Exact coordinates: '+ data.geo.longitude+" , "+data.geo.latitude,
        ' ISP: '+ data.asn.organization,
        ' Browser: '+ navigator.appCodeName,
        ' Operating system: '+navigator.platform,
        ' It is really nice to see you here!'
        ];
    for (const element of txt){
        await typeWriter(element, 100, 0, false);
        await sleep(element.length*170+2500+1000);
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}