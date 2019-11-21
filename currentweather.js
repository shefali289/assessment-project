$(document).ready(function(){
    $("#submit-city").click(function(){
        return getCurrentWeather();
    });
});


function getCurrentWeather()
{
    var city=$("#city").val();

    if(city!="")
    {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+"&units=metric"+"&APPID=b4b313e7003170e60e98e837009b64ab",
            type: "GET",
            dataType: "json",
            success: function(data){
                var output=showWeather(data);
                $("#output-weather").html(output);
                $("#city").val("");
            }
        });
    }
    else
    {
        $("#error").html("<div class='alert alert-danger' id='error-msg'><a href='#' class='close' data-dismiss='alert'>&times;</a>Enter the city. Field can not be left empty!</div>");
    }
}

function showWeather(data)
{
    document.getElementById("title-searchcity").style.color="#ffffff";

    switch(data.weather[0].main)
    {
        case 'Clear':   document.body.style.backgroundImage='url(images/clear.jpg)';
                        break;
            
        case 'Clouds':   document.body.style.backgroundImage='url(images/cloud.jpg)';
                         break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':    document.body.style.backgroundImage='url(images/rain.jpg)';
                        break;

        case 'Thunderstorm':   document.body.style.backgroundImage='url(images/storm.jpg)';
                               break;

        case 'Snow':   document.body.style.backgroundImage='url(images/snow.jpg)';
                       break;

        case 'Fog':
        case 'Haze':
        case 'Smoke':   document.body.style.backgroundImage='url(images/smoke.jpg)';
                        break;

        default:        document.body.style.backgroundImage='url(images/anydefault.jpg)';
                        break;
    }


    return  "<h2 style='font-weight: bold; font-size: 40px; padding-top: 30px;' class='text-center'>"+data.name+", "+data.sys.country+"</h2><br>"+
            "<h3 style='padding-left: 30px; font-size:30px;' class='text-center'>"+data.main.temp+"&deg;C</h3>"+
            "<h3 style='padding-left: 30px; font-size:30px;' class='text-center'>"+data.weather[0].main+"<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'></h3><hr style='width: 80%;'>"+
            "<h3 style='padding-left: 30px; font-size: 20px;' class='text-center'><strong>Maximum Temperature:</strong> "+data.main.temp_max+"&deg;C</h3>"+
            "<h3 style='padding-left: 30px; font-size: 20px;' class='text-center'><strong>Minimum Temperature:</strong> "+data.main.temp_min+"&deg;C</h3>"+
            "<h3 style='padding-left: 30px; font-size: 20px;' class='text-center'><strong>Humidity:</strong> "+data.main.humidity+"%</h3>"+
            "<h3 style='padding-left: 30px; font-size: 20px;' class='text-center'><strong>Cloudiness:</strong> "+data.clouds.all+"%</h3>"+
            "<h3 style='padding-left: 30px; font-size: 20px; padding-bottom: 30px;' class='text-center'><strong>Wind Speed:</strong> "+data.wind.speed+" m/sec</h3>";
}