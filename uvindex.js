$(document).ready(function(){
    $("#submit-coords").click(function(){
        return getUVIndex();
    })
});


function getUVIndex()
{
    var latitude=$("#lat").val();
    var longitude=$("#long").val();

    if(latitude!="" && longitude!="")
    {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?lat='+latitude+"&lon="+longitude+"&APPID=b4b313e7003170e60e98e837009b64ab",
            type: "GET",
            dataType: "json",
            success: function(data){
                var output=showUV(data);
                $("#output-UV").html(output);
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


function showUV(data)
{
    document.body.style.backgroundImage='url(images/uvbg.jpg)';
    document.getElementById("title-searchcity").style.color="#ffffff";


    return  "<h2 style='font-weight: bold; font-size: 40px; padding-top: 30px;' class='text-center'>Decimal Latitude and Longitude Coordinates:</h2><br>"+
            "<h3 style='padding-left: 30px; font-size:35px;' class='text-center'>"+data.lat+", "+data.lon+"</h3><br>"+
            "<h3 style='padding-left: 30px; font-size:25px;' class='text-center'><strong>Date-Time: </strong>"+data.date_iso+"</h3>"+
            "<hr style='width: 80%;'>"+
            "<h3 style='padding-left: 30px; font-size: 30px; padding-bottom: 30px;' class='text-center'><strong>UV Index:</strong> "+data.value+"</h3>";
}
