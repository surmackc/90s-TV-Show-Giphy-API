

//  our initial array of shows
var shows = ["Power Rangers", "Salute Your Shorts", "Hey Dude", "Legends of the Hidden Temple", "Doug", "Family Matters", "Full House", "Double Dare", "Are you afraid of the dark?", "Captain Planet", "GI Joe", "All That"];


    // function for displaying buttons
      function renderButtons() {

        // emptying the shows-buttons div prior to adding new show buttons
        $("#shows-buttons").empty();

        // looping through the array of shows
        for (var i = 0; i < shows.length; i++) {

          //dynamicaly generating buttons for each show in the array
          var a = $("<button>");
          // adding a class
          a.addClass("show");
          // adding a data-attribute (data-name) with a value of the show at index i
          a.attr("data-name", shows[i]);
          // providing the button's text with a value of the show at index i
          a.text(shows[i]);
          // adding the button to the HTML shows-buttons div
          $("#shows-buttons").append(a);
        }
      }

      // this function adds new shows to the buttons from the input form
      $("#add-show").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // this line will grab the text from the input box and trim it for extra spaces
        var showInput = $("#show-input").val().trim();
        // the input from the textbox is then added to our array
        shows.push(showInput);
        // clearing the value in our text box after submission
        $("#show-input").val('');
        // calling renderButtons which handles the processing of our show array and creates the buttons dynamically
        renderButtons();

      });




//  our function which will display our gifs using ajax 
function displayShowGif() {
        // setting our var show equal to the attribute data-name attached to each parent element which in this case is the buttons
        var show = $(this).attr("data-name");
        console.log(this);
        // emptying the gif-view div each time so that we only display the 10 gifs from each show clicked
        $('#gif-view').empty();
        // API query using the show var as our search term
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10"

        // creating an AJAX call for the specific show button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(queryURL);
          console.log(response);

          // setting results equal to the data in our returned JSON object
          var results = response.data;

          // looping through results
          for (var i = 0; i < results.length; i++) {
              // dynamically creating html elements and properties
              // creating a div to hold the gifs
              var gifDiv = $("<div class='gifs'>");
              // storing the rating data
              var rating = results[i].rating;
              // creating a paragraph element to have the rating displayed
              var p = $("<p>").text("Rating: " + rating);
              // displaying the rating on each gif div
              gifDiv.append(p);
              // setting a variable to store the gif image
              var gifImage = $("<img>");
              // providing each gif with the still and animated gif URLs as well as creating a data-state for our if/else statement
              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-state", "still");
              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);
              // adding glass to images/gifs
              gifImage.addClass("gif");
              // adding our image to our gifDiv variable
              gifDiv.append(gifImage);
              // adding the entire div to our html
              $("#gif-view").prepend(gifDiv);

        }

      // function for starting and stopping gifs on each click of the gif class
      $(".gif").on('click', function() {
      
          // the attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // this refers to the parent element of our gif image
          console.log(this);
          // if the clicked image's state is still, update its src attribute to what its data-animate value is.
          // then, set the image's data-state to animate
          // else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    
      }); 

    });


  };

  

      // setting a document listener so that on click of anything with class show the displayShowGif function fires
      $(document).on("click", ".show", displayShowGif);
      // calling the renderButtons function at least once to display the initial list of shows
      renderButtons();


    

      




