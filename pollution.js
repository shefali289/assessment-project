$(document).ready(function(){
    $("#submit-AQI").click(function(){
        return getAQI();
    })
});


function getAQI()
{
    var latitude=$("#lat").val();
    var longitude=$("#long").val();

    if(latitude!="" && longitude!="")
    {
        $.ajax({
            url: 'http://api.airpollutionapi.com/1.0/aqi?lat='+latitude+"&lon="+longitude+"&APPID=7kt1gs6pamq561a1rr8q1jeg79",
            type: "GET",
            dataType: "json",
            success: function(data){
                var output=showAQI(data);
                $("#output-AQI").html(output);
                $("#lat").val("");
                $("#long").val("");
            }
        });
    }
    else
    {
        $("#error").html("<div class='alert alert-danger' id='error-msg'><a href='#' class='close' data-dismiss='alert'>&times;</a>Enter the coordinates. Fields can not be left empty!</div>");
    }
}


function showAQI(data)
{
    document.body.style.backgroundImage='url(images/pollution.jpg)';
    document.getElementById("title-searchcity").style.color="#ffffff";

    return  "<h2 style='font-weight: bold; font-size: 50px; padding-top: 30px; padding-right: 30px;' class='text-center'>"+data.data.country+"</h2>"+
            "<h3 style='padding-left: 30px; padding-right: 30px; font-size:35px;' class='text-center'>Decimal Latitude and Longitude Coordinates: <br><br>"+data.data.coordinates.latitude+", "+data.data.coordinates.longitude+"</h3>"+
            "<hr style='width: 80%;'>"+
            "<h3 style='padding-left: 30px; padding-right: 30px; font-size: 30px;' class='text-center'><strong>AQI: </strong> "+data.data.value+"</h3>"+
            "<h3 style='padding-left: 30px; padding-right: 30px; font-size: 30px;' class='text-center'><strong>Description:</strong> "+data.data.text+"<br>"+"</h3>"+
            "<h3 style='padding-left: 30px; padding-right: 30px; font-size: 15px; padding-bottom: 30px;' class='text-center'><strong><u>NOTE:</u></strong> "+data.data.alert+"</h3>";
}

