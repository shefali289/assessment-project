$(document).ready(function(){
    $("#submit-forecast").click(function(){
        return getForecast();
    })
});


function getForecast()
{
    var city=$("#city").val();
    var days=$("#days").val();

    if(city!="" && days!="")
    {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast?q='+city+"&cnt="+days+"&units=metric&APPID=b4b313e7003170e60e98e837009b64ab",
            type: "GET",
            dataType: "json",
            success: function(data){

                document.body.style.backgroundImage='url(images/forecastbg.jpg)';
                document.getElementById("title-searchcity").style.color="#ffffff";

                var table="";
                var header="<h2 style='font-weight: bold; font-size: 40px;'>"+data.city.name+", "+data.city.country+"</h2>";

                for(var i=0;i<data.list.length;i++)
                {
                    table=table+"<tr>";
                    table=table+"<td>"+(i+1)+"</td>";
                    table=table+"<td>"+data.list[i].weather[0].main+"<img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                    table=table+"<td>"+data.list[i].weather[0].description+"</td>";
                    table=table+"<td>"+data.list[i].main.temp+"&deg;C</td>";
                    table=table+"<td>"+data.list[i].main.temp_max+"&deg;C</td>";
                    table=table+"<td>"+data.list[i].main.temp_min+"&deg;C</td>";
                    table=table+"<td>"+data.list[i].main.humidity+"%</td>";
                    table=table+"<td>"+data.list[i].clouds.all+"%</td>";
                    table=table+"<td>"+data.list[i].wind.speed+" m/sec</td>";
                    table=table+"<td>"+data.list[i].main.pressure+"hPa</td>";
                    table=table+"</tr>";
                }

                $("#header").html(header);
                $("#output-weather").html(table);
                $("#city").val("");
                $("#days").val("");
            }
        });
    }
    else
    {
        $("#error").html("<div class='alert alert-danger' id='error-msg'><a href='#' class='close' data-dismiss='alert'>&times;</a>Enter the city and days (1-5). Fields can not be left empty!</div>");
    }
}



