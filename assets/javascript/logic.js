    $("button").on("click", function() {

    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(queryURL);
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");

        var gifImage = $("<img>");

        gifImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(gifImage);

        $("#gif").prepend(gifDiv);

      }
      

    });
});